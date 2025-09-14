import config from "../../../config.dev.json";
import { post } from "../../config/api-config/callMethods";

/**
 * To add single/multiple new user
 */
export function matrixUserLogout(token: any) {
    const url = config["matrix-convaychat-logout-url"];
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    return post(url, null, { headers: headers });
}