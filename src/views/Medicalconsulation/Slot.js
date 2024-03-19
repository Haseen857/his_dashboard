import React from "react";
import { useParams } from "react-router-dom";
import {
  FaCommentDots,
  FaPhoneSquareAlt,
  FaVideo,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { validateProperty, validate } from "src/common/utils";
import AddScheduleSchema from "src/schemas/AddscheduleSchema";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import "@reach/combobox/styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import Tooltip from "../../../src/components/Tooltip";
import moment from "moment";

const Slot = (props) => {
  const [visible, setVisible] = useState(false);
  const [visiblemessage, setVisiblemessage] = useState(false);
  const [visiblevideo, setVisiblevideo] = useState(false);
  const [visibleaudio, setVisibleaudio] = useState(false);
  const [visiblephysical, setVisiblephysical] = useState(false);
  const [visiblehome, setVisiblehome] = useState(false);
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const CanAddConsultationFee = token.CanAddConsultationFee;
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [consult, setconsult] = useState([]);
  const [doctorName, setName] = useState([]);
  const [currencyy, setCurrenncyy] = useState([]);
  const [slots, setSlots] = useState([]);
  const [duration, setDuration] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [isChatModelOpen, setIsChatModelOpen] = useState(false);
  const [isVideoModelOpen, setIsVideoModelOpen] = useState(false);
  const [isPhoneModelOpen, setIsPhoneModelOpen] = useState(false);
  const [isMedicalModelOpen, setIsMedicalModelOpen] = useState(false);
  const [isHomeModelOpen, setIsHomeModelOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { id } = useParams();

  const [days, setDays] = useState([
    {
      day: "monday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "tuesday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "wednesday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "thursday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "friday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "saturday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
    {
      day: "sunday",
      isSelected: false,
      timings: [
        {
          mode: "message",
          startTime: "",
          endTime: "",
        },
        {
          mode: "audio",
          startTime: "",
          endTime: "",
        },
        {
          mode: "video",
          startTime: "",
          endTime: "",
        },
        {
          mode: "physical",
          startTime: "",
          endTime: "",
        },
        {
          mode: "home",
          startTime: "",
          endTime: "",
        },
      ],
    },
  ]);

  const [consulationChargeId, setConsulationChargeId] = useState("");

  const BASE_URL = "https://countriesnow.space/api/v0.1/countries/currency";

  useEffect(() => {
    const getcurreency = async () => {
      const response = await fetch(`${BASE_URL}`).then((response) =>
        response.json()
      );

      const { data } = response;
      // debugger;
      setCurrenncyy(await data);
    };
    getcurreency();

    props
      .onGetSlots(id)
      .then((slotsResponse) => {
        let savedDays = slotsResponse.payload.days;
        value.duration = slotsResponse.payload.duration;
        setSlots(savedDays);
        setValue(value);

        let newDays = days.map((day) => {
          const newDay = savedDays.find((d) => d.day === day.day);
          if (!newDay) return day;
          const newTimings = day.timings.map((t) => {
            const newTiming = newDay.timings.find((nt) => nt.mode === t.mode);
            if (newTiming) {
              newTiming.startTime = moment
                .utc(newTiming.startTime, "HH:mm")
                .local()
                .format("HH:mm:ss");
              newTiming.endTime = moment
                .utc(newTiming.endTime, "HH:mm")
                .local()
                .format("HH:mm:ss");
            }
            return newTiming ? { ...newTiming, isSaved: true } : t;
          });
          return { ...day, timings: newTimings, isSelected: true };
        });

        setDays(newDays);
      })
      .catch((error) => {
        console.log(error, "ok error");
      });
    if (CanAddConsultationFee == true) {
      props
        .onGetConsulationcharges(id)
        .then((response) => {
          response.payload.details.find((element) => {
            if (element.mode === "message") {
              value.messageFirstVisit = element.chargeDetails[0]
                ? element.chargeDetails[0].fee
                : "";
              value.messageFollowUp = element.chargeDetails[1]
                ? element.chargeDetails[1].fee
                : "";
            }
            if (element.mode === "audio") {
              value.audioFirstVisit = element.chargeDetails[0]
                ? element.chargeDetails[0].fee
                : "";
              value.audioFollowUp = element.chargeDetails[1]
                ? element.chargeDetails[1].fee
                : "";
            }
            if (element.mode === "video") {
              value.videoFirstVisit = element.chargeDetails[0]
                ? element.chargeDetails[0].fee
                : "";
              value.videoFollowUp = element.chargeDetails[1]
                ? element.chargeDetails[1].fee
                : "";
            }
            if (element.mode === "physical") {
              value.physicalFirstVisit = element.chargeDetails[0]
                ? element.chargeDetails[0].fee
                : "";
              value.physicalFollowUp = element.chargeDetails[1]
                ? element.chargeDetails[1].fee
                : "";
            }
            if (element.mode === "home") {
              value.homeFirstVisit = element.chargeDetails[0]
                ? element.chargeDetails[0].fee
                : "";
              value.homeFollowUp = element.chargeDetails[1]
                ? element.chargeDetails[1].fee
                : "";
            }
          });
          //response.payload.currency;
          setConsulationChargeId(response.payload.id);
          value.currency = response.payload.currency;
          setValue(value);
          setconsult(response.payload.details);
        })
        .catch((error) => {});
    }
  }, []);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

    // setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, AddScheduleSchema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  try {
    let docID = "";
    if (value.doctorId) {
      docID = value.doctorId;
    }

    if (docID.length >= 3 && docID.length < 25 && typeof docID === "string") {
      props
        .onFindDoctor(docID)
        .then((res) => {
          var items = res.payload;
          setName([...items]);
          // debugger;
        })
        .catch((err) => {
          setLoading(false);

          const last3 = err.payload.message.slice(-3);
          const msg = err.payload.response.data.message;
          if (last3 === "404") {
            setError({
              ...error,
              doctorId:
                last3 === "404" && docID.length >= 2
                  ? `${msg}`
                  : error.doctorId,
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time out",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          }
        });
    }
  } catch (error) {
    console.log(error);
  }

  const handleMessaging = (e) => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "message") {
        indexed = consult.findIndex((element) => element.mode === "message");
        return true; // stop searching
      }
    });

    const data = {
      messageFirstVisit: value.messageFirstVisit,
      messageFollowUp: value.messageFollowUp,
    };

    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (value.messageFollowUp) {
      disc = consulationChargeId
        ? value.messageFollowUp
        : parseInt(value.messageFollowUp);
    } else {
      disc = consulationChargeId ? "0" : parseInt(0);
    }

    if (found) {
      consult.splice(indexed, 1, {
        mode: "message",
        chargeDetails: [
          {
            visit: "first",
            fee: consulationChargeId
              ? value.messageFirstVisit
              : parseInt(value.messageFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
      setconsult((current) => [
        ...current,
        {
          mode: "message",
          chargeDetails: [
            {
              visit: "first",
              fee: consulationChargeId
                ? value.messageFirstVisit
                : parseInt(value.messageFirstVisit),
            },
            {
              visit: "followUp",
              fee: disc,
            },
          ],
        },
      ]);
    }
    setVisiblemessage(false);
  };

  const handleVideo = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "video") {
        indexed = consult.findIndex((element) => element.mode === "video");
        return true; // stop searching
      }
    });

    if (value.videoFollowUp) {
      disc = consulationChargeId
        ? value.videoFollowUp
        : parseInt(value.videoFollowUp);
    } else {
      disc = consulationChargeId ? "0" : parseInt(0);
    }
    const data = {
      videoFirstVisit: value.videoFirstVisit,
      videoFollowUp: value.videoFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
        mode: "video",
        chargeDetails: [
          {
            visit: "first",
            fee: consulationChargeId
              ? value.videoFirstVisit
              : parseInt(value.videoFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
      setconsult((current) => [
        ...current,
        {
          mode: "video",
          chargeDetails: [
            {
              visit: "first",
              fee: consulationChargeId
                ? value.videoFirstVisit
                : parseInt(value.videoFirstVisit),
            },
            {
              visit: "followUp",
              fee: disc,
            },
          ],
        },
      ]);
    }
    setVisiblevideo(false);
  };

  const handleAudio = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "audio") {
        indexed = consult.findIndex((element) => element.mode === "audio");
        return true; // stop searching
      }
    });
    if (value.audioFollowUp) {
      disc = consulationChargeId
        ? value.audioFollowUp
        : parseInt(value.audioFollowUp);
    } else {
      disc = consulationChargeId ? "0" : parseInt(0);
    }
    const data = {
      audioFirstVisit: value.audioFirstVisit,
      audioFollowUp: value.audioFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
        mode: "audio",
        chargeDetails: [
          {
            visit: "first",
            fee: consulationChargeId
              ? value.audioFirstVisit
              : parseInt(value.audioFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
      setconsult((current) => [
        ...current,
        {
          mode: "audio",
          chargeDetails: [
            {
              visit: "first",
              fee: consulationChargeId
                ? value.audioFirstVisit
                : parseInt(value.audioFirstVisit),
            },
            {
              visit: "followUp",
              fee: disc,
            },
          ],
        },
      ]);
    }
    setVisibleaudio(false);
  };

  const handlePhysical = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "physical") {
        indexed = consult.findIndex((element) => element.mode === "physical");
        return true; // stop searching
      }
    });
    if (value.physicalFollowUp) {
      disc = consulationChargeId
        ? value.physicalFollowUp
        : parseInt(value.physicalFollowUp);
    } else {
      disc = consulationChargeId ? "0" : parseInt(0);
    }
    const data = {
      physicalFirstVisit: value.physicalFirstVisit,
      physicalFollowUp: value.physicalFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
        mode: "physical",
        chargeDetails: [
          {
            visit: "first",
            fee: consulationChargeId
              ? value.physicalFirstVisit
              : parseInt(value.physicalFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
      setconsult((current) => [
        ...current,
        {
          mode: "physical",
          chargeDetails: [
            {
              visit: "first",
              fee: consulationChargeId
                ? value.physicalFirstVisit
                : parseInt(value.physicalFirstVisit),
            },
            {
              visit: "followUp",
              fee: disc,
            },
          ],
        },
      ]);
    }

    setVisiblephysical(false);
  };

  const handleHome = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "home") {
        indexed = consult.findIndex((element) => element.mode === "home");
        return true; // stop searching
      }
    });
    if (value.homeFollowUp) {
      disc = consulationChargeId
        ? value.homeFollowUp
        : parseInt(value.homeFollowUp);
    } else {
      disc = consulationChargeId ? "0" : parseInt(0);
    }
    const data = {
      homeFirstVisit: value.homeFirstVisit,
      homeFollowUp: value.homeFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
        mode: "home",
        chargeDetails: [
          {
            visit: "first",
            fee: consulationChargeId
              ? value.homeFirstVisit
              : parseInt(value.homeFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
      setconsult((current) => [
        ...current,
        {
          mode: "home",
          chargeDetails: [
            {
              visit: "first",
              fee: consulationChargeId
                ? value.homeFirstVisit
                : parseInt(value.homeFirstVisit),
            },
            {
              visit: "followUp",
              fee: disc,
            },
          ],
        },
      ]);
    }

    setVisiblehome(false);
  };

  const DeleteSelectedSlot = (selectedDay, mode) => {
    let newDays = [...days];
    newDays.map((element) => {
      if (element.day === selectedDay) {
        element.timings.map((el) => {
          if (el.mode === mode) {
            el.startTime = "";
            el.endTime = "";
            el.isSaved = false;
          }
        });
      }
    });
    setDays(newDays);
  };

  const handleMessageModal = (day) => {
    setIsChatModelOpen(true);
    setSelectedDay(day);
  };

  const handleVideoModal = (day) => {
    setIsVideoModelOpen(true);
    setSelectedDay(day);
  };

  const handlePhoneModal = (day) => {
    setIsPhoneModelOpen(true);
    setSelectedDay(day);
  };
  const handleMedicalModal = (day) => {
    setIsMedicalModelOpen(true);
    setSelectedDay(day);
  };
  const handleHomeModal = (day) => {
    setIsHomeModelOpen(true);
    setSelectedDay(day);
  };

  const handleTimings = (mode) => {
    debugger;
    if (mode == "message") setIsChatModelOpen(false);
    if (mode == "video") setIsVideoModelOpen(false);
    if (mode == "audio") setIsPhoneModelOpen(false);
    if (mode == "physical") setIsMedicalModelOpen(false);
    if (mode == "home") setIsHomeModelOpen(false);

    console.log(selectedDay);
    let newDays = [...days];
    newDays.map((element) => {
      if (element.day === selectedDay) {
        element.timings.map((el) => {
          if (el.mode === mode) {
            el.startTime = startTime;
            el.endTime = endTime;
            el.isSaved = true;
          }
        });
      }
    });
    console.log(newDays);
    setDays(newDays);
    setStartTime("");
    setEndTime("");
  };

  const onChangeStatus = (value, day) => {
    let newDays = [...days];
    debugger;
    if (value) {
      newDays.filter(function (el) {
        return el.day == day;
      })[0].isSelected = true;
    } else {
      newDays.filter(function (el) {
        return el.day == day;
      })[0].isSelected = false;
    }
    setDays(newDays);

    // alert(value, day)
    console.log(days);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let disc = 0;

    if (value.discount) {
      disc = consulationChargeId ? value.discount : parseInt(value.discount);
    }

    const data = {
      doctorId: id,
      discount: "200",
      currency: value.currency,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    setLoading(true);

    if (!data.doctorId) {
      // debugger;
      setError({
        ...error,
        doctorId: !data.doctorId ? "doctor Id is required" : error.doctorId,
      });
    } else if (!data.currency) {
      setError({
        ...error,
        currency: !data.currency ? "currency is required" : error.currency,
      });
    } else if (!data.discount) {
      setError({
        ...error,

        discount: !data.discount
          ? "discount amount is required"
          : error.discount,
      });
    } else if (
      (value.messageFirstVisit ||
        value.videoFirstVisit ||
        value.audioFirstVisit ||
        value.physicalFirstVisit) &&
      consult.length !== 0
    ) {
      const payload = {
        doctorId: id,
        discount: disc,
        currency: value.currency,
        details: consult,
      };

      let url;
      if (type == "hospital") {
        if (consulationChargeId) {
          url = `hospital-doctors/${payload.doctorId}/doctor-charges`;
        } else {
          url = "hospital-doctors/doctor-charges";
        }
      } else if (type == "doctor") {
        if (consulationChargeId) {
          url = `doctors-charges`;
        } else {
          url = "doctors-charges";
        }
      }

      // debugger;
      props
        .onsubmitedconsultation(payload, consulationChargeId, url)
        .then((response) => {
          // storeObjectData(config.AuthStorageKey, response.payload);
          // props.history.push("");
          swal({
            icon: "success",
            title: "Successfully Saved",
            text: "Saved Consultation Charges , Fill Visiting Hours",
            // confirmButtonText: "okay",
            button: false,
            timer: 3000,
          }).then(() => {
            // props.history.push(`/slot/visitinghours/` + value.doctorId);
            window.location.reload();
          });
        })
        .catch((error) => {
          setLoading(false);
          const last3 = error.payload.message.slice(-3);
          const msg = error.payload.response.data.message;

          if (last3 === "422") {
            swal({
              icon: "info",
              title: "Doctor already have a Financial Record",
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
              ["Addchargeerror"]: error.payload.message,
              // ["addHospitalerrr"]: "you have already Submited the form",
            });
        });
    } else {
      swal({
        icon: "warning",
        title: "Fill Consultation Charges",
        text: "Setup consulation Charges for Modes according to your need before submitting",
        // confirmButtonText: "okay",
        button: false,
        timer: 3000,
        // cancel: true,
      });
    }
  };

  const handleSubmitSchedule = (e) => {
    e.preventDefault();
    debugger;
    let newDays = [...days];
    let updatedArray = newDays.filter(function (el) {
      return el.isSelected;
    });

    for (var i = 0; i < updatedArray.length; i++) {
      updatedArray[i].timings = updatedArray[i].timings.filter(
        (subElement) => subElement.isSaved
      );
      for (var j = 0; j < updatedArray[i].timings.length; j++) {
        updatedArray[i].timings[j].startTime = moment(
          updatedArray[i].timings[j].startTime,
          "HH:mm"
        )
          .utc()
          .format("HH:mm:ss");
        updatedArray[i].timings[j].endTime = moment(
          updatedArray[i].timings[j].endTime,
          "HH:mm"
        )
          .utc()
          .format("HH:mm:ss");
      }
    }

    // updatedArray = updatedArray.map(element =>  element.timings.filter(el=> el.isSaved))
    // updatedArray = updatedArray.map((element) => {
    //   return {
    //     ...element,
    //     timings: element.timings.filter((subElement) => subElement.isSaved),
    //     timings: element.timings.map((timing) => {
    //       (timing.startTime = moment(timing.startTime, "HH:mm")
    //         .utc()
    //         .format("HH:mm:ss")),
    //         (timing.endTime = moment(timing.endTime, "HH:mm")
    //           .utc()
    //           .format("HH:mm:ss"));
    //     }),
    //   };
    // });
    console.log(updatedArray);

    setLoading(true);
    const payload = {
      doctorId: id,
      duration: value.duration,
      days: updatedArray,
    };
    if (!payload.doctorId) {
      // debugger;
      setError({
        ...error,
        doctorId: !payload.doctorId ? "doctor Id is required" : error.doctorId,
      });
    }
    if (parseInt(value.duration) < 5 || parseInt(value.duration) > 30) {
      // debugger;
      setError({
        ...error,
        duration:
          parseInt(value.duration) < 5 || parseInt(value.duration) > 30
            ? "Duration should be between 5 to 30 minutes"
            : error.duration,
      });
      return false;
    }

    // debugger;
    props
      .onsubmitedSlots(payload)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        // props.history.push("");
        swal({
          icon: "success",
          title: "Successfully Saved",
          text: "Saved Consultation Charges , Fill Visiting Hours",
          // confirmButtonText: "okay",
          button: false,
          timer: 3000,
        }).then(() => {
          props.history.push(`/dashboard`);
        });
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        const msg = error.payload.response.data.message;

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Doctor already have a Financial Record",
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
            ["Addchargeerror"]: error.payload.message,
            // ["addHospitalerrr"]: "you have already Submited the form",
          });
      });
  };
  return (
    <>
      {/* Consultation Html Starts */}
      {CanAddConsultationFee == true && (
        <div>
          <div className="form-header">
            <h5 className="lineformtitle">consultation charges</h5>
          </div>
          <form className="row  d-flex justify-content-start ml-20">
            {/* <div className="col-md-5">
            <label
              for="inputPassword4"
              className="form-label  add-view-product-label-hospital"
            >
              Doctor Id
            </label>
            <input
              className="form-controls"
              id="doctorId"
              data-coreui-multiple="false"
              // className="form-controls"
              onChange={onChange}
              name="doctorId"
              placeholder="Please Enter doctor id"
              // value={hospital.country}
            ></input>
            <p style={{ color: "red" }}>
              {error.doctorId && <div class="text-danger">{error.doctorId}</div>}
            </p>
          </div> */}
            <div className="col-md-5">
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
              <p style={{ color: "red" }}>
                {error.currency && (
                  <div class="text-danger">{error.currency}</div>
                )}
              </p>
            </div>
          </form>
          <br />
          <br />
          <br />
          <div className="row main-div">
            <div className="d-flex justify-content-between ">
              <div className="col-md-4">
                <div className="card-main">
                  <div className="inside-main">
                    <FaCommentDots className="facicon" />
                    <p>Message</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          position: "relative",
                          top: "15px",
                          borderBottom: "3px solid",
                        }}
                      >
                        First Visit
                      </p>

                      <p
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        {value.messageFirstVisit}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        position: "relative",
                        top: "15px",
                        borderBottom: "3px solid",
                      }}
                    >
                      Follow Up
                    </p>

                    <p
                      className="d-flex justify-content-center"
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {value.messageFollowUp}
                    </p>
                  </div>

                  <button
                    onClick={() => setVisiblemessage(!visiblemessage)}
                    className="slot-button"
                    // disabled={visitmesg}
                  >
                    Edit
                  </button>
                  <CModal
                    alignment="center"
                    visible={visiblemessage}
                    onClose={() => setVisiblemessage(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>
                        <div>
                          <h5 style={{ marginLeft: "57px" }}>
                            Message Consultation Fee
                          </h5>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div className="row">
                        <div className="col-md-5">
                          <h6>1st appoinment:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="messageFirstVisit"
                            name="messageFirstVisit"
                            type="text"
                            style={{ padding: "3px  6px", outline: "none" }}
                            value={value.messageFirstVisit}
                            required
                          />

                          <p style={{ color: "red" }}>
                            {error.messageFirstVisit && (
                              <div class="text-danger">
                                {error.messageFirstVisit}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5">
                          <i class="fa-solid fa-message"></i>
                          <h6>Follow-up:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="messageFollowUp"
                            name="messageFollowUp"
                            type="text"
                            style={{ padding: "3px  6px", outline: "none" }}
                            value={value.messageFollowUp}
                            disabled={
                              value.messageFirstVisit &&
                              !error.messageFirstVisit
                                ? false
                                : true
                            }
                          />
                          <p style={{ color: "red" }}>
                            {error.messageFollowUp && (
                              <div class="text-danger">
                                {error.messageFollowUp}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="slot-button"
                        onClick={handleMessaging}
                        disabled={
                          error.messageFirstVisit || error.messageFollowUp
                            ? true
                            : false
                        }
                      >
                        Save
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card-main">
                  <div className="inside-main">
                    <FaVideo className="facicon" />
                    <p>Video Call</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          position: "relative",
                          top: "15px",
                          borderBottom: "3px solid",
                        }}
                      >
                        First Visit
                      </p>

                      <p
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        {value.videoFirstVisit}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        position: "relative",
                        top: "15px",
                        borderBottom: "3px solid",
                      }}
                    >
                      Follow Up
                    </p>

                    <p
                      className="d-flex justify-content-center"
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {value.videoFollowUp}
                    </p>
                  </div>
                  <button
                    onClick={() => setVisiblevideo(!visiblevideo)}
                    className="slot-button"
                  >
                    Edit
                  </button>
                  <CModal
                    alignment="center"
                    visible={visiblevideo}
                    onClose={() => setVisiblevideo(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>
                        <div>
                          <h5 style={{ marginLeft: "57px" }}>
                            Video Consultation Fee
                          </h5>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div className="row">
                        <div className="col-md-5">
                          <h6>1st appoinment:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="videoFirstVisit"
                            name="videoFirstVisit"
                            type="text"
                            value={value.videoFirstVisit}
                            style={{ padding: "3px  6px", outline: "none" }}
                          />
                          <p style={{ color: "red" }}>
                            {error.videoFirstVisit && (
                              <div class="text-danger">
                                {error.videoFirstVisit}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5">
                          <i class="fa-solid fa-message"></i>
                          <h6>Follow-up:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="videoFollowUp"
                            name="videoFollowUp"
                            type="text"
                            value={value.videoFollowUp}
                            style={{ padding: "3px  6px", outline: "none" }}
                            disabled={
                              value.videoFirstVisit && !error.videoFirstVisit
                                ? false
                                : true
                            }
                          />
                          <p style={{ color: "red" }}>
                            {error.videoFollowUp && (
                              <div class="text-danger">
                                {error.videoFollowUp}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="slot-button"
                        onClick={handleVideo}
                        disabled={
                          error.videoFirstVisit || error.videoFollowUp
                            ? true
                            : false
                        }
                      >
                        Save
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card-main">
                  <div className="inside-main">
                    <FaPhoneSquareAlt className="facicon" />
                    <p>Audio Call</p>
                  </div>

                  <div className="d-flex justify-content-around">
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          position: "relative",
                          top: "15px",
                          borderBottom: "3px solid",
                        }}
                      >
                        First Visit
                      </p>

                      <p
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        {value.audioFirstVisit}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        position: "relative",
                        top: "15px",
                        borderBottom: "3px solid",
                      }}
                    >
                      Follow Up
                    </p>

                    <p
                      className="d-flex justify-content-center"
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {value.audioFollowUp}
                    </p>
                  </div>
                  <button
                    onClick={() => setVisibleaudio(!visibleaudio)}
                    className="slot-button"
                  >
                    Edit
                  </button>
                  <CModal
                    alignment="center"
                    visible={visibleaudio}
                    onClose={() => setVisibleaudio(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>
                        <div>
                          <h5 style={{ marginLeft: "57px" }}>
                            Audio Consultation Fee
                          </h5>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div className="row">
                        <div className="col-md-5">
                          <h6>1st appoinment:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="audioFirstVisit"
                            name="audioFirstVisit"
                            type="text"
                            value={value.audioFirstVisit}
                            style={{ padding: "3px  6px", outline: "none" }}
                          />
                          <p style={{ color: "red" }}>
                            {error.audioFirstVisit && (
                              <div class="text-danger">
                                {error.audioFirstVisit}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5">
                          <i class="fa-solid fa-message"></i>
                          <h6>Follow-up:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="audioFollowUp"
                            name="audioFollowUp"
                            type="text"
                            value={value.audioFollowUp}
                            style={{ padding: "3px  6px", outline: "none" }}
                            disabled={
                              value.audioFirstVisit && !error.audioFirstVisit
                                ? false
                                : true
                            }
                          />
                          <p style={{ color: "red" }}>
                            {error.audioFollowUp && (
                              <div class="text-danger">
                                {error.audioFollowUp}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="slot-button"
                        onClick={handleAudio}
                        disabled={
                          error.audioFirstVisit || error.audioFollowUp
                            ? true
                            : false
                        }
                      >
                        Save
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-around ">
              <div className="col-md-4" style={{ marginTop: "40px" }}>
                <div className="card-main">
                  <div className="inside-main">
                    <FaMapMarkerAlt className="facicon" />
                    <p>Physical</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          position: "relative",
                          top: "15px",
                          borderBottom: "3px solid",
                        }}
                      >
                        First Visit
                      </p>

                      <p
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        {value.physicalFirstVisit}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        position: "relative",
                        top: "15px",
                        borderBottom: "3px solid",
                      }}
                    >
                      Follow Up
                    </p>

                    <p
                      className="d-flex justify-content-center"
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {value.physicalFollowUp}
                    </p>
                  </div>
                  <button
                    onClick={() => setVisiblephysical(!visiblephysical)}
                    className="slot-button"
                  >
                    Edit
                  </button>
                  <CModal
                    alignment="center"
                    visible={visiblephysical}
                    onClose={() => setVisiblephysical(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>
                        <div>
                          <h5 style={{ marginLeft: "57px" }}>
                            Physical Consultation Fee
                          </h5>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div className="row">
                        <div className="col-md-5">
                          <h6>1st appoinment:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="physicalFirstVisit"
                            name="physicalFirstVisit"
                            type="text"
                            value={value.physicalFirstVisit}
                            style={{ padding: "3px  6px", outline: "none" }}
                          />
                          <p style={{ color: "red" }}>
                            {error.physicalFirstVisit && (
                              <div class="text-danger">
                                {error.physicalFirstVisit}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5">
                          <i class="fa-solid fa-message"></i>
                          <h6>Follow-up:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="physicalFollowUp"
                            name="physicalFollowUp"
                            type="text"
                            value={value.physicalFollowUp}
                            style={{ padding: "3px  6px", outline: "none" }}
                            disabled={
                              value.physicalFirstVisit &&
                              !error.physicalFirstVisit
                                ? false
                                : true
                            }
                          />
                          <p style={{ color: "red" }}>
                            {error.physicalFollowUp && (
                              <div class="text-danger">
                                {error.physicalFollowUp}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="slot-button"
                        onClick={handlePhysical}
                        disabled={
                          error.physicalFirstVisit || error.physicalFollowUp
                            ? true
                            : false
                        }
                      >
                        Save
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>

              <div className="col-md-4" style={{ marginTop: "40px" }}>
                <div className="card-main">
                  <div className="inside-main">
                    <FaHome className="facicon" />
                    <p>Home</p>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          position: "relative",
                          top: "15px",
                          borderBottom: "3px solid",
                        }}
                      >
                        First Visit
                      </p>

                      <p
                        className="d-flex justify-content-center"
                        style={{ fontWeight: "600", fontSize: "15px" }}
                      >
                        {value.homeFirstVisit}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        position: "relative",
                        top: "15px",
                        borderBottom: "3px solid",
                      }}
                    >
                      Follow Up
                    </p>

                    <p
                      className="d-flex justify-content-center"
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {value.homeFollowUp}
                    </p>
                  </div>
                  <button
                    onClick={() => setVisiblehome(!visiblehome)}
                    className="slot-button"
                  >
                    Edit
                  </button>
                  <CModal
                    alignment="center"
                    visible={visiblehome}
                    onClose={() => setVisiblehome(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>
                        <div>
                          <h5 style={{ marginLeft: "57px" }}>
                            Home Consultation Fee
                          </h5>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div className="row">
                        <div className="col-md-5">
                          <h6>1st appoinment:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="homeFirstVisit"
                            name="homeFirstVisit"
                            type="text"
                            value={value.homeFirstVisit}
                            style={{ padding: "3px  6px", outline: "none" }}
                          />
                          <p style={{ color: "red" }}>
                            {error.homeFirstVisit && (
                              <div class="text-danger">
                                {error.homeFirstVisit}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5">
                          <i class="fa-solid fa-message"></i>
                          <h6>Follow-up:</h6>
                        </div>
                        <div className="col-md-6">
                          <input
                            onChange={onChange}
                            id="homeFollowUp"
                            name="homeFollowUp"
                            type="text"
                            value={value.homeFollowUp}
                            style={{ padding: "3px  6px", outline: "none" }}
                            disabled={
                              value.homeFirstVisit && !error.homeFirstVisit
                                ? false
                                : true
                            }
                          />
                          <p style={{ color: "red" }}>
                            {error.homeFollowUp && (
                              <div class="text-danger">
                                {error.homeFollowUp}
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="slot-button"
                        onClick={handleHome}
                        disabled={
                          error.homeFirstVisit || error.homeFollowUp
                            ? true
                            : false
                        }
                      >
                        Save
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div style={{ textAlign: "end", marginBottom: "50px" }}>
            <button
              className="rounded-0 Submit-form-view-hospital"
              type="Submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Slot Html Starts */}
      <br />
      <label
        for="inputPassword4"
        className="form-label  add-view-product-label-hospital"
        style={{ fontSize: "25px" }}
      >
        {" "}
        Slot Duration{" "}
      </label>
      <div className="row">
        <div className="col-md-1 d-flex align-items-center">
          <input
            className="form-controls"
            type="text"
            value={value.duration}
            name="duration"
            onChange={onChange}
            style={{ fontSize: "18px", width: "60px" }}
          />
          <span
            style={{ marginLeft: "10px", fontSize: "22px", fontWeight: "500" }}
          >
            Minutes
          </span>
        </div>
      </div>
      <p style={{ color: "red" }}>
        {error.duration && <div class="text-danger">{error.duration}</div>}
      </p>
      <div className="form-header">
        <h5 className="lineformtitle">Doctor's Schedule</h5>
      </div>
      {/* 
        according */}
      <div className="row">
        {days.map((item, index) => (
          <div className="col-md-4">
            <section class="container">
              <div class="ac">
                <input
                  class="ac-input"
                  id={"acr-" + index}
                  name={"acr-" + index}
                  type="checkbox"
                />
                <label
                  class="ac-label d-flex justify-content-between"
                  for={"acr-" + index}
                >
                  {item.day}
                  <div
                    class="checkbox switcher"
                    style={{ marginRight: "30px" }}
                  >
                    <label for={"acr1-" + index} key={index}>
                      <input
                        type="checkbox"
                        id={"acr1-" + index}
                        onChange={(e) =>
                          onChangeStatus(e.target.checked, item.day)
                        }
                        checked={item.isSelected}
                      />
                      <span>
                        <small></small>
                      </span>
                    </label>
                  </div>
                </label>

                <article class="ac-text">
                  <div class="ac-sub">
                    <input
                      class="ac-input"
                      id={"ac-2" + index}
                      name={"ac-2" + index}
                      type="checkbox"
                    />
                    <label
                      class="ac-label"
                      for={"ac-2" + index}
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      Add consultation timings
                    </label>
                    <article class="ac-sub-text">
                      <table id="customers-table">
                        <tr>
                          <td>
                            <button
                              onClick={() => handleMessageModal(item.day)}
                              style={{ background: "none", border: "none" }}
                            >
                              <Tooltip title="Message">
                                <span>
                                  <FaCommentDots className="facicon-inside" />
                                </span>
                              </Tooltip>

                              <span
                                style={{
                                  paddingLeft: "20px",
                                  color: "#213f9a",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "message"
                                  )[0]?.startTime
                                }
                                {"   "}
                                &nbsp; &nbsp;
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "message"
                                  )[0]?.endTime
                                }
                              </span>
                            </button>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                DeleteSelectedSlot(item.day, "message")
                              }
                            >
                              {item.timings.filter(
                                (el) => el.mode == "message"
                              )[0]?.startTime != ""
                                ? "X"
                                : ""}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <button
                              onClick={() => handleVideoModal(item.day)}
                              style={{ background: "none", border: "none" }}
                            >
                              <Tooltip title="Video Call">
                                <span>
                                  <FaVideo className="facicon-inside" />{" "}
                                </span>
                              </Tooltip>
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  color: "#213f9a",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "video"
                                  )[0]?.startTime
                                }{" "}
                                &nbsp; &nbsp;
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "video"
                                  )[0]?.endTime
                                }
                              </span>
                            </button>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                DeleteSelectedSlot(item.day, "video")
                              }
                            >
                              {item.timings.filter(
                                (el) => el.mode == "video"
                              )[0]?.startTime != ""
                                ? "X"
                                : ""}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <button
                              onClick={() => handlePhoneModal(item.day)}
                              style={{ background: "none", border: "none" }}
                            >
                              <Tooltip title="Audio Call">
                                <span>
                                  <FaPhoneSquareAlt className="facicon-inside" />
                                </span>
                              </Tooltip>
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  color: "#213f9a",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "audio"
                                  )[0]?.startTime
                                }{" "}
                                &nbsp; &nbsp;
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "audio"
                                  )[0]?.endTime
                                }
                              </span>
                            </button>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                DeleteSelectedSlot(item.day, "audio")
                              }
                            >
                              {item.timings.filter(
                                (el) => el.mode == "audio"
                              )[0]?.startTime != ""
                                ? "X"
                                : ""}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              onClick={() => handleMedicalModal(item.day)}
                              style={{ background: "none", border: "none" }}
                            >
                              <Tooltip title="Physical">
                                <span>
                                  <FaMapMarkerAlt className="facicon-inside" />
                                </span>
                              </Tooltip>
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  color: "#213f9a",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "physical"
                                  )[0]?.startTime
                                }{" "}
                                &nbsp; &nbsp;
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "physical"
                                  )[0]?.endTime
                                }
                              </span>
                            </button>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                DeleteSelectedSlot(item.day, "physical")
                              }
                            >
                              {item.timings.filter(
                                (el) => el.mode == "physical"
                              )[0]?.startTime != ""
                                ? "X"
                                : ""}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <button
                              onClick={() => handleHomeModal(item.day)}
                              style={{ background: "none", border: "none" }}
                            >
                              <Tooltip title="Home">
                                <span>
                                  <FaHome className="facicon-inside" />
                                </span>
                              </Tooltip>
                              <span
                                style={{
                                  paddingLeft: "20px",
                                  color: "#213f9a",
                                  fontWeight: "600",
                                  fontSize: "17px",
                                }}
                              >
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "home"
                                  )[0]?.startTime
                                }{" "}
                                &nbsp; &nbsp;
                                {
                                  item.timings.filter(
                                    (el) => el.mode == "home"
                                  )[0]?.endTime
                                }
                              </span>
                            </button>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                DeleteSelectedSlot(item.day, "home")
                              }
                            >
                              {item.timings.filter((el) => el.mode == "home")[0]
                                ?.startTime != ""
                                ? "X"
                                : ""}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </article>
                  </div>
                </article>
              </div>
            </section>
          </div>
        ))}

        {/* Message Model start --->*/}

        <CModal
          alignment="center"
          visible={isChatModelOpen}
          onClose={() => setIsChatModelOpen(false)}
        >
          {/* CHAT CARD? */}
          <CModalHeader>
            <CModalTitle>
              <FaCommentDots className="facicon-inside" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="time"
                name="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value + ":00")}
              />
              <h5>To</h5>
              <input
                type="time"
                name="end_time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value + ":00")}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              className="slot-button"
              onClick={() => handleTimings("message")}
            >
              Save{" "}
            </button>
          </CModalFooter>
        </CModal>

        {/* Message Model end */}

        {/* Video modal start---> */}
        <CModal
          alignment="center"
          visible={isVideoModelOpen}
          onClose={() => setIsVideoModelOpen(false)}
        >
          <CModalHeader>
            <CModalTitle>
              <FaVideo className="facicon-inside" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="time"
                name="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value + ":00")}
              />
              <h5>To</h5>
              <input
                type="time"
                name="end_time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value + ":00")}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              className="slot-button"
              onClick={() => handleTimings("video")}
            >
              Save{" "}
            </button>
          </CModalFooter>
        </CModal>

        {/* video modal end */}

        {/* PHONE MODAL START---> */}
        <CModal
          alignment="center"
          visible={isPhoneModelOpen}
          onClose={() => setIsPhoneModelOpen(false)}
        >
          <CModalHeader>
            <CModalTitle>
              <FaPhoneSquareAlt className="facicon-inside" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="time"
                name="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value + ":00")}
              />
              <h5>To</h5>
              <input
                type="time"
                name="end_time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value + ":00")}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              className="slot-button"
              onClick={() => handleTimings("audio")}
            >
              Save{" "}
            </button>
          </CModalFooter>
        </CModal>

        {/* PHONE MODAL END */}

        {/* MEDICAL MODAL START */}
        <CModal
          alignment="center"
          visible={isMedicalModelOpen}
          onClose={() => setIsMedicalModelOpen(false)}
        >
          <CModalHeader>
            <CModalTitle>
              <FaMapMarkerAlt className="facicon-inside" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="time"
                name="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value + ":00")}
              />
              <h5>To</h5>
              <input
                type="time"
                name="end_time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value + ":00")}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              className="slot-button"
              onClick={() => handleTimings("physical")}
            >
              Save{" "}
            </button>
          </CModalFooter>
        </CModal>

        {/* Medical modal end */}

        {/* Home MODAL START */}
        <CModal
          alignment="center"
          visible={isHomeModelOpen}
          onClose={() => setIsHomeModelOpen(false)}
        >
          <CModalHeader>
            <CModalTitle>
              <FaHome className="facicon-inside" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <input
                type="time"
                name="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value + ":00")}
              />
              <h5>To</h5>
              <input
                type="time"
                name="end_time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value + ":00")}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              className="slot-button"
              onClick={() => handleTimings("home")}
            >
              Save{" "}
            </button>
          </CModalFooter>
        </CModal>

        {/* Home modal end */}
      </div>
      <hr className="horizontal-line" />
      <div style={{ textAlign: "end", marginBottom: "50px" }}>
        <button
          className="rounded-0 Submit-form-view-hospital"
          type="Submit"
          onClick={handleSubmitSchedule}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Slot;
