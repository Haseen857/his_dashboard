import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import doctor from "../../assets/images/doctor.png";
import swal from "sweetalert";
import AddEventschema from "../../schemas/AddEventSchema";
import { validate, validateProperty } from "src/common/utils";
import jwt from "jwt-decode";
import config from "../../config";
import Select from "react-dropdown-select";

var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
const tokenDetails = jwt(token.accessToken);
// const type = tokenDetails.type;
const roles = tokenDetails.roles;
const EditEvent = (props) => {
  // console.log(type);
  // console.log(roles);

  const store = JSON.parse(window.localStorage.getItem("eventData"));
  // console.log(store);
  var id = store.eventData.id;
  // var id = "";
  // console.log(id);

  const [value, setValue] = useState({});
  const [department, setdepartment] = useState([]);
  const [error, setError] = useState({});

  // let history = useHistory();
  // const [countryVal, setCountryVal] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cityCountry, setCityCountry] = useState([]);
  // const [openCountry, setOpenCountry] = useState(false);
  // const [citiesVal, setCitiesVal] = useState(null);
  const [cities, setCities] = useState([]);
  const [currencyy, setCurrenncyy] = useState([]);
  // const [cityDisable, setCityDisable] = useState(false);
  // const [openCities, setOpenCities] = useState(false);

  useEffect(() => {
    setValue({ ...store.eventData, typed: store.eventData.type });
    props
      .ongetdepartment()
      .then((response) => {
        setdepartment(response.payload);
      })
      .catch((error) => {
        debugger;
        // setLoading(false);
        const last3 = error.payload.message.slice(-3);
        if (last3 === "403") {
          swal({
            icon: "error",
            title: "Not Authorised",
            text: "contact Administration if this is a mistake!",
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            props.history.push("/dashboard");
            window.location.reload();
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time-out",
            text: "Re login or contact your administrator",
            confirmButtonText: "okay",
            button: true,
          });

          setError({
            ...error,
            ["departmentId"]: error.type,
          });
        }
        // setError({
        //   ...error,
        //   ["departmentId"]: error.payload.message,
        // });
      });
  }, []);
  // const redirect = () => {
  //   ,[history.push("/SubEvents");
  // };
  // console.log(value);

  function endAfterStart(start, end) {
    const today = new Date().toLocaleDateString();
    var startDate = new Date(start);
    var endDate = new Date(end);
    var todayDate = new Date(today);
    // console.log(todayDate.getTime(), today);
    if (startDate.getTime() < todayDate.getTime()) {
      setError({
        ...error,
        ["startDate"]: "Start date must be greater than today",
      });

      return true;
    } else if (endDate.getTime() < todayDate.getTime()) {
      setError({
        ...error,
        ["endDate"]: "End date must be greater than today",
      });

      return true;
    } else if (endDate.getTime() < startDate.getTime()) {
      setError({
        ...error,
        ["endDate"]: "End date must be greater than start date",
      });

      return endDate.getTime() < startDate.getTime();
    }

    return false;
  }

  useEffect(() => {
    // console.log(endAfterStart(value.startDate, value.endDate));
    endAfterStart(value.startDate, value.endDate);
  }, [value.startDate, value.endDate]);

  function timecheker(startTime, endTime) {
    if (!startTime || !endTime) {
      return true;
    }

    const timefrom = new Date();
    let temp = startTime.split(":");
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));
    timefrom.setSeconds(parseInt(temp[2]));

    const timeto = new Date();
    temp = endTime.split(":");
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));
    timeto.setSeconds(parseInt(temp[2]));

    if (timeto < timefrom) {
      setError({
        ...error,
        ["endTime"]: "End time must be greater than start time",
      });
      return false;
    } else return true;
    // debugger;
  }
  const BASE_URL = "https://countriesnow.space/api/v0.1/countries";
  const Currency_BASE_URL =
    "https://countriesnow.space/api/v0.1/countries/currency";

  const getCountryCities = async (country) => {
    // debugger;
    if (cityCountry.length) {
      const city = cityCountry.find((item) => item.country === country);
      if (city) {
        const citiesData = city.cities.map((item) => {
          return { label: item, value: item };
        });
        setCities(citiesData);
      } else {
        setCities([]);
      }
    }
  };

  useEffect(() => {
    const getcurreency = async () => {
      const response = await fetch(`${Currency_BASE_URL}`).then((response) =>
        response.json()
      );

      const { data } = response;
      // debugger;
      setCurrenncyy(await data);
    };
    getcurreency();

    const getCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}`).then((response) =>
          response.json()
        );

        if (response.error === false && response.data.length) {
          const countryData = response.data.map((item, index) => {
            return {
              label: item.country,
              value: `${item.country}-${index}`,
            };
          });
          // console.log(countryData);

          setCountries(countryData);
          setCityCountry(response.data);
        } else {
          setCountries([]);
          setCityCountry([]);
        }
      } catch (error) {
        setCountries([]);
        setCityCountry([]);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    timecheker(value.startTime, value.endTime);
  }, [value.startTime, value.endTime]);

  // debugger;
  if (roles.includes("Super Admin")) {
    const onChange = (e) => {
      if (e.target.type == "file") {
        let file = e.target.files[0];
        if (file.type == "image/gif") {
          swal({
            icon: "error",
            title: "Type error",
            text: "Invalid Image Type",
          });
          return;
        }
        //setValue({ ...value, [e.target.name]: file });
        let reader = new FileReader();
        reader.onloadend = () => {
          setValue({ ...value, coverUrl: reader.result, cover: file });
        };
        reader.readAsDataURL(file);
        debugger;
      } else {
        setValue({ ...value, [e.target.name]: e.target.value });
      }
      const errorMessage = validateProperty(e.target, AddEventschema);
      if (errorMessage) {
        setError({ ...error, [e.target.name]: errorMessage });
        // debugger;
      } else {
        setError({ ...error, [e.target.name]: "" });
      }
    };
    const ClearCity = (yes) => {
      if (yes == true) {
        const target = {
          name: "city",
          value: null,
        };
        const cnt2 = {
          target,
        };
        onChange(cnt2);
      }
    };
    const selectingcheck = (e) => {
      // e.preventDefault();
      if (e.target.checked) {
        setValue({ ...value, [e.target.name]: true });
        // debugger;
      } else {
        setValue({ ...value, [e.target.name]: false });
        // debugger;
      }
    };

    const HanldeEvent = (e) => {
      debugger;
      e.preventDefault();
      const formData = new FormData();
      const Data = {};
      if (
        !value.description ||
        !value.topic ||
        !value.eventLink ||
        !value.address ||
        // !value.location ||
        !value.country ||
        !value.city ||
        !value.startDate ||
        !value.endDate ||
        !value.startTime ||
        !value.endTime ||
        !value.eventFee ||
        !value.departmentId ||
        !value.mode ||
        !value.spokesPerson ||
        !value.typed ||
        !value.currency
      ) {
        setError({
          ...error,
          topic: !value.topic ? "topic is required" : error.topic,
          eventLink: !value.eventLink
            ? "eventLink is required"
            : error.eventLink,
          address: !value.address ? "address is required" : error.address,
          country: !value.country ? "country is required" : error.country,
          city: !value.city ? "city is required" : error.city,
          startDate: !value.startDate
            ? "startDate is required"
            : error.startDate,
          endDate: !value.endDate ? "endDate is required" : error.endDate,
          startTime: !value.startTime
            ? "startTime is required"
            : error.startTime,
          endTime: !value.endTime ? "endTime is required" : error.endTime,
          eventFee: !value.eventFee ? "eventFee is required" : error.eventFee,
          departmentId: !value.departmentId
            ? "departmentId is required"
            : error.departmentId,

          mode: !value.mode ? "mode is required" : error.mode,
          // advertiseRequired: !value.advertiseRequired
          //   ? "advertiseRequired is required"
          //   : error.advertiseRequired,
          spokesPerson: !value.spokesPerson
            ? "spokesPerson is required"
            : error.spokesPerson,
          typed: !value.typed ? "typed is required" : error.typed,

          description: !value.description
            ? "description is required"
            : error.description,

          currency: !value.currency
            ? "Please enter currency for event"
            : error.currency,
        });
      } else {
        Data["mode"] = value.mode;
        Data["discountPercent"] = value.discountPercent
          ? value.discountPercent.toString()
          : "0";
        Data["coupon"] = value.coupon;

        // Data["advertiseRequired"] = value.advertiseRequired;

        Data["endTime"] = value.endTime;
        Data["startTime"] = value.startTime;

        Data["endDate"] = value.endDate;
        Data["startDate"] = value.startDate;

        Data["city"] = value.city;

        Data["eventFee"] = value.eventFee;
        Data["departmentId"] = value.departmentId;

        Data["topic"] = value.topic;
        Data["reach"] = value.reach;
        Data["currency"] = value.currency;

        Data["eventLink"] = value.eventLink;
        Data["address"] = value.address;
        // Data["location"] = value.location;
        Data["country"] = value.country;
        // Data["cover"] = value.cover;
        Data["description"] = value.description;

        Data["typed"] = value.typed;

        Data["spokesPerson"] = value.spokesPerson;

        const error = validate(Data, AddEventschema);
        debugger;
        if (error) return;

        var loc = {};
        formData.append("mode", value.mode);
        formData.append(
          "discountPercent",
          value.discountPercent ? value.discountPercent : 0
        );
        formData.append("coupon", value.coupon);
        formData.append(
          "advertiseRequired",
          value.advertiseRequired ? value.advertiseRequired : false
        );
        formData.append("endTime", value.endTime);
        formData.append("startTime", value.startTime);
        formData.append("endDate", value.endDate);
        formData.append("startDate", value.startDate);
        formData.append("city", value.city);
        formData.append("eventFee", value.eventFee ? value.eventFee : 0);
        formData.append("departmentId", value.departmentId);
        formData.append("topic", value.topic);
        formData.append("eventLink", value.eventLink);
        formData.append("address", value.address);
        formData.append("location", JSON.stringify(loc));
        formData.append("country", value.country);
        // formData.append("cover", value.cover);
        // formData.append("cover", doctor);
        formData.append("description", value.description);
        formData.append("type", value.typed);
        formData.append("reach", value.reach);
        formData.append("currency", value.currency);
        formData.append("spokesPerson", value.spokesPerson);
        // formData.append("category", value.category);
        formData.append("category", "category");
        formData.append("id", id);
        if (value.cover) {
          formData.append("cover", value.cover);
        }
        // setLoading(true);
        debugger;

        props
          .oneditEvent(formData)
          .then((response) => {
            debugger;
            swal({
              icon: "success",
              title: "Event Edited Successfully",
            }).then(() => {
              props.history.push("/viewevent");
            });
            //window.location.reload();
          })
          .catch((error) => {
            const last3 = error.payload.message.slice(-3);
            if (last3 === "403") {
              swal({
                icon: "error",
                title: "Not Authorised",
                text: "contact Administration if this is a mistake!",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("/dashboard");
              });
            } else if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("/login");
              });
            } else {
              swal({
                icon: "error",
                title: "Error Occured",
                text: Array.isArray(error.payload.response.data.message)
                  ? error.payload.response.data.message.join(", ")
                  : error.payload.response.data.message,
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                // props.history.push("/adddoctor");
                // window.location.reload();
              });
            }
            // setLoading(false);
            setError({
              ...error,
              ["EditDoctorError"]: error.payload.message,
            });
          });
      }
    };

    const backgroundImagecss = {
      background: store.eventData.cover
        ? `url(${store.eventData.cover})`
        : ` url("https://unsplash.imgix.net/photo-1416339442236-8ceb164046f8?q=75&fm=jpg&s=8eb83df8a744544977722717b1ea4d09")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: "#fff",
      height: "250px",
      paddingTop: "50px",
    };

    const backgroundImagecssnew = {
      background: ` url(${value.coverUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      color: "#fff",
      height: "250px",
      paddingTop: "50px",
    };

    return (
      <>
        <div className="container-fluid">
          <div className="main-div">
            {/* <div class="container bg-overlay" > */}
            <div
              style={
                value.coverUrl ? backgroundImagecssnew : backgroundImagecss
              }
            >
              <div class="row text-center">
                <form className="main-form">
                  <label for="file" className="inputlabel">
                    {value.coverUrl
                      ? "Change Cover Picture"
                      : "Add Cover Picture"}
                  </label>
                  <input
                    type="file"
                    name="cover"
                    id="file"
                    onChange={onChange}
                    accept="image/jpeg, image/png, image/jpg "
                  />
                </form>
              </div>
            </div>
            <div className="form-container">
              <form
                className="row  d-flex justify-content-start"
                style={{ marginTop: "30px" }}
              >
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label add-event-label-hospital"
                  >
                    Event Topic <span className="Mandatory">*</span>
                  </label>
                  <input
                    className="form-controls"
                    placeholder="Topic"
                    name="topic"
                    onChange={onChange}
                    value={value.topic}
                    id="topic"
                  />
                  {error.topic && <p style={{ color: "red" }}>{error.topic}</p>}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    Coupon Code
                  </label>
                  <input
                    className="form-controls"
                    placeholder="Coupon Code"
                    name="coupon"
                    onChange={onChange}
                    value={value.coupon}
                    id="coupon"
                  />
                  {error.coupon && (
                    <p style={{ color: "red" }}>{error.coupon}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-event-label-hospital"
                  >
                    {" "}
                    Department<span className="Mandatory">*</span>
                  </label>
                  <select
                    // className="form-multi-select"
                    className="form-controls"
                    data-coreui-multiple="false"
                    name="departmentId"
                    onChange={onChange}
                    value={value.departmentId}
                    id="departmentId"
                  >
                    <option value="">Choose One</option>
                    {department.map((depart) => (
                      <option key={depart.id} value={depart.id}>
                        {" "}
                        {depart.department}
                      </option>
                    ))}

                    {/* <option value="Opthamology">Opthamology</option>
                  <option value="Pathology">Pathology</option>
                  <option value="test">test</option>
                  <option value="surgeon">surgeon</option>
                  <option value="Cardiology">Cardiology</option> */}
                  </select>
                  {error.departmentId && (
                    <p style={{ color: "red" }}>{error.departmentId}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    {" "}
                    Event Mode <span className="Mandatory">*</span>
                  </label>
                  <select
                    // className="form-multi-select"
                    data-coreui-multiple="false"
                    className="form-controls"
                    name="mode"
                    onChange={onChange}
                    value={value.mode}
                    id="mode"
                  >
                    <option value="">Choose one</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  {error.mode && <p style={{ color: "red" }}>{error.mode}</p>}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    Event Type<span className="Mandatory">*</span>{" "}
                  </label>
                  <select
                    // className="form-multi-select"
                    data-coreui-multiple="false"
                    className="form-controls"
                    name="typed"
                    onChange={onChange}
                    value={value.typed}
                    id="typed"
                  >
                    <option value="">Choose one</option>
                    <option value="event">Event</option>
                    <option value="webinar">Webinar</option>
                    <option value="workshop">Workshop</option>
                    <option value="other">Other</option>
                  </select>
                  {error.typed && <p style={{ color: "red" }}>{error.typed}</p>}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    {" "}
                    Event Reach<span className="Mandatory">*</span>
                  </label>
                  <select
                    // className="form-multi-select"
                    data-coreui-multiple="false"
                    className="form-controls"
                    name="reach"
                    onChange={onChange}
                    value={value.reach}
                    id="reach"
                  >
                    <option value="">Choose one</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                  {error.reach && <p style={{ color: "red" }}>{error.reach}</p>}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    Speaker <span className="Mandatory">*</span>
                  </label>
                  <input
                    className="form-controls"
                    placeholder="Enter Speaker"
                    name="spokesPerson"
                    onChange={onChange}
                    value={value.spokesPerson}
                    id="spokesPerson"
                  />
                  {error.spokesPerson && (
                    <p style={{ color: "red" }}>{error.spokesPerson}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    Start Date<span className="Mandatory">*</span>
                  </label>
                  <input
                    type="Date"
                    className="form-controls"
                    placeholder="Enter Date"
                    name="startDate"
                    onChange={onChange}
                    value={value.startDate}
                    id="startDate"
                    style={{ height: "40px" }}
                  />
                  {error.startDate && (
                    <p style={{ color: "red" }}>{error.startDate}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    End Date<span className="Mandatory">*</span>
                  </label>
                  <input
                    type="Date"
                    className="form-controls"
                    placeholder="Enter Date"
                    name="endDate"
                    onChange={onChange}
                    value={value.endDate}
                    id="endDate"
                    style={{ height: "40px" }}
                  />
                  {error.endDate && (
                    <p style={{ color: "red" }}>{error.endDate}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    {" "}
                    Start Time <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-controls"
                    placeholder="Enter Time and Duration"
                    name="startTime"
                    onChange={onChange}
                    value={value.startTime}
                    id="startTime"
                    step="2"
                    style={{ height: "40px" }}
                  />
                  {error.startTime && (
                    <p style={{ color: "red" }}>{error.startTime}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-event-label-hospital"
                  >
                    {" "}
                    End Time <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-controls"
                    placeholder="Enter Time and Duration"
                    name="endTime"
                    onChange={onChange}
                    value={value.endTime}
                    id="endTime"
                    step="2"
                    style={{ height: "40px" }}
                  />
                  {error.endTime && (
                    <p style={{ color: "red" }}>{error.endTime}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label add-event-label-hospital"
                  >
                    Event Discription <span className="Mandatory">*</span>
                  </label>
                  <textarea
                    type="string"
                    className="form-controls"
                    placeholder="Event Desciption"
                    name="description"
                    onChange={onChange}
                    value={value.description}
                    id="description"
                    style={{ height: "40px" }}
                  />
                   {error.description && (
                  <p style={{ color: "red" }}>{error.description}</p>
                )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-view-product-label"
                  >
                    {" "}
                    Country <span className="Mandatory">*</span>
                  </label>

                  <Select
                    options={countries}
                    className="form-controls"
                    placeholder={
                      value.country ? value.country : "Select Country"
                    }
                    style={{ height: "40px" }}
                    // id="country"
                    data-coreui-multiple="false"
                    onChange={(valuess) => {
                      if (valuess.length > 0) {
                        const target = {
                          name: "country",
                          value: valuess[0].label,
                        };
                        const cnt = {
                          target,
                        };
                        onChange(cnt);

                        getCountryCities(valuess[0].label);
                      } else {
                        ClearCity(true);

                        const target = {
                          name: "country",
                          value: undefined,
                        };
                        const cnt = {
                          target,
                        };
                        onChange(cnt);

                        setError({
                          ...error,
                          ["city"]: "Please Select Country First",
                          ["country"]: "Please Select Your Country",
                        });
                        setCities([]);
                      }
                    }}
                  ></Select>
                  {error.country && (
                  <p style={{ color: "red" }}>{error.country}</p>
                )}  
                </div>
                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-view-product-label"
                  >
                    {" "}
                    City <span className="Mandatory">*</span>
                  </label>
                  <Select
                    options={cities.length > 0 ? cities : []}
                    className="form-controls"
                    data-coreui-multiple="false"
                    placeholder={
                      value.country && value.city ? value.city : "Select city"
                    }
                    style={{ height: "40px" }}
                    // value={value.city}

                    clearable={true}
                    onChange={(valuess) => {
                      if (valuess.length > 0 && cities.length > 0) {
                        const target = {
                          name: "city",
                          value: valuess[0].value,
                        };
                        const cnt = {
                          target,
                        };
                        onChange(cnt);
                      } else {
                        const target = {
                          name: "city",
                          value: null,
                        };
                        const cnt = {
                          target,
                        };
                        onChange(cnt);
                      }
                    }}
                  ></Select>

                  <p style={{ color: "red" }}>
                    {error.city && <div class="text-danger">{error.city}</div>}
                  </p>
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label add-view-product-label-hospital"
                  >
                    Address <span className="Mandatory">*</span>
                  </label>
                  <textarea
                    type="string"
                    className="form-controls"
                    placeholder="address"
                    // value={value.address}
                    onChange={onChange}
                    id="address"
                    name="address"
                    style={{ height: "40px" }}
                    value={value.address}
                  />
                 {error.address && (
                  <p style={{ color: "red" }}>{error.address}</p>
                )}  
                </div>
                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-view-product-label-hospital"
                  >
                    Currency
                  </label>
                  <select
                    className="form-controls"
                    id="currency"
                    data-coreui-multiple="false"
                    // className="form-controls"
                    onChange={onChange}
                    name="currency"
                    style={{ height: "40px" }}
                    value={value.currency}
                  >
                    <option value={""}>--Select Currency--</option>
                    {currencyy.map((getcon) => (
                      <option key={getcon.name} value={getcon.currency}>
                        {" "}
                        {getcon.currency + `  ( ${getcon.name} )`}
                      </option>
                    ))}
                  </select>
                  {error.currency && (
                  <p style={{ color: "red" }}>{error.currency}</p>
                )}
                </div>
                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-event-label-hospital"
                  >
                    {" "}
                    Fees <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-controls"
                    placeholder="Enter Fee , if its free enter 0"
                    name="eventFee"
                    onChange={onChange}
                    value={value.eventFee}
                    id="eventFee"
                    min="0"
                  />
                  {error.eventFee && (
                    <p style={{ color: "red" }}>{error.eventFee}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-event-label-hospital"
                  >
                    Event Link <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-controls"
                    placeholder="Enter Event Link"
                    name="eventLink"
                    onChange={onChange}
                    value={value.eventLink}
                    id="eventLink"
                  />
                  {error.eventLink && (
                    <p style={{ color: "red" }}>{error.eventLink}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-event-label-hospital"
                  >
                    {" "}
                    Discount%
                  </label>
                  <input
                    type="number"
                    className="form-controls"
                    placeholder="Enter Value"
                    name="discountPercent"
                    onChange={onChange}
                    value={value.discountPercent}
                    id="discountPercent"
                    min="0"
                    max="100"
                  />
                  {error.discountPercent && (
                    <p style={{ color: "red" }}>{error.discountPercent}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-event-label-hospital"
                  >
                    Addvertisment Required?
                    <span className="Mandatory">*</span>
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="advertiseRequired"
                    id="advertiseRequired"
                    onClick={selectingcheck}
                    value={value.advertiseRequired}
                  />
                </div>
              </form>
              <hr className="horizontal-line" />
              <div style={{ textAlign: "end", marginBottom: "50px" }}>
                <button
                  className="rounded-0 Submit-form-view-hospital"
                  type="button"
                  onClick={HanldeEvent}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    swal({
      icon: "error",
      title: "You Can Not Edit Events",
      text: "Contact Administration",
      confirmButtonText: "okay",
      button: true,
    }).then(() => {
      window.localStorage.removeItem("eventData");
      props.history.push("/dashboard");

      // window.location.reload();
    });

    return (
      <>
        <div className="container-fluid">
          <div className="main-div">
            <div className="form-header"></div>
          </div>
        </div>
      </>
    );
  }
};

export default EditEvent;
