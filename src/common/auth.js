import config from "src/config";
import { getObjectData } from "src/service/storage";

const isLoggedIn = getObjectData(config.AuthStorageKey);

export default isLoggedIn;
