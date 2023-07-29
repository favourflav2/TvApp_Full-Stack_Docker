import * as React from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Person2Icon from "@mui/icons-material/Person2";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, Typography, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import { setLogout } from "../../redux/features/authSlice";
import jwt_decode from "jwt-decode";

export interface INavBarProps {}

export default function NavBar() {
  const { user } = UseSelector((state) => state.auth);
  const loggedUser = user?.user?.user_id;
  const dispatch = Dispatch();
  const navigate = useNavigate();
  //console.log(user?.user?.user_id)

  if (user?.token) {
    const decoded: any = jwt_decode(user?.token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      console.log("jwt expired");
      dispatch(setLogout());
    }
  }

  // left side mobile menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //right side login/signup
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      {/* Desktop */}
      <Box
        className="sm:flex hidden w-full h-[70px] navbarbg fixed top-0 left-0 right-0 z-10 bg-white/80
    backdrop-blur-md"
      >
        {/* Content */}

        <Box className=" w-full mx-5 flex justify-between  items-center ">
          {/* Left Side */}
          <IconButton>
            <LiveTvIcon className=" text-black text-4xl" />
          </IconButton>

          {/* middle */}
          <Box className="flex items-center">
            <Typography className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-gray-300">
              <Link to="/">Home</Link>
            </Typography>
          </Box>

          {/* right side */}
          <Box className="">
            {loggedUser ? (
              <Box className="flex transition ease-in-out delay-150 cursor-pointer hover:-translate-y-[1px] hover:scale-110  duration-200 hover:text-gray-300">
                <IconButton onClick={handleClick2}>
                  <Person2Icon />
                </IconButton>
              </Box>
            ) : (
              <Box
                className="flex transition ease-in-out delay-150 cursor-pointer hover:-translate-y-[1px] hover:scale-110  duration-200 hover:text-gray-300"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Person2Icon />

                <span className="ml-1">Login</span>
              </Box>
            )}

            <Menu anchorEl={anchorEl2} open={open2} onClose={handleClose2} className="sm:block hidden">
              <MenuItem onClick={()=>{
                navigate("/dashboard")
                handleClose2()
              }}>My Saved Shows</MenuItem>
              <MenuItem onClick={()=>{
                handleClose2()
                dispatch(setLogout())
              }}>Logout</MenuItem>
              {!loggedUser && (
                <MenuItem onClick={()=>{
                  handleClose2()
                  navigate("/signup")
                }}>Sign Up</MenuItem>
              )}
              {!loggedUser && <MenuItem onClick={()=>{
                handleClose2()
                navigate("/login")
              }}>Login</MenuItem>}
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Mobile */}
      <Box
        className="sm:hidden flex bg-red-300 h-[70px] w-full navbarbg fixed z-10 top-0 left-0 right-0  bg-white/80
    backdrop-blur-md"
      >
        {/* Content */}

        <Box className=" w-full mx-5 flex justify-between  items-center ">
          {/* Left Side */}
          <IconButton onClick={handleClick}>
            <MenuIcon className="text-black text-3xl" />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>

          {/* middle */}
          <Box className="flex items-center">
            <LiveTvIcon className="text-3xl" />
          </Box>

          {/* right side */}
          <IconButton className="" onClick={handleClick2}>
            <Person2Icon className="text-3xl" />
          </IconButton>

          <Menu anchorEl={anchorEl2} open={open2} onClose={handleClose2} className="sm:hidden">
          {loggedUser && <MenuItem onClick={()=>{
                navigate("/dashboard")
                handleClose2()
              }}>My Saved Shows</MenuItem>}
              {loggedUser && <MenuItem onClick={()=>{
                handleClose2()
                dispatch(setLogout())
              }}>Logout</MenuItem>}
              {!loggedUser && (
                <MenuItem onClick={()=>{
                  handleClose2()
                  navigate("/signup")
                }}>Sign Up</MenuItem>
              )}
              {!loggedUser && <MenuItem onClick={()=>{
                handleClose2()
                navigate("/login")
              }}>Login</MenuItem>}
          </Menu>
        </Box>
      </Box>
    </>
  );
}
