import { Box, Skeleton, Typography } from "@mui/material";
import * as React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UseSelector } from "../../redux/store";
import SeasonCard from "../cards/SeasonsCard";

export interface ISeasonCardProps {
  item: Array<any>;
}

export default function Seasons({ item }: ISeasonCardProps) {
  const { loading } = UseSelector((state) => state.tv);

  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Box className="w-full h-auto flex flex-col mt-[100px] p-5">
      {/* Title */}
      <Box className="flex items-center">
        <BoltIcon className="text-red mr-1" />
        <Typography>SEASONS</Typography>
      </Box>

      {/* Slider */}
      <Box className="w-full h-full  flex p-5">
        {loading ? (
          <Slider {...settings} className="w-[95%x] mb-5 ">
            {Array.from(new Array(20)).map((val: any, index: any) => (
              <Box className=" p-2" key={index}>
                <Skeleton
                  sx={{ bgcolor: "grey.500" }}
                  className=""
                  height={400}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          // {item?.map((val:any,index:any)=>(
          //     <SeasonCard item={val} key={index} />
          // ))}

          <Box className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {item?.map((val: any, index: any) => (
              <SeasonCard item={val} key={index} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
