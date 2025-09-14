import Cookies from "js-cookie";
import useJwtToken from "../../config/auth/useJwtToken";
import { fetchUserFeature } from "../api-services/fetchUserFeatureApi";
import { setMatrixChatVisibility } from "../../redux/slices/showMatrixChatSlice";
import { USER_FEATURES } from "./constants";

export async function checkFeatureForUser(featureToCheck: string): Promise<boolean | undefined> {
    const authUser = useJwtToken();
    const userId = authUser?.user["ID"] as string;
    const userFeatures = (await fetchUserFeature(userId))?.data;
    if (!userFeatures.length) {
        return
    }
    switch (featureToCheck) {
        case USER_FEATURES.CHAT:
            if (userFeatures.some((feat: string) => feat.toLowerCase() === USER_FEATURES.CHAT)) {
                return true
            }
            break;
        case USER_FEATURES.TRANSCRIPTION:
            if (userFeatures.some((feat: string) => feat.toLowerCase() === USER_FEATURES.TRANSCRIPTION)) {
                return true
            }
            break;
        case USER_FEATURES.DESKTOP_APP:
            if (userFeatures.some((feat: string) => feat.toLowerCase() === USER_FEATURES.DESKTOP_APP)) {
                return true
            }
            break;
        default:
            return false
    }

}