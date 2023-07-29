import { Box, Skeleton, Typography } from "@mui/material";
import * as React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimilarShowCards from "../cards/SimilarShowCards";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { UseSelector } from "../../redux/store";

export interface ISliderProps {
  item: Array<any>;
}

export default function Similar({ item }: ISliderProps) {
  

  const { loading } = UseSelector((state) => state.tv);

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={className}
        onClick={onClick}
        style={{ ...style, color: "black" }}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIosIcon
        className={className}
        onClick={onClick}
        style={{ ...style, color: "black" }}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  //recommendations
  return (
    <Box className="w-full h-auto flex flex-col mt-[100px] p-5">
      {/* Title */}
      <Box className="flex items-center">
        <BoltIcon className="text-red mr-1" />
        <Typography>YOU MIGHT ALSO LIKE</Typography>
      </Box>

      {/* Slider */}
      <Box className="w-full h-full relative flex justify-center">
        {loading ? (
          <Slider {...settings} className="w-[95%] mb-5 ">
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
          <Slider {...settings} className="w-[95%] mb-5 ">
            {item?.map((val: any, index: any) => (
              <SimilarShowCards item={val} key={index} />
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}
