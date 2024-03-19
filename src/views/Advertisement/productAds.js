import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import doctor from "../../assets/images/doctor.png";
import swal from "sweetalert";
import AddEditProductschema from "../../schemas/AddEditProductschema";
import jwt from "jwt-decode";
import config from "../../config";
import { validate, validateProperty } from "src/common/utils";
import Select from "react-dropdown-select";

const AddProductAds = (props) => {
  const [value, setValue] = useState({});
  const [department, setdepartment] = useState([]);
  const [error, setError] = useState({});
  const [country, setCountry] = useState([]);
  const [stetes, setSat] = useState([]);
  const [currencyy, setCurrenncyy] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  ////////////////////////////////////////////////////////////////////

  // const [countryVal, setCountryVal] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cityCountry, setCityCountry] = useState([]);
  // const [openCountry, setOpenCountry] = useState(false);
  // const [citiesVal, setCitiesVal] = useState(null);
  const [cities, setCities] = useState([]);
  // const [cityDisable, setCityDisable] = useState(false);
  // const [openCities, setOpenCities] = useState(false);

  // console.log(store);

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  var roles = tokenDetails.roles;

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
    if (type == "hospital" || roles.includes("Super Admin")) {
      const getcurreency = async () => {
        const response = await fetch(`${Currency_BASE_URL}`).then((response) =>
          response.json()
        );

        const { data } = response;
        // debugger;
        setCurrenncyy(await data);
      };
      getcurreency();

      const getSpecialities = () => {
        var url = "doctor/specialities";
        props
          .onGetProductAds(url)
          .then((response) => {
            const specialityData = response.payload.map((item, index) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
            setSpecialities(specialityData);
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
                props.history.push("/viewdoctor");
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
            }
            setLoading(false);
            setError({
              ...error,
              ["AddDoctorError"]: error.payload.message,
            });
          });
      };

      getSpecialities();
    } else {
      swal({
        icon: "error",
        title: "Not Authorised",
        text: "contact Administration if this is a mistake!",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        props.history.push("/dashboard");
      });
    }
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
        setValue({
          ...value,
          [e.target.name]: file,
        });
      };
      reader.readAsDataURL(file);
      debugger;
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
    const errorMessage = validateProperty(e.target, AddEditProductschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
      // debugger;
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const onSpecialityChange = (e) => {
    var specialities = Array.prototype.map
      .call(e, function (item) {
        return item.value;
      })
      .join(",");
    setValue({ ...value, ["speciality"]: specialities });

    const errorMessage = validateProperty(
      { name: "speciality", value: specialities },
      AddEditProductschema
    );
    if (errorMessage) {
      // alert("setError({ ...error, [e.target.file]: errorMessage })")
      setError({ ...error, ["speciality"]: errorMessage });
    } else {
      setError({ ...error, ["speciality"]: "" });
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
      !value.manufacturer ||
      !value.brochure ||
      !value.certificate ||
      !value.speciality ||
      !value.name ||
      !value.details ||
      !value.country
    ) {
      setError({
        ...error,
        manufacturer: !value.manufacturer
          ? "Manufacturer can not be empty"
          : error.manufacturer,

        brochure: !value.brochure
          ? "Brochure can not be empty"
          : error.brochure,
        country: !value.country ? "Please select country" : error.country,
        certificate: !value.certificate
          ? "Certificate can not be empty"
          : error.certificate,
        speciality: !value.speciality
          ? "Please select category"
          : error.speciality,
        name: !value.name ? "Name can not be empty" : error.name,
        details: !value.details ? "Details can not be empty" : error.details,
      });
    } else {
      formData.append("manufacturer", value.manufacturer);
      formData.append("country", value.country);
      formData.append("category", value.speciality);
      formData.append("name", value.name);
      formData.append("details", value.details);
      formData.append(
        "type",
        props.location.pathname.indexOf("MedicalAds") > -1 ? "event" : "product"
      );

      if (value.brochure) {
        formData.append("brochure", value.brochure, value.brochure.name);
      }

      if (value.certificate) {
        formData.append(
          "certificate",
          value.certificate,
          value.certificate.name
        );
      }
      // setLoading(true);
      debugger;

      var url = "advertisement";

      props
        .onsubmitedproductads(formData, url)
        .then((response) => {
          debugger;
          swal({
            icon: "success",
            title: "Advertisement Created Successfully",
          }).then(() => {
            if (props.location.pathname.indexOf("MedicalAds") > -1) {
              props.history.push("/ViewMedicalAdsList");
            } else {
              props.history.push("/ViewProductAdsList");
            }
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
    background: ` url("https://gazette-live-storagestack-17-assetstorages3bucket-1571qjbkpxwcd.s3.ap-southeast-2.amazonaws.com/public/volume-99-issue-19/web-PLD.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    color: "#fff",
    height: "350px",
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
          {/* <div
            style={value.coverUrl ? backgroundImagecssnew : backgroundImagecss}
          >
            <div class="row text-center">
              <form className="main-form">
                <label
                  for="file"
                  className="inputlabel "
                  style={{ marginTop: "100px" }}
                >
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
          </div> */}
          <div className="form-container">
            <form
              className="row  d-flex justify-content-start"
              style={{ marginTop: "30px" }}
            >
              <div className="col-md-6">
                <label
                  for="inputPassword4"
                  className="form-label  add-event-label-hospital"
                >
                  Product Name <span className="Mandatory">*</span>
                </label>
                <input
                  className="form-controls"
                  placeholder="Enter Product Name"
                  name="name"
                  onChange={onChange}
                  // value={value.spokesPerson}
                  id="name"
                />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}
              </div>
              <div className="col-md-6">
                <label
                  for="inputPassword4"
                  className="form-label  add-event-label-hospital"
                >
                  Product Details <span className="Mandatory">*</span>
                </label>
                <input
                  className="form-controls"
                  placeholder="Enter Product Details"
                  name="details"
                  onChange={onChange}
                  // value={value.spokesPerson}
                  id="details"
                />
                {error.details && (
                  <p style={{ color: "red" }}>{error.details}</p>
                )}
              </div>
              <div className="col-md-6">
                <label
                  for="inputPassword4"
                  className="form-label add-event-label-hospital"
                >
                  Manufacturer Name <span className="Mandatory">*</span>
                </label>
                <input
                  className="form-controls"
                  placeholder="manufacturer"
                  name="manufacturer"
                  onChange={onChange}
                  // value={value.topic}
                  id="manufacturer"
                />
                {error.manufacturer && (
                  <p style={{ color: "red" }}>{error.manufacturer}</p>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                  Select Category <span className="Mandatory">*</span>
                </label>
                <Select
                  options={specialities}
                  className="form-controls"
                  values={value.selectedSpeciality}
                  style={{ height: "40px", fontSize: "17px" }}
                  // id="country"
                  data-coreui-multiple="true"
                  multi={true}
                  name="speciality"
                  onChange={onSpecialityChange}
                ></Select>
                {error.speciality && (
                  <p style={{ color: "red" }}>{error.speciality}</p>
                )}
              </div>

              <div className="col-md-6">
                <label
                  for="inputEmail4"
                  className="form-label add-event-label-hospital"
                >
                  {" "}
                  Country <span className="Mandatory">*</span>
                </label>

                <Select
                  options={countries}
                  className="form-controls"
                  placeholder="Select Country"
                  style={{ height: "40px", fontSize: "17px" }}
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
                  for="inputPassword4"
                  className="form-label  add-event-label-hospital"
                >
                  Upload Brochure
                </label>
                <input
                  type="file"
                  className="form-controls"
                  placeholder="brochure"
                  name="brochure"
                  onChange={onChange}
                  // value={value.coupon}
                  id="brochure"
                />
                {error.brochure && (
                  <p style={{ color: "red" }}>{error.brochure}</p>
                )}
              </div>

              <div className="col-md-6">
                <label
                  for="inputPassword4"
                  className="form-label  add-event-label-hospital"
                >
                  Upload Certificate For Verification
                </label>
                <input
                  type="file"
                  className="form-controls"
                  placeholder="Upload Certificate"
                  name="certificate"
                  onChange={onChange}
                  // value={value.coupon}
                  id="certificate"
                />
                {error.certificate && (
                  <p style={{ color: "red" }}>{error.certificate}</p>
                )}
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
};

export default AddProductAds;
