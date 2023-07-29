import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { likeTv } from "../../redux/features/authSlice";

import { Link } from "react-router-dom";

export interface IAppProps {
  item: {
    [key: string]: any;
    name: string;
    imgpath: string;
    show_id: number;
  };
}

export default function SavedTvCard({ item }: IAppProps) {
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { user, likedTv } = UseSelector((state) => state.auth);
  const tvFind = likedTv?.find((val) => val.show_id === item.show_id);
  return (
    <Box className="flex flex-col mt-3 p-2">
      <Box className="group relative w-full">
        {/* image */}
        <img
          src={
            item?.imgpath
              ? `https://image.tmdb.org/t/p/w500/${item?.imgpath}`
              : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
          }
          alt="Movie Pic"
          className=""
          onClick={() => {
            navigate(`/movieDetails/${item.show_id}`);
          }}
        />

        {/* image overlay*/}
        <Box className="absolute hidden top-0 left-0 w-full sm:flex flex-col h-full opacity-0 group-hover:opacity-100 duration-500 group-hover:bg-black/90 items-center p-2 text-gray-300">
          {/* Title */}
          <Typography className="xl:mt-5 transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-109  duration-200 hover:underline cursor-pointer hover:text-blue-600">
            <Link to={`/movieDetails/${item.show_id}`}>{item.name}</Link>
          </Typography>

          {/* Overview */}
          {/* {item.overview.length > 150 ? 
            (
                <Typography className=" text-sm lg:text-[14px] xl:text-[17px] xl:mt-5">{item.overview.slice(0,120)}<span className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600" onClick={()=>{
                    navigate(`/movieDetails/${item.id}`)
                }}>...Read More</span></Typography>
            )
            :
            (
                <Typography className="text-sm lg:text-[14px] xl:text-[17px] xl:mt-5">{item.overview}</Typography>
            )
            } */}
        </Box>
      </Box>

      {/* Text Under Image */}
      <Box className="flex flex-col p-1 h-full">
        {/* Title */}
        <Typography className="text-[14px]  min-h-[50px] flex justify-center items-center font-bold transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600">
          <Link to={`/movieDetails/${item.show_id}`}>{item.name}</Link>
        </Typography>

        {user?.user?.user_id ? (
          tvFind?.show_id === item.show_id ? (
            <Button
              className="flex items-center bg-red-500 text-black rounded-xl p-2 w-auto justify-center my-2 hover:bg-red-600 group"
              onClick={() => {
                dispatch(
                  likeTv({
                    name: item.name,
                    showId: item.show_id,
                    imgPath: item.imgpath,
                  })
                );
              }}
            >
              <span className="mr-2 group-hover:text-white">-</span>
              <span className=" group-hover:text-white">Remove from saved</span>
            </Button>
          ) : (
            <Button
              className="mt-1"
              onClick={() => {
                dispatch(
                  likeTv({
                    name: item.name,
                    showId: item.show_id,
                    imgPath: item.imgpath,
                  })
                );
              }}
            >
              <span className="mr-2 group-hover:text-white">+</span>
              <span className=" group-hover:text-white">Save Tv Show</span>
            </Button>
          )
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

//className="flex items-center bg-red-500 text-black rounded-xl p-2 w-[210px] justify-center my-5 hover:bg-red-600 group"
