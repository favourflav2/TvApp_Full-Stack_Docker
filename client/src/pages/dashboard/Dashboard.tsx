import { Box, Typography, Skeleton, CircularProgress } from "@mui/material";
import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { getLikedTv } from "../../redux/features/authSlice";
import SavedTvCard from "../../components/cards/savedTvCard";
import { Link, useNavigate } from "react-router-dom";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const dispatch = Dispatch();
  const { user, loading, likedTv } = UseSelector((state) => state.auth);
  const userData = user?.user;
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getLikedTv());
  }, [dispatch]);

  React.useEffect(() => {
    if (!user?.user?.user_id) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  //console.log(likedTv);
  return (
    <Box className="mt-[70px] flex flex-col w-full sm:min-h-[930px] min-h-[773px] bg-gray-200">
      {/* Content */}

      {loading ? (
        <Box className="flex flex-col w-full h-full items-center justify-center p-8 mt-[40px]">
          <CircularProgress />
        </Box>
      ) : likedTv?.length > 0 ? (
        <Box className=" flex flex-col w-full h-full p-8 ">
          {/* Title */}
          <Typography className="flex justify-center sm:text-[40px] text-[20px] mb-3 sm:mb-0">
            Welcome &nbsp;<span>{userData?.username}</span>
          </Typography>
          <Typography className="flex justify-center mt-1">
            Here you will be able to view all your saved tv shows, have a look
            around.
          </Typography>

          {/* Mapped Data */}
          {loading ? (
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
              {likedTv?.map((item: any, index: any) => (
                <SavedTvCard item={item} key={index} />
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box className="w-full h-full flex flex-col sm:p-8 p-4">
          {/* Title */}
          <Typography className="flex justify-center text-[40px] items-center my-2">
            Welcome {userData?.username}
          </Typography>
          <Typography className="flex justify-center mt-1">
            Here you will be able to view all your saved tv shows, have a look
            around.
          </Typography>

          {!loading ? (
            <Typography className="flex justify-center mt-[30px] sm:text-[20px] font-bold text-red-500">
              Sorry, currently you dont have any tv shows saved. Please visit
              the home page &nbsp;
              <span className="text-blue-500 font-medium hover:underline cursor-pointer hover:text-blue-700">
                <Link to="/">Click here</Link>
              </span>
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  );
}

// {likedTv && likedTv?.length > 0 ? (
//     <Box className=" flex flex-col w-full h-full p-8 ">
//       {/* Title */}
//       <Typography className="flex justify-center text-[40px]">
//         Welcome &nbsp;<span>{userData?.username}</span>
//       </Typography>
//       <Typography className="flex justify-center mt-1">
//         Here you will be able to view all your saved tv shows, have a look
//         around.
//       </Typography>

//       {/* Mapped Data */}
//       {loading ? (
//         <Box className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:gap-4 grid-cols-1 p-10 gap-y-10">
//           {Array.from(new Array(20)).map((item: any, index: any) => (
//             <Skeleton
//               variant="rectangular"
//               height={300}
//               sx={{ bgcolor: "grey.500" }}
//               key={index}
//             />
//           ))}
//         </Box>
//       ) : (
//         <Box className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:gap-4 grid-cols-1 p-10 gap-y-10">
//           {likedTv?.map((item: any, index: any) => (
//             <SavedTvCard item={item} key={index} />
//           ))}
//         </Box>
//       )}
//     </Box>
//   ) : (
//     <Box className="w-full h-full flex flex-col p-8">
//       {/* Title */}
//       <Typography className="flex justify-center text-[40px]">
//         Welcome &nbsp;<span>{userData?.username}</span>
//       </Typography>
//       <Typography className="flex justify-center mt-1">
//         Here you will be able to view all your saved tv shows, have a look
//         around.
//       </Typography>

//       <Typography className="flex justify-center mt-[30px] text-[20px] font-bold text-red-600">Sorry, currently you dont have any tv shows saved. Please visit the home page &nbsp;<span className="text-blue-500 font-medium hover:underline cursor-pointer hover:text-blue-700"><Link to="/">Click here</Link></span></Typography>
//     </Box>
//   )}
