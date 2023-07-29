import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Box, IconButton, Typography, Skeleton, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Similar from "../slider/Similar";
import Seasons from "../slider/Seasons";
import {  toast } from 'react-toastify';

import { getLikedTv, likeTv } from "../../redux/features/authSlice";
import { useTvDetailsQuery } from "../../redux/api/tvApi";


export interface IMovieDetailsProps {}

export default function MovieDetails(props: IMovieDetailsProps) {
  const { id } = useParams();
  const dispatch = Dispatch()
  const {data,isFetching:loading,error} = useTvDetailsQuery(id)
  const { user, likedTv } = UseSelector((state) => state.auth);
  const tvFind = likedTv?.find((val) => val.show_id === data?.id);
  



  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  React.useEffect(()=>{
    if(user?.user?.user_id){
      dispatch(getLikedTv())
    }
  },[])// eslint-disable-line
 
  React.useEffect(()=>{
    if(error){
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  },[error])


  const firstTrailer = data?.videos?.results[0];
  

  
  

  
  return (
    <Box className="flex flex-col h-full w-full bg-black/20 mt-[70px]">
      {/* Image */}
      {loading ? (
        <Skeleton variant="rectangular" height={500} />
      ) : (
        <img
          src={
            data?.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
              : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
          }
          alt=""
          className="  w-[100%] md:max-h-[900px] h-auto bg-fixed cursor-pointer brightness-50 hue-rotate-15 details"
        />
      )}

      {/* Content */}
      <Box className="grid sm:grid-cols-[30%_1fr] grid-cols-1 mt-10 p-5 ">
        {/* Left Side */}
        <Box className="flex flex-col w-full h-full items-center">
          {/* image */}
          {loading ? (
            <Skeleton variant="rectangular" height={500} />
          ) : (
            <img
              src={
                data?.poster_path
                  ? `https://image.tmdb.org/t/p/w780/${data?.poster_path}`
                  : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
              }
              alt=""
              className=""
            />
          )}
        </Box>

        {/* Right Side */}
        <Box className="flex flex-col w-full h-full p-10">
          {/* Title */}
          {loading ? (
            <Skeleton variant="rectangular" height={50} />
          ) : (
            <Typography className="md:text-[25px] lg:text-[30px] text-[20px] flex justify-center mb-2 sm:mb-0 sm:block underline">
              {data?.name}
            </Typography>
          )}



          {/* Star */}
          {loading ? 
          (
            <Skeleton variant="rectangular" height={50}/>
          )
          :
          (
            user?.user?.user_id ? (
              tvFind?.show_id === data?.id ? (
                <Button className="flex items-center bg-red-500 text-black rounded-xl p-2 w-[210px] justify-center my-5 hover:bg-red-600 group" onClick={() => {
                  dispatch(
                    likeTv({
                      name: data?.name,
                      showId: data?.id,
                      imgPath: data?.poster_path,
                    })
                  )
  
                  
                }}>
              <span className="mr-2 group-hover:text-white">-</span>
              <span className=" group-hover:text-white">Remove from saved</span>
          </Button>
              ) : (
                <Button className="flex items-center bg-green-400 text-black rounded-xl p-2 w-[200px] justify-center mb-3 mt-8 hover:bg-green-600 group" onClick={() => {
                  dispatch(
                    likeTv({
                      name: data?.name,
                      showId: data?.id,
                      imgPath: data?.poster_path,
                    })
                  )
  
                  
                }}>
              <span className="mr-2 group-hover:text-white">+</span>
              <span className=" group-hover:text-white">Save Tv Show</span>
          </Button>
              )
            ) : (
              <></>
            )
          )
          }
          


          {/* Trailer And Rating */}
          {loading ? (
            <Skeleton variant="rectangular" height={100} className="mt-2" />
          ) : (
            <Box className="flex items-center  my-2 ">
              {/* Trailer Box */}
              {firstTrailer?.key && (
                <Link
                  to={`https://www.youtube.com/watch?v=${firstTrailer?.key}`}
                  target="_blank"
                >
                  <div className="  flex items-center group">
                    <IconButton className="">
                      <YouTubeIcon className="text-red-500  text-[80px]" />
                    </IconButton>

                    <h2 className="group-hover:underline cursor-pointer transition ease-in-out delay-150   duration-200  group-hover:text-blue-800 mr-8 text-[20px]">
                      Trailer
                    </h2>
                  </div>
                </Link>
              )}

              {/* Imdb rating */}
              {data?.vote_average ? (
                <Typography className="text-[20px]">
                  <span className="font-bold text-yellow-700">IMDB:</span>
                  {data?.vote_average.toFixed(1)}
                </Typography>
              ) : (
                <Typography className="text-[20px]">
                  <span className="font-bold text-yellow-700">IMDB:</span>
                  N/A
                </Typography>
              )}
            </Box>
          )}

          {/* Overview */}
          {loading ? (
            <Skeleton variant="rectangular" height={300} className="mt-2" />
          ) : (
            <Typography className="my-4 md:text-[20px]">
              {data?.overview}
            </Typography>
          )}

          {/* About */}
          {loading ? (
            <Skeleton variant="rectangular" height={100} className="mt-2" />
          ) : (
            <Box className="grid sm:grid-cols-2 grid-cols-1 mt-8">
              {/* Released */}
              {data?.first_air_date ? (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Released:</span>{" "}
                  {data?.first_air_date}
                </Typography>
              ) : (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Released:</span> N/A
                </Typography>
              )}

              {/* Genre */}
              {data?.genres?.length ? (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Genre:</span>
                  {data?.genres?.map((item: any, index: any) =>
                    //index === item[data?.genres?.length - 1]  && <span>favour</span>
                    // console.log(index === data?.genres?.length - 1)
                    index === data?.genres?.length - 1 ? (
                      <span key={index}>{item.name}</span>
                    ) : (
                      <span key={index}> {item.name}, </span>
                    )
                  )}
                </Typography>
              ) : (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Genre:</span>
                  N/A
                </Typography>
              )}

              {/* duration */}
              {data?.episode_run_time ? (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Duration:</span>
                  {data?.episode_run_time?.map((item: any, index: any) =>
                    index === data?.episode_run_time?.length - 1 ? (
                      <span key={index}> {item} min</span>
                    ) : (
                      <span key={index}> {item} min, </span>
                    )
                  )}
                </Typography>
              ) : (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Duration:</span>
                  N/A
                </Typography>
              )}

              {/* Production Companies */}
              {data?.production_companies ? (
                <Typography className="sm:my-2 my-3 md:text-[18px]">
                  <span className=" font-medium">Production Companies</span>
                  {data?.production_companies?.map(
                    (item: any, index: any) =>
                      //index === item[data?.genres?.length - 1]  && <span>favour</span>
                      // console.log(index === data?.genres?.length - 1)
                      index ===
                      data?.production_companies?.length - 1 ? (
                        <span key={index}>{item.name}</span>
                      ) : (
                        <span key={index}> {item.name}, </span>
                      )
                  )}
                </Typography>
              ) : (
                <Typography className="sm:my-1 my-3 md:text-[18px]">
                  <span className=" font-medium">Production Companies</span>
                  N/A
                </Typography>
              )}
            </Box>
          )}



        </Box>
      </Box>

      {/* Seasons / Epsiodes /etc */}
      <Similar item={data?.recommendations?.results} />

      <Seasons item={data?.seasons}/>
    </Box>
  );
}
