import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Pagination,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

import ShowCards from "../cards/ShowCards";
import { useTopRatedTvQuery, useTvTrendingQuery } from "../../redux/api/tvApi";

export interface IViewAllProps {}

export default function ViewAll() {
  const [page, setPageNum] = React.useState<number>(1);
  const { pageName } = useParams();
  
  const {data:trending,isFetching:trendingLoading,error:trendingError} = useTvTrendingQuery(page)
  const {data:topRated, isFetching:topRatedLoading,error:topRatedError} = useTopRatedTvQuery(page)
  

  function handlePageNumChange(
    event: React.ChangeEvent<unknown>,
    value: number
  ) {
    setPageNum(value);
  }


  // Scroll to top
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  React.useEffect(()=>{
    if(trendingError){
      toast.error(trendingError)
    }

    if(topRatedError){
      toast.error(topRatedError)
    }
  },[trendingError,topRatedError])

  const boxSX = {
    button: {
      "&:hover": {
        color: "black",
        backgroundColor: "lightblue",
      },
    },
  };
  const isNonMobile = useMediaQuery("(min-width:640px)");

  return (
    <Box className="mt-[100px] flex pt-10 flex-col">
      {/* Title */}
      <Box className="flex flex-col items-center mb-10">
        {/* trending */}
        {pageName === "trending" && (
          <Typography className="text-[34px]">Trending</Typography>
        )}

        {/* top rated */}
        {pageName === "topRated" && (
          <Typography className="text-[34px]">Top Rated</Typography>
        )}
      </Box>

      {/* Pagination */}
      <Box className="flex flex-col mt-5  justify-center items-center">
        <Typography className="flex mb-2">Page: {page}</Typography>

        {isNonMobile ? (
          <Pagination
            count={trending?.total_pages}
            page={page}
            onChange={handlePageNumChange}
            color="primary"
            sx={boxSX}
            size="large"
          />
        ) : (
          <Pagination
            count={trending?.total_pages}
            page={page}
            onChange={handlePageNumChange}
            sx={boxSX}
            color="primary"
          />
        )}
      </Box>

      {/* Mapped Data */}
      {topRatedLoading || trendingLoading ? (
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
      ) : (
        <Box className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:gap-4 grid-cols-1 p-10 gap-y-10">
          {/* trending */}
          {pageName === "trending" &&
            trending?.results?.map((item: any, index: any) => (
              <ShowCards item={item} key={index} />
            ))}

          {pageName === "topRated" &&
            topRated?.results?.map((item: any, index: any) => (
              <ShowCards item={item} key={index} />
            ))}
        </Box>
      )}

      {/* Pagination */}
      <Box className="flex flex-col sm:p-5 p-1 mb-2 mt-5 justify-center items-center">
        <Typography className="flex mb-4">Page: {page}</Typography>

        {isNonMobile ? (
          <Pagination
            count={trending?.total_pages}
            page={page}
            onChange={handlePageNumChange}
            color="primary"
            sx={boxSX}
            size="large"
          />
        ) : (
          <Pagination
            count={trending?.total_pages}
            page={page}
            onChange={handlePageNumChange}
            sx={boxSX}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
}
//sx={{button:{color: 'black'}}}
