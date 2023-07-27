import axios, { AxiosResponse } from "axios";
import { activity } from "../models/activity";


axios.defaults.baseURL = "http://localhost:5000/api";

// it is used to get the respone data from the server
function sleep(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const responseBody = <T>(respone: AxiosResponse<T>) => respone.data;

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Actitivities =
{
    list: () => requests.get<activity[]>('/activities'),
    details: (id: string) => requests.get<activity>(`/activities/${id}`),
    create: (activity: activity) => requests.post<void>(`/activities`, activity),
    update: (activity: activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}
// creating object agent by passing activities as a object 
const agent =
{
    Actitivities
}

export default agent;