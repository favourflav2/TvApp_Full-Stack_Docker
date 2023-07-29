import * as React from 'react';
import { Box, Typography, useMediaQuery,Skeleton } from "@mui/material";
import { Link } from 'react-router-dom';
import ShowCards from '../../../components/cards/ShowCards';

import { useTopRatedTvQuery } from '../../../redux/api/tvApi';

export interface ITopRatedProps {
}

export default function TopRated (props: ITopRatedProps) {
    const {data, isFetching, error} = useTopRatedTvQuery(1)

    React.useEffect(()=>{
      if(error){
        alert(error)
      }
     },[error])

    const isNonMobile = useMediaQuery("(min-width:640px)");
  return (
    <Box className="flex flex-col mt-[100px]">
      {/* Title */}
      <Box className="flex justify-between items-center p-5 sm:px-4">
        <Typography className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600 font-bold text-xl">
          Top Rated
        </Typography>
        <Typography className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-600 ">
          <Link to={`/viewAll/topRated`}>View All</Link>
        </Typography>
      </Box>

      {/* Mapped Data */}
      {isFetching? 
      (
<Box className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:gap-4 grid-cols-1 p-10 gap-y-10">
          {Array.from(new Array(20)).map((item: any, index: any) => (
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ bgcolor: "grey.500" }}
              key={index}
            />
          ))}
        </Box>
      ) 
      : 
      (
        isNonMobile ? (
            <Box className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:gap-4 grid-cols-1 p-10 gap-y-10">
              {data?.results?.map((item: any, index: any) => (
                <ShowCards item={item} key={index}/>
              ))}
            </Box>
          ) : (
            <Box className="grid  grid-cols-1 p-10 gap-y-10">
              {data?.results?.slice(0, 10).map((item: any, index: any) => (
                <ShowCards item={item} key={index}/>
              ))}
            </Box>
          )
      )
      }
      
    </Box>
  );
}
