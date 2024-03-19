import React, {
  useState,
  // useEffect,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Route, useParams } from "react-router-dom";
import Joi from "joi-browser";
//validation
import AddHospitalschema from "src/schemas/AddHospitalSchema";
import { validate, validateProperty } from "src/common/utils";
import swal from "sweetalert";
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
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import Select from "react-dropdown-select";
import jwt from "jwt-decode";
import config from "../../config";

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

function HospitalEdit(props) {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cityCountry, setCityCountry] = useState([]);
  // const [openCountry, setOpenCountry] = useState(false);
  // const [citiesVal, setCitiesVal] = useState(null);
  const [cities, setCities] = useState([]);

  const [Hospital, setHospital] = useState([]);
  const [country, setCountry] = useState([]);
  const [stetes, setSat] = useState([]);

  const [libraries] = useState(["places"]);

  const hospitalsRef = useRef();
  const [addressed, setaddressed] = useState({});

  const [marker, setMarkers] = useState([]);

  const [selected, setSelected] = useState(null);
  const mapRef = useRef();
  let addressview;
  hospitalsRef.current = Hospital;

  var lastell;

  if (marker.length > 0) {
    lastell = marker[marker.length - 1];
  }

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  useEffect(() => {
    props
      .onfindhospitalbyid(lastItem)
      .then((response) => {
        setValue(response.payload);
      })
      .catch((error) => {
        // debugger;
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        if (last3 === "403") {
          swal({
            icon: "error",
            title: "Not Authorised",
            text: "contact Administration if this is a mistake!",
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            props.history.push("/viewhospital");
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
        setError({
          ...error,
          ["AddDoctorError"]: error.payload.message,
        });
      });
  }, []);

  const ided = props.location;
  const lastItem = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, AddHospitalschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

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

  let center = useMemo(
    () => ({
      lat: 27.94466114058591,
      lng: 78.083339615344,
    }),
    []
  );
  // useEffect(() => {
  //   lastell = {
  //     lat: value.location.lat,
  //     lng: value.location.lng,
  //   };
  // }, [ided]);

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBraTAU2n0EbB59TX5ufTIEoFnrLgAMHuk",
    libraries,
  });

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);
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

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const handleEditHospital = (e) => {
    e.preventDefault();
    value.status = value.status ? "true" : "false";
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
      address: value.address,
      mobileNo: value.mobileNo,
      latitude: lastell.lat,
      longitude: lastell.lng,
    };

    props
      .onupdatehospital(lastItem, payload)
      .then((response) => {
        swal({
          icon: "success",
          title: "Updated Successfully",
        }).then(() => {
          if (type == "hospital") {
            props.history.push("/profile");
          } else {
            props.history.push("/viewhospital");
          }
        });
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        if (last3 === "403") {
          swal({
            icon: "error",
            title: "Not Authorised",
            text: "contact Administration if this is a mistake!",
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            props.history.push("/viewhospital");
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

        setError({
          ...error,
          ["EditHospitalError"]: error.payload.message,
        });
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="main-div">
          <div className="form-header">
            <h5 className="lineformtitle">Update Hospital Details</h5>
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
                {type === "hospital" ? (
                  <input
                    type="text"
                    className="form-controls"
                    placeholder="Enter Hospital Name"
                    id="hospitalName"
                    name="hospitalName"
                    readOnly="readonly"
                    value={value.hospitalName || ""}
                    onChange={onChange}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-controls"
                    placeholder="Enter Hospital Name"
                    id="hospitalName"
                    name="hospitalName"
                    value={value.hospitalName || ""}
                    onChange={onChange}
                  />
                )}
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
                  value={value.mobileNo || ""}
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
                  value={value.phoneNo || ""}
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
                  value={value.address || ""}
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
                  placeholder={value.country ? value.country : "Select Country"}
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
            </div>
            <br />
          </div>
          {/* <div>
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
          </div> */}
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

          <div style={{ textAlign: "end", marginBottom: "50px" }}>
            <button
              className="rounded-0 Submit-form-view-hospital"
              type="submit"
              onClick={handleEditHospital}
            >
              Update
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
    </>
  );
}

export default HospitalEdit;
