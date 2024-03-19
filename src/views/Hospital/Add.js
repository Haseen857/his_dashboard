import React, {
  useState,
  // useEffect,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Select from "react-dropdown-select";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalFooter,
  CModalBody,
} from "@coreui/react";
import { WithContext as ReactTags } from "react-tag-input";

import { useHistory } from "react-router-dom";
//validation
import AddHospitalschema from "src/schemas/AddHospitalSchema";
import { validate, validateProperty } from "src/common/utils";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
// import { DrawingManager } from "@react-google-maps/api";
//map
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import isLoggedIn from "src/common/auth";

//https://countriesnow.space/api/v0.1/countries

const AddHospital = (props) => {
  const history = useHistory();
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [Hospital, setHospital] = useState([]);
  const [country, setCountry] = useState([]);
  const [stetes, setSat] = useState([]);

  const [libraries] = useState(["places"]);
  const [loading, setLoading] = useState(false);
  const hospitalsRef = useRef();
  const [addressed, setaddressed] = useState({});
  const [data, setData] = useState(null);
  const [tags, setTags] = React.useState([]);
  const [LegalDoc, setLegalDoc] = React.useState([]);
  const [visibleLegal, setVisiblelegal] = useState(false);
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

  const BASE_URL = "https://countriesnow.space/api/v0.1/countries";

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
    if (isLoggedIn.hospitalId) {
      swal({
        icon: "success",
        title: "Profile Completed Succesfully",
        text: "Please Submit Documents",
        confirmButtonText: "okay",
        button: true,
      }).then((result) => {
        if (result) {
          // window.location.reload();
          props.history.push("/hospitaldocument");
          // window.location.reload();
        }
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

  let addressview;

  hospitalsRef.current = Hospital;
  ///////////////////////////////////////////////////////////////////////
  const [marker, setMarkers] = useState([]);

  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  var lastell;

  if (marker.length > 0) {
    // lastell = marker.pop();
    lastell = marker[marker.length - 1];
    // setLastElement({ latii: lastell.lat, lng: lastell.lng });
  }
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
  };

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
  );

  // setLastElement({ latii: lastell.lat, lng: lastell.lng });

  let center = useMemo(
    () => ({
      lat: 27.94466114058591,
      lng: 78.083339615344,
    }),
    []
  );

  const handleSel = async (address) => {
    try {
      setaddressed({ address: address });
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      panTo({ lat, lng });

      setMarkers((current) => [
        ...current,
        {
          lat: lat,
          lng: lng,
        },
      ]);
    } catch (error) {}
  };

  let texted = "";
  if (value.address && value.city && value.country) {
    texted = value.address + "," + value.city + "," + value.country;
  }
  useEffect(() => {
    handleSel(!texted ? "india" : texted);
  }, [texted]);

  const Locate = useCallback(({ panTo }) => {
    return (
      <button
        className="rounded-0 Submit-form-view-hospital"
        style={{
          width: "45px",
          height: "36px",
          fontSize: "17px",
          marginRight: "11px",
        }}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setMarkers((current) => [
                ...current,
                {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              ]);
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <FaMapMarkerAlt
          style={{ fontSize: "20px", marginTop: "-7px", marginLeft: "-5px" }}
        />
      </button>
    );
  }, []);

  // console.log(addressed);

  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 27.94466114058591, lng: () => 78.083339615344 },
        radius: 100 * 1000,
      },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      try {
        setaddressed({ address: address });

        const results = await getGeocode({ address });

        const { lat, lng } = await getLatLng(results[0]);

        panTo({ lat, lng });
        setMarkers((current) => [
          ...current,
          {
            lat: lat,
            lng: lng,
          },
        ]);
      } catch (error) {}
    };

    return (
      <div>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
            className="search-document-verfy"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBraTAU2n0EbB59TX5ufTIEoFnrLgAMHuk",
    libraries,
  });

  // console.log(tags);
  // console.log(LegalDoc);
  //////////////////////////////////////////////////////////
  // const getAdd = async () => {
  //   try {
  //     const latlng = {
  //       lat: parseFloat(lastell.lat),
  //       lng: parseFloat(lastell.lng),
  //     };
  //     const add = await getGeocode({ location: latlng });
  //     setaddressedOpen({ ...addressOpen, address: add[0].formatted_address });
  //     console.log(add[0].formatted_address);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getAdd();
  // }, [lastell]);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleRemoveAllTagClick = () => {
    tags.splice(0, tags.length);
  };

  //////////////////////////////////////////
  if (type == "hospital" || roles.includes("Super Admin")) {
    const onChange = (e) => {
      debugger;
      setValue({ ...value, [e.target.name]: e.target.value });

      const errorMessage = validateProperty(e.target, AddHospitalschema);
      if (errorMessage) {
        setError({ ...error, [e.target.name]: errorMessage });
      } else {
        setError({ ...error, [e.target.name]: "" });
      }
      // debugger;
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

    // setCity(value.country);
    const handleSubmit = (e) => {
      e.preventDefault();
      tags.forEach((idd) => {
        LegalDoc.push(idd.text);
      });

      setVisiblelegal(false);

      const payloadDocument = {
        documents: LegalDoc,
      };

      // debugger;
      props
        .onLegalDocumentFromDoctor(payloadDocument)
        .then((response) => {
          swal({
            icon: "success",
            title: "Legal Document Added Successfully",
            text: "Legal Documents required from Doctor added Successfully",
            confirmButtonText: "okay",
            button: true,
          }).then((result) => {
            if (result) {
              LegalDoc.splice(0, LegalDoc.length);
            }
          });
        })
        .catch((error) => {
          const last3 = error.payload.message.slice(-3);
          const msg = error.payload.response.data.message;

          // console.log(last3);

          if (last3 === "422") {
            swal({
              icon: "info",
              title: "Already Registered",
              // text: "verification mail sent on registered Email",
              confirmButtonText: "okay",
              button: true,
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time out",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          } else if (last3 === "400") {
            swal({
              icon: "error",
              title: "bad request",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          }
        });
    };
    const handleHospital = (e) => {
      e.preventDefault();

      if (
        !value.hospitalName ||
        !value.country ||
        !value.city ||
        !value.address ||
        !value.mobileNo
      ) {
        setError({
          ...error,
          hospitalName: !value.hospitalName
            ? "Hospital Name is required"
            : error.hospitalName,
          country: !value.country ? "Country is required" : error.country,
          city: !value.city ? "City is required" : error.city,
          address: !value.address ? "Address is required" : error.address,
          mobileNo: !value.mobileNo
            ? "Mobile Number is required"
            : error.mobileNo,
        });
      } else {
        const data = {
          hospitalName: value.hospitalName,
          country: value.country,
          city: value.city,
          address: value.address,
          mobileNo: value.mobileNo,
          phoneNo: value.phoneNo,
        };
        const error = validate(data, AddHospitalschema);
        if (error) return;

        setLoading(true);

        const payload = {
          hospitalName: value.hospitalName,
          country: value.country,
          city: value.city,
          address: addressed.address ? addressed.address : value.address,
          mobileNo: value.mobileNo,
          phoneNo: value.phoneNo,
          latitude: lastell.lat,
          longitude: lastell.lng,
        };

        props
          .onsubumited(payload)
          .then((response) => {
            swal({
              icon: "success",
              title: "Profile Completed Succesfully",
              text: "Please Submit Documents",
              confirmButtonText: "okay",
              button: true,
            }).then((result) => {
              if (result) {
                // window.location.reload();
                props.history.push("/hospitaldocument");
                // window.location.reload();
              }
            });
          })
          .catch((error) => {
            setLoading(false);
            const last3 = error.payload.message.slice(-3);
            const msg = error.payload.response.data.message;

            // console.log(last3);

            if (last3 === "422") {
              swal({
                icon: "info",
                title: "Already Registered",
                // text: "verification mail sent on registered Email",
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time out",
                text: `${msg}`,
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "400") {
              swal({
                icon: "error",
                title: "bad request",
                text: `${msg}`,
                confirmButtonText: "okay",
                button: true,
              });
            } else
              setError({
                ...error,
                ["AddHospitalerror"]: error.payload.message,
                // ["addHospitalerrr"]: "you have already Submited the form",
              });
          });
      }
    };

    addressview = addressed.address;

    return (
      <>
        <div className="container-fluid">
          <div className="main-div">
            <div className="form-header">
              <h5 className="lineformtitle">Add Hospital</h5>
            </div>
            <div className="form-container">
              <div className="row  d-flex justify-content-start ml-20">
                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-view-product-label-hospital"
                  >
                    {" "}
                    Hospital Name <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-controls"
                    placeholder="Enter Hospital Name"
                    id="hospitalName"
                    name="hospitalName"
                    // value={hospital.hospitalName}
                    onChange={onChange}
                  />
                  <p style={{ color: "red" }}>
                    {error.hospitalName && (
                      <div class="text-danger">{error.hospitalName}</div>
                    )}
                  </p>
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-view-product-label-hospital"
                  >
                    {" "}
                    Mobile No <span className="Mandatory">*</span>
                  </label>
                  <input
                    type="string"
                    className="form-controls"
                    placeholder="Enter mobile no"
                    // value={hospital.mobileNo}
                    onChange={onChange}
                    id="mobileNo"
                    name="mobileNo"
                  />
                  <p style={{ color: "red" }}>
                    {error.mobileNo && (
                      <div class="text-danger">{error.mobileNo}</div>
                    )}
                  </p>
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-view-product-label-hospital"
                  >
                    Phone No
                  </label>
                  <input
                    type="string"
                    className="form-controls"
                    placeholder="Enter phone no"
                    // value={hospital.phoneNo}
                    onChange={onChange}
                    id="phoneNo"
                    name="phoneNo"
                  />
                  <p style={{ color: "red" }}>
                    {error.phoneNo && (
                      <div class="text-danger">{error.phoneNo}</div>
                    )}
                  </p>
                </div>

                <div className="col-md-6">
                  <label
                    for="inputPassword4"
                    className="form-label  add-view-product-label-hospital"
                  >
                    Address <span className="Mandatory">*</span>
                  </label>
                  <textarea
                    type="string"
                    className="form-controls"
                    placeholder="address"
                    // value={hospital.address}

                    onChange={onChange}
                    id="address"
                    name="address"
                    style={{ height: "40px" }}
                  />
                  <p style={{ color: "red" }}>
                    {error.address && (
                      <div class="text-danger">{error.address}</div>
                    )}
                  </p>
                </div>

                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-view-product-label-hospital"
                  >
                    {" "}
                    Country <span className="Mandatory">*</span>
                  </label>

                  <Select
                    options={countries}
                    className="form-controls"
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
                  <p style={{ color: "red" }}>
                    {" "}
                    {error.country && (
                      <div class="text-danger">{error.country}</div>
                    )}
                  </p>
                </div>
                <div className="col-md-6">
                  <label
                    for="inputEmail4"
                    className="form-label add-view-product-label-hospital"
                  >
                    {" "}
                    City <span className="Mandatory">*</span>
                  </label>
                  <Select
                    options={cities.length > 0 ? cities : []}
                    className="form-controls"
                    data-coreui-multiple="false"
                    placeholder="Select City"
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
              </div>
              <br />

              <div className="row">
                <div className="col-md-8">
                  <div>
                    <Search panTo={panTo} />
                  </div>
                </div>

                <div
                  className="col-md-4"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Locate panTo={panTo} />
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <GoogleMap
                  id="drawing-manager-example"
                  style={{ width: "100%" }}
                  mapContainerStyle={mapContainerStyle}
                  zoom={8}
                  center={center}
                  options={options}
                  onClick={onMapClick}
                  onLoad={onMapLoad}
                >
                  <Marker
                    position={lastell}
                    onClick={(event) => {
                      setSelected(lastell);
                      // setMarkers((current) => [
                      //   ...current,
                      //   {
                      //     lat: event.latLng.lat(),
                      //     lng: event.latLng.lng(),
                      //   },
                      // ]);
                      // }
                    }}
                  >
                    {selected ? (
                      <InfoWindow
                        position={lastell}
                        onCloseClick={(e) => {
                          setaddressed({
                            address: "this is your hospital location",
                          });
                          setSelected(null);
                        }}
                      >
                        <div>
                          <h3>
                            {value.hospitalName
                              ? value.hospitalName
                              : "Your Hospital"}
                          </h3>
                          <p>{addressview ? addressview : "your location"}</p>
                        </div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                </GoogleMap>
              </div>
              <hr className="horizontal-line" />

              {/* <label>Ask Legal Documents from Doctor</label> */}
              <div style={{ textAlign: "end", marginBottom: "50px" }}>
                <button
                  className="rounded-0 Submit-form-view-hospital"
                  type="submit"
                  onClick={handleHospital}
                >
                  Submit
                </button>
                {error.AddHospitalerror && (
                  <div class="text-danger">{error.addHospitalerrr}</div>
                )}
                {error.AddHospitalerror && (
                  <div class="text-danger">{error.AddHospitalerror}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else
    swal({
      icon: "error",
      title: "You can not add hospital",
      text: "Re-Register as Hospital to submit your Hospital details",
      confirmButtonText: "okay",
      button: true,
    }).then(() => {
      props.history.push("/dashboard");
      window.location.reload();
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
};

export default AddHospital;
