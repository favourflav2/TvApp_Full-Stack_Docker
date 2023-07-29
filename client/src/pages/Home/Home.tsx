import  React, { Suspense, lazy } from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import {
  searchTv,
  //setSearchedTv,
} from "../../redux/features/tvSlice";
import { Box, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import SearchCard from "../../components/cards/SearchCard";
//import Trending from "./trending/Trending";
//import TopRated from "./topRated/TopRated";
import { getLikedTv, setError } from "../../redux/features/authSlice";

const Trending = lazy(() => import("./trending/Trending"));
const TopRated = lazy(() => import("./topRated/TopRated"));

export default function Home() {
  const dispatch = Dispatch();
  const { searchedTv, error, searchLoading } = UseSelector(
    (state) => state.tv
  );
  const {user} = UseSelector(state => state.auth)
 
  

  //state for search box
  const refOne = React.useRef<any>(null);
  const [openBox, setOpenBox] = React.useState<boolean>(false);

  async function handleSearch(searchVal: string) {
    if (search) {
      dispatch(searchTv(searchVal));
      setOpenBox(true);
    }
  }

  const [search, setSearch] = React.useState<string>("");

  

  function handleClickOutside(e: any) {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenBox(false);
    }
  }

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  React.useEffect(()=>{
    
    if(user?.user?.user_id){
      dispatch(getLikedTv())
    }
  },[user,dispatch])

  React.useEffect(()=>{
    handleSearch(search);
    // eslint-disable-next-line
  },[search])

  React.useEffect(()=>{
    dispatch(setError())
    // eslint-disable-next-line
  },[])

  

  return (
    <Box className="mt-[70px] flex homebg w-full h-full min-h-[930px]">

      {/* Desktop Container */}
      <Box className=" sm:flex hidden  p-10 w-full h-full">

        {/* Content */}
        <Box className="  w-full h-full flex flex-col">
          {/* About */}
          <Typography className="flex justify-center font-bold my-4 text-[20px]">
            Welcome to TV land, where you can search and browse your favoriteTV
            shows and epiosdes
          </Typography>

          {/* Search Input */}
          <Box className="flex  items-center mt-5 mb-1">
            <input
              type="text"
              className=" indent-2 h-[40px] w-full mt-5  rounded-xl mr-1 mb-2"
              name="search"
              value={search}
              placeholder="Enter Keywords"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              ref={refOne}
            />

            <IconButton className="mt-5 mb-2">
              <SearchIcon className="text-3xl" />
            </IconButton>
          </Box>

         
          {openBox ? (
            !searchLoading ? (
              searchedTv?.length === 0 ? (
                <div
                  className="bg-white rounded-md flex flex-col p-2 sm:w-[91%] md:w-[93%] lg:w-[95.5%] xl:w-[96%]"
                  ref={refOne}
                >
                  <span>No results</span>
                </div>
              ) : (
                <div
                  className="bg-white rounded-md flex flex-col p-2 sm:w-[91%] md:w-[93%] lg:w-[95.5%] xl:w-[96%]"
                  ref={refOne}
                >
                  {searchedTv?.map((item: any, index: any) => (
                    <SearchCard
                      key={index}
                      item={item}
                      setOpenBox={setOpenBox}
                      setSearch={setSearch}
                    />
                  ))}
                </div>
              )
            ) : (
              <>loading..</>
            )
          ) : (
            <></>
          )}

          {/* Trending */}
          <Suspense fallback={<div className=" w-full flex items-center justify-center"><div>Loading...</div></div>}>
            <Trending />
          </Suspense>

          {/* Top Rated */}
          <Suspense fallback={<div className=" w-full flex items-center justify-center"><div>Loading...</div></div>}>
            <TopRated />
          </Suspense>
        </Box>

      </Box>

      {/* Mobile Container */}
      <Box className="sm:hidden flex  w-full min-h-[930px] flex-col">

        {/* Title */}
        <Typography className="text-[30px] flex justify-center my-8"> WELCOME TO TV LAND</Typography>

        {/* Search Input */}
        <Box className="flex  items-center w-full mt-3 p-2">
            <input
              type="text"
              className=" indent-2 h-[40px] w-full   rounded-xl mr-1 "
              name="search"
              value={search}
              placeholder="Enter Keywords"
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              ref={refOne}
            />

            
              <SearchIcon className="text-3xl" />
           
          </Box>

          {openBox ? (
            !searchLoading ? (
              searchedTv?.length === 0 ? (
                <div
                  className="bg-white rounded-md flex flex-col p-2  "
                  ref={refOne}
                >
                  <span>No results</span>
                </div>
              ) : (
                <div
                  className="bg-white rounded-md flex flex-col p-2   w-[88%] ml-2"
                  ref={refOne}
                >
                  {searchedTv?.map((item: any, index: any) => (
                    <SearchCard
                      key={index}
                      item={item}
                      setOpenBox={setOpenBox}
                      setSearch={setSearch}
                    />
                  ))}
                </div>
              )
            ) : (
              <>loading..</>
            )
          ) : (
            <></>
          )}

          {/* Trending */}
          <Trending />

          {/* Top Rated */}
          <TopRated />
      </Box>
    </Box>
  );
}
