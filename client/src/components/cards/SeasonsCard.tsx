import { Box, Typography } from "@mui/material";
import * as React from "react";


export interface ISeasonCardProps {
    item: {
        [key: string]: any;
        name: string;
        air_date: string;
        poster_path: string;
        overview: string;
        season_number: number;
        id:number;
        episode_count:number

      };
}

export default function SeasonCard ({item}: ISeasonCardProps) {

    //const navigate = useNavigate()

  
  return (
    <Box className="flex flex-col mt-3 p-2 " >

      
      <Box className="group relative w-full">
        {/* image */}
        <img
          src={item?.poster_path ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`:"https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswerscdn.microsoft.com%2Fstatic%2Fimages%2Fimage-not-found.jpg"} alt="Movie Pic"
          className=""
          
        />

        {/* image overlay*/}
        <Box className="absolute hidden top-0 left-0 w-full sm:flex flex-col h-full opacity-0 group-hover:opacity-100 duration-500 group-hover:bg-black/90 items-center p-2 text-gray-300">

            {/* Title */}
            <Typography className="xl:mt-5  my-2 mb-3">{item.name}</Typography>


            {/* Overview */}
            {item.overview.length > 150 ? 
            (
                <Typography className=" text-sm lg:text-[14px] xl:text-[17px] xl:mt-5">{item.overview.slice(0,120)}<span className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600">...Read More</span></Typography>
            )
            :
            (
                <Typography className="text-sm lg:text-[14px] xl:text-[17px] xl:mt-5">{item.overview}</Typography>
            )
            }
        </Box>
      </Box>

      {/* Text Under Image */}
      <Box className="flex flex-col p-1">

            {/* Title */}
            <Typography className="text-[14px] mt-2 flex justify-center font-bold ">{item.name}</Typography>

            {/* Other */}
            <Box className="grid grid-cols-2 gap-2 mt-2">

                    {/* Season Number */}
                {item?.season_number? (<Typography className="text-[12px]"><span>Season:</span> {item?.season_number}</Typography>):(<Typography className="text-[12px]"><span >Season:</span> N/A</Typography>)}

                    {/* eposide count */}
                {item?.episode_count? (<Typography className="text-[12px]"><span className="font-semi-bold">Episodes:</span> {item?.episode_count}</Typography>):(<Typography className="text-[12px]"><span >Episodes:</span> N/A</Typography>)}

                {item.air_date? <Typography className="text-[12px]"> Air Date: <span className="font-semibold">{item?.air_date.slice(0,4)}</span></Typography> : <span className="text-[12px]"> Air Date: N/A</span>}

                
            </Box>
      </Box>

    </Box>
  );
}
