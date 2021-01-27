const APIlocal = "http://localhost:5000/api/";
const API = "https://greendegrees.azurewebsites.net/api/";

export function getUrl(): string {
    if(process.env.NODE_ENV === "production" ) {
        return API;
    }else {
        return APIlocal;
    }
}