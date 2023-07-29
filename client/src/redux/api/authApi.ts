import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production"

const API = axios.create({baseURL:`${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API }`})


API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") || '{}').token}`
    }
    return req
})

export function sign_Up(data:any){
    return API.post('/auth/signup',data)
}

export function log_In(data:any){
    return API.post('/auth/login',data)
}

export function google_Sign(data:any){
    return API.post('/auth/google',data)
}

export function like_Tv(data:any){
    return API.post('/auth/likeTv',data)
}

export function get_Liked_Tv(){
    return API.get("/auth/getLikedTv")
}