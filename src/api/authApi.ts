import { APIStatus } from "../types";
import axios from "axios";

interface Credentials {
    username: string;
    password: string;
}

const BASE_URL = "https://ws3-bed.onrender.com";


export const AuthApi = {
    login: async ({ username, password }: Credentials): Promise<APIStatus> => {
        try {
            await axios.post(`${BASE_URL}/api/login`, { username, password }, { withCredentials: true });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    signUp: async ({ username, password }: Credentials): Promise<APIStatus> => {
        try {
            await axios.post(`${BASE_URL}/api/signup`, { username, password });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    logout: async (): Promise<APIStatus> => {
        try {
            await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
            return APIStatus.Success;
        } catch (e) {
            return handleError(e);
        }
    },
    getUserName: async (): Promise<string | APIStatus> => {
        try {
            const res = await axios.get(`${BASE_URL}/api/username`, { withCredentials: true });
            console.log(res.data);
            return res.data.username;
        } catch (e) {
            return handleError(e);
        }
    },
};

const handleError = async (e: any): Promise<APIStatus> => {
    if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        console.log(e.response);
        if (status == 400) {
            return APIStatus.BadRequest;
        }
        if (status == 401) {
            return APIStatus.Unauthorized;
        }
        return APIStatus.ServerError;
    }
    return APIStatus.ServerError;
};