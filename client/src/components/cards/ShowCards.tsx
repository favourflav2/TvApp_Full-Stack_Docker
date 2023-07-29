import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Dispatch, UseSelector } from "../../redux/store";
import { likeTv } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

export interface IShowCardsProps {
  item: {
    [key: string]: any;
    name: string;
    first_air_date: string;
    vote_average: number;
    poster_path: string;
    overview: string;
    media_type: string;
    id: number;
    origin_country: Array<string>;
  };
}


  function ShowCards({ item }: IShowCardsProps)  {
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { user, likedTv } = UseSelector((state) => state.auth);
  const tvFind = likedTv?.find((val) => val.show_id === item.id);
  

  //console.log(user?.user?.google_id)
  const isNonMobile = useMediaQuery("(min-width:640px)");

  
  return (
    <Box
      className="flex flex-col mt-3 "
      onClick={() => {
        !isNonMobile && navigate(`/movieDetails/${item.id}`);
      }}
    >
      <Box className="group relative w-full">
        {/* image */}
        <img
          src={
            item?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
              : "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"
          }
          alt="Movie Pic"
          className="xl:h-[362px] lg:h-[345px] 2xl:h-[420px] md:min-h-[331px] w-full"
        />

        {/* image overlay*/}
        <Box className="absolute top-0 left-0 w-full h-full sm:flex hidden flex-col  opacity-0 group-hover:opacity-100 duration-500 group-hover:bg-black/90 items-center p-2 text-gray-300">
          {/* Title */}
          <Typography className="mt-5 transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-109  duration-200 hover:underline cursor-pointer hover:text-blue-600">
            <Link to={`/movieDetails/${item.id}`}>{item.name}</Link>
          </Typography>

          {user?.user?.user_id ? (
            tvFind?.show_id === item.id ? (
              <IconButton
                className="mt-1"
                onClick={() => {
                  dispatch(
                    likeTv({
                      name: item.name,
                      showId: item.id,
                      imgPath: item.poster_path,
                    })
                  )

                  toast.error('Deleted from your saved', {
                    theme: "dark",
                    });
                }}
              >
                <StarIcon className=" text-[30px] text-yellow-400" />
              </IconButton>
            ) : (
              <IconButton
                className="mt-1"
                onClick={() => {
                  dispatch(
                    likeTv({
                      name: item.name,
                      showId: item.id,
                      imgPath: item.poster_path,
                      
                    })
                  )

                  toast.success('Saved Tv', {
                    theme: "colored",
                    });
                }}
              >
                <StarBorderIcon className=" text-[30px] text-yellow-400" />
              </IconButton>
            )
          ) : (
            <></>
          )}

          {/* Overview */}
          {item.overview.length > 150 ? (
            <Typography className=" lg:text-[14px] xl:text-base mt-5">
              {item.overview.slice(0, 150)}
              <span className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600">
                <Link to={`/movieDetails/${item.id}`}>...Read More</Link>
              </span>
            </Typography>
          ) : (
            <Typography className="mt-5">{item.overview}</Typography>
          )}
        </Box>
      </Box>

      {/* Text Under Image */}
      <Box className="flex flex-col p-1">
        {/* Title */}
        <Typography className="text-[14px] mt-2 flex justify-center font-bold transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600">
          <Link to={`/movieDetails/${item.id}`}>{item.name}</Link>
        </Typography>

        {/* Other */}
        <Box className="flex justify-between items-center mt-2">
          {item.first_air_date ? (
            <Typography className="text-[12px]">
              First Air Date:{" "}
              <span className="font-semibold">
                {item.first_air_date.slice(0, 4)}
              </span>
            </Typography>
          ) : (
            <span className="text-[12px]">First Air Date: N/A</span>
          )}

          {/* Country */}
          <Box className="flex items-center border border-black">
            {item.origin_country ? (
              item.origin_country.map((item: any, index: any) => (
                <div key={index}>
                  <span className="text-[12px] mx-[2px]">{item}</span>
                </div>
              ))
            ) : (
              <span className="text-[12px]">N/A</span>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


export default React.memo(ShowCards)
