export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
};

export const storeObjectData = (key, obj) => {
  try {
    const jsonValue = JSON.stringify(obj);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return e;

    // error reading value
  }
};

export const getObjectData = (key) => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
export const logOut = (key) => {
  try {
    return localStorage.clear();
  } catch (e) {
    return e;

    // error reading value
  }
};
