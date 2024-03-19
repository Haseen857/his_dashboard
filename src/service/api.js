import React from "react";
import axios from "axios";
import * as types from "../store/Constants";
import config from "../config";
import swal from "sweetalert";
//import history from "../services/history";

//import { message } from "antd";
// const config = "https://beta-api.ezymigrate.co.nz/";

let RefreshToken = true;
let SessionDeath = true;

let CallStack = [];
const onClose = () => {
  localStorage.clear();
  window.location.reload();
};
const api = {
  authLogin:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            reject(
              dispatch({
                type: failure,
                payload: err.response.data,
              })
            );
          });
      };

      return new Promise(promise);
    },

  authRegister:
    (options, params = null) =>
    async (dispatch) => {
      debugger;
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            debugger;
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((error) => {
            debugger;
            reject(
              dispatch({
                type: failure,
                payload: error.response.data,
              })
            );
          });
      };

      return new Promise(promise);
    },

  getLogout: (options) => async (dispatch) => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config}${options.url}`,

        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          reject(
            dispatch({
              type: failure,
              payload: err,
            })
          );
        });
    };

    return new Promise(promise);
  },
  get: (options) => async (dispatch) => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config.BaseUrl}${options.url}`,
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
        .then((res) => {
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          //refreshTokenData(err, 1, options, null);
          const last3 = err.message.slice(-3);
          if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          } else {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          }
        });
    };
    return new Promise(promise);
  },

  getcountry: (options) => async (dispatch) => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `https://countriesnow.space/api/v0.1/countries`,
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
        .then((res) => {
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          //refreshTokenData(err, 1, options, null);
          const last3 = err.message.slice(-3);
          if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          } else {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          }
        });
    };
    return new Promise(promise);
  },
  getFile: (options) => async (dispatch) => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config.BaseUrl}${options.url}`,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
        .then((res) => {
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          //refreshTokenData(err, 1, options, null);
          const last3 = err.message.slice(-3);
          if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          } else {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          }
        });
    };
    return new Promise(promise);
  },
  deleted:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem("AuthDetails"));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        return axios({
          method: "DELETE",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            //"Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          });
      };
      return new Promise(promise);
    },
  getId:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem("AuthDetails"));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        return axios({
          method: "GET",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          });
      };
      return new Promise(promise);
    },
  postWithFileRes:
    (options, params = null) =>
    async (dispatch) => {
      console.log(params);
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem("AuthDetails"));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        var formData = new FormData();
        formData.append("files", params);
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: formData,
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + token.accessToken,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 2, options, params);
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          });
      };

      return new Promise(promise);
    },

  uploadMultipleFiles:
    (options, params = undefined) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }

        // const header = {
        //   Authorization: "Bearer " + token.accessToken,
        //   Accept: "application/json",
        //   "Content-Type": "multipart/form-data",
        // };
        // return axios(URL, {
        //   method: "POST",
        //   headers: header,
        //   data: payload,
        // })
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 2, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };
      return new Promise(promise);
    },

  uploadMultipleFilesPut:
    (options, params = undefined) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }

        // const header = {
        //   Authorization: "Bearer " + token.accessToken,
        //   Accept: "application/json",
        //   "Content-Type": "multipart/form-data",
        // };
        // return axios(URL, {
        //   method: "POST",
        //   headers: header,
        //   data: payload,
        // })
        axios({
          method: "PUT",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 2, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };
      return new Promise(promise);
    },

  post:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 2, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };

      return new Promise(promise);
    },
  postWithFormData:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "POST",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 2, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };

      return new Promise(promise);
    },
  put:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "PUT",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 3, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };

      return new Promise(promise);
    },
  putWithFormData:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "PUT",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 3, options, params);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };

      return new Promise(promise);
    },
  patch:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "PATCH",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            // refreshTokenData(err, 2, options, param);
            const last3 = err.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                localStorage.clear();
                window.location.reload();
              });
            } else {
              reject(
                dispatch({
                  type: failure,
                  payload: err,
                })
              );
            }
          });
      };

      return new Promise(promise);
    },
  patchWithoutParm:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "PATCH",
          url: `${config.BaseUrl}${options.url}`,
          // data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          });
      };

      return new Promise(promise);
    },
  delete:
    (options, params = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        var token = localStorage.getItem("token");
        if (token == null) {
          token = localStorage.getItem("admintoken");
        }
        axios({
          method: "DELETE",
          url: `${config.BaseUrl}${options.url}`,
          data: params,
          headers: {
            Authorization: "Bearer " + token.accessToken,
          },
        })
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data,
              })
            );
          })
          .catch((err) => {
            refreshTokenData(err, 4, options, params);
            reject(
              dispatch({
                type: failure,
                payload: err,
              })
            );
          });
      };

      return new Promise(promise);
    },
};

const apiRefresh = {
  authLogin: (options, params = null) => {
    const promise = (resolve, reject) => {
      axios({
        method: "POST",
        url: `${config}${options.url}`,
        data: params,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    };

    return new Promise(promise);
  },
  getLogout: (options) => {
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config}${options.url}`,

        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {})
        .catch((err) => {});
    };

    return new Promise(promise);
  },
  get: (options) => {
    const promise = (resolve, reject) => {
      var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config.BaseUrl}${options.url}`,
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          // refreshTokenData(err, 2, options, param);
          const last3 = err.message.slice(-3);
          if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          } else {
            reject(err);
          }
        });
    };
    return new Promise(promise);
  },
  getFile: (options) => {
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      return axios({
        method: "GET",
        url: `${config}${options.url}`,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {})
        .catch((err) => {});
    };
    return new Promise(promise);
  },
  post: (options, params = null) => {
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      axios({
        method: "POST",
        url: `${config}${options.url}`,
        data: params,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    };

    return new Promise(promise);
  },
  put: (options, params = null) => {
    const promise = (resolve, reject) => {
      var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      axios({
        method: "PUT",
        url: `${config.BaseUrl}${options.url}`,
        data: params,
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          // refreshTokenData(err, 2, options, param);
          const last3 = err.message.slice(-3);
          if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          } else {
            reject(err);
          }
        });
    };

    return new Promise(promise);
  },
  patch: (options, params = null) => {
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      axios({
        method: "PATCH",
        url: `${config}${options.url}`,
        data: params,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {})
        .catch((err) => {});
    };

    return new Promise(promise);
  },
  delete: (options, params = null) => {
    const promise = (resolve, reject) => {
      var token = localStorage.getItem("token");
      if (token == null) {
        token = localStorage.getItem("admintoken");
      }
      axios({
        method: "DELETE",
        url: `${config}${options.url}`,
        data: params,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    };

    return new Promise(promise);
  },
};

const refreshTokenData = async (err, apiType, opt, param) => {
  if (
    err &&
    err.response &&
    err.response.status === 401 &&
    err.response.data &&
    err.response.data.code == 2
  ) {
    if (RefreshToken) {
      RefreshToken = false;

      const options = {
        url: "v1/user/identity/RefreshToken",
      };

      options.types = [types.REFRESH_SUCCESS, types.REFRESH_FAILURE];
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken == null || refreshToken == "undefined") {
        localStorage.clear();
        //history.location.push("/login");
        //window.location.reload();
      }
      var data = { refreshToken: refreshToken };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        refreshToken: refreshToken,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${config}${options.url}`, requestOptions)
        .then((result) => result.json())
        .then((res) => {
          console.log(res);

          const admintoken = localStorage.getItem("admintoken");
          if (admintoken) {
            localStorage.removeItem("admintoken");
            localStorage.setItem("admintoken", res.accessToken);
          } else {
            localStorage.removeItem("token");
            localStorage.setItem("token", res.accessToken);
          }
          localStorage.removeItem("refreshToken");
          localStorage.setItem("refreshToken", res.refreshToken);
          if (apiType == 1) {
            apiRefresh.get(opt);
          } else if (apiType == 2) {
            apiRefresh.post(opt, param);
          } else if (apiType == 3) {
            apiRefresh.put(opt, param);
          } else if (apiType == 4) {
            apiRefresh.delete(opt, param);
          }
          for (let i = 0; i < CallStack.length; i++) {
            if (CallStack[i].apiType == 1) {
              apiRefresh.get(CallStack[i].opt);
            } else if (CallStack[i].apiType == 2) {
              apiRefresh.post(CallStack[i].opt, CallStack[i].param);
            } else if (CallStack[i].apiType == 3) {
              apiRefresh.put(CallStack[i].opt, CallStack[i].param);
            } else if (CallStack[i].apiType == 4) {
              apiRefresh.delete(CallStack[i].opt, CallStack[i].param);
            }
          }
          RefreshToken = false;
          CallStack = [];
          window.location.reload();
        })
        .catch(async (err) => {
          err && localStorage.clear();
          //history.location.push("/sign-up");
          // window.location.reload();
        });
    } else {
      var data = {
        apiType: apiType,
        opt: opt,
        param: param,
      };
      CallStack.push(data);
    }
  } else if (
    err &&
    err.response &&
    err.response.status === 401 &&
    err.response.data &&
    (err.response.data.code == 3 || err.response.data.code == 0) &&
    SessionDeath
  ) {
    SessionDeath = false;
    //message.error("Your Session has expired please login again", 5, onClose);
  }
  // else if(err && err.response && err.response.status === 404)
  // {
  //   message.info('No data found', 2)
  // }
  else if (err && err.response && err.response.status === 500) {
    // message.error(
    //   "Oops! Something went wrong! Please contact our Support Team!",
    //   5
    // );
  }
};

const getToken = async () => {
  var token = localStorage.getItem(config.AuthStorageKey);
  if (token == null) {
    token = localStorage.getItem("token");
  }
  return JSON.parse(token);
};

const ExceptionalModel = async (err) => {
  if (err.response.status === 401) {
    await swal({
      icon: "error",
      title: "Time-out",
      text: "Re login or contact your administrator",
      confirmButtonText: "okay",
      button: true,
    });

    localStorage.clear();
    window.location.reload();
    throw "resolved";
  } else if (err.response.status === 500) {
    await swal({
      icon: "error",
      title: "An Internal Server Error occoured",
      button: "okay",
    });
    throw "resolved";
  } else if (err.response.status === 422) {
    await swal({
      icon: "error",
      title: "An Unexpected Error Occoured",
      button: "okay",
    });
    throw "resolved";
  } else if (err.response.status === 403) {
    await swal({
      icon: "error",
      title: "You are not allowed to access this resource",
      button: "okay",
    });

    window.location.href = "dashboard";

    throw "resolved";
  } else {
    throw err;
  }
};

const apiCallWithoutStore = {
  get: async (url) => {
    var token = await getToken();

    const URL = config.BaseUrl + url;

    return axios(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
      .then((response) => response)
      .catch(async (error) => {
        await ExceptionalModel(error);
      });
  },

  post: async (url, payload) => {
    var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
    if (token == null) {
      token = localStorage.getItem("token");
    }

    const URL = config.BaseUrl + url;

    const header = {
      Authorization: "Bearer " + token.accessToken,
      accept: "application/json",
      "Content-Type":
        payload instanceof FormData ? "multipart/formdata" : "application/json",
    };

    return axios(URL, {
      method: "POST",
      headers: header,
      data: payload,
    })
      .then((response) => response)
      .catch(async (error) => {
        await ExceptionalModel(error);
      });
  },

  put: async (url, payload) => {
    const URL = config.BaseUrl + url;

    var token = await getToken();

    const header = {
      Authorization: "Bearer " + token.accessToken,
      accept: "application/json",
      "Content-Type": "application/json",
    };

    return axios(URL, {
      method: "PUT",
      headers: header,
      data: payload,
    })
      .then((response) => response)
      .catch(async (error) => {
        await ExceptionalModel(error);
      });
    // .catch(async (error) => {
    //   if (error.response.status === 401) {
    //     if (await apiCallWithoutStore.resetToken())
    //       return await apiCallWithoutStore.put(url, payload);
    //   }
    //   return error.response;
    // });
  },

  delete: async (url) => {
    const URL = `${config.BaseUrl}${url}`;

    var token = await getToken();

    const header = {
      Authorization: "Bearer " + token.accessToken,
      accept: "application/json",
      "Content-Type": "application/json",
    };

    return axios(URL, {
      method: "DELETE",
      headers: header,
    })
      .then((response) => response)
      .catch(async (error) => {
        await ExceptionalModel(error);
      });
  },

  resetToken: async () => {
    return false;
  },
};

export { api, apiRefresh, apiCallWithoutStore, getToken };
