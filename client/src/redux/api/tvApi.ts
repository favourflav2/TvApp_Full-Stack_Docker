import axios from "axios"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const API = axios.create({baseURL:"https://api.themoviedb.org/3"})

const config:object = {
    headers:{
        Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
    }
}



export function search_Tv(searchValue:string){
    return API.get(`/search/tv?query=${searchValue}&language=en-US`,config)
}



export const tvApi:any = createApi({
    reducerPath:"tvApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.themoviedb.org/3"}),
    endpoints: (builder) => ({
        tvTrending: builder.query({
            query: (page:number) => ({
                url: `/trending/tv/week?language=en-US&page=${page}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        topRatedTv: builder.query({
            query: (page:number) => ({
                url:`/tv/top_rated?language=en-US&page=${page}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        tvDetails: builder.query({
            query: (id:number | string) => ({
                url: `/tv/${id}?append_to_response=recommendations%2Cvideos&language=en-US`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        })
    })
})

export const { useTvTrendingQuery,useTopRatedTvQuery, useTvDetailsQuery } = tvApi