import axios from "axios"
//import qs from "qs"

var req = axios.create({
    baseURL:"http://192.168.2.145:3000",
    timeout:10000
})

export function seller(){
    return req.get("/api/seller")
}

export function goods(){
    return req.get("/api/goods")
}

export function ratings(){
    return req.get("/api/ratings")
}