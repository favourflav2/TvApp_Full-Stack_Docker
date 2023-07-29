import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch, UseSelector } from "../../redux/store";
import { googleSignIn, logIn, setError } from "../../redux/features/authSlice";

export interface FormData {
  password: string;
  email: string;
}

export default function Login() {
  const [formData, setFormData] = React.useState<FormData>({
    password: "",
    email: "",
  });

  const dispatch = Dispatch();
  const navigate = useNavigate();
  const { error,loading } = UseSelector((state) => state.auth);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        //console.log(res.data)
        // sub === token
        //dispatch(setError());
        //console.log(res.data)
        //console.log(tokenResponse);
        //console.log(res.data);
        const { email, name, sub } = res.data;
        const formData = { email, username: name, sub };
        dispatch(googleSignIn({ formData, navigate, toast }));
      } catch (e) {
        console.log(e);
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setError());
    

    if (formData.password && formData.email) {
      dispatch(logIn({ formData, toast, navigate }));
    } else {
      toast.error("Please fill the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  React.useEffect(() => {
    dispatch(setError());
  }, []); // eslint-disable-line

    React.useEffect(() => {
    //   if (error ==='duplicate key value violates unique constraint "login_email_key"') {
    //     toast.error("Email is already being used", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     });
    //   }else 
    if(error){
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      }
    }, [error]);
  return (
    <Box className=" w-full sm:min-h-[931px] min-h-screen mt-[70px] flex items-center justify-center">
      {/* Desktop Container */}
      <Box className=" sm:flex hidden sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] min-h-[400px] px-5 py-2 rounded-lg border-2 border-black">
        {/* Content */}
        <Box className=" w-full flex flex-col h-auto">
          {/* title */}
          <Typography className="text-[30px] flex justify-center pt-4">
            Log In
          </Typography>

          {/* form */}
          <form
            className="flex flex-col justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* email */}
            <div className="flex flex-col my-3">
              <label htmlFor="email" className="mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="bg-gray-300 h-[35px] indent-2"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* password */}
            <div className="flex flex-col my-3">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-300 h-[35px] indent-2"
                name="password"
                autoComplete=""
                value={formData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex justify-center mt-2">
              Don't already have an account? &nbsp;
              <span className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-500">
                {" "}
                <Link to="/signup"> Sign Up</Link>
              </span>
            </div>

            <Button
              variant="contained"
              type="submit"
              className="bg-blue-500 mt-8 text-lg my-2"
            >
              {loading? "Loading...": "Log In"}
            </Button>

            <Button
              className="flex items-center bg-red-500 text-lg hover:bg-red-700 my-2"
              variant="contained"
              disabled={loading}
              type="button"
              onClick={() => googleLogin()}
            >
              <span className="mr-2 items-center flex ">
                <GoogleIcon className="" />
              </span>
              {loading? "Loading...": "Sign In"}
            </Button>
          </form>


          
        </Box>
      </Box>

      {/* Mobile Container */}
      <Box className="  sm:hidden flex items-center justify-center w-[97%] p-2 border border-black rounded-md">
        {/* Content */}
        <Box className="w-full flex flex-col h-auto">
          {/* title */}
          <Typography className="text-[30px] flex justify-center">
            Log In
          </Typography>

          {/* form */}
          <form className="flex flex-col justify-center" onSubmit={(e) => handleSubmit(e)}>
            

            {/* email */}
            <div className="flex flex-col my-3">
              <label htmlFor="email" className="mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="bg-gray-300 h-[35px] indent-2"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* password */}
            <div className="flex flex-col my-3">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-300 h-[35px] indent-2"
                name="password"
                autoComplete=""
                value={formData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>

            

            <div className="flex justify-center mt-2">
              Don't already have an account? &nbsp;
              <span className="transition ease-in-out delay-150  hover:-translate-y-[1px] hover:scale-110  duration-200 hover:underline cursor-pointer hover:text-blue-500">
                {" "}
                <Link to="/signup">Sign Up</Link>
              </span>
            </div>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              className="bg-blue-500 mt-8 text-lg my-2"
            >
              {loading? "Loading...": "Log In"}
            </Button>

            <Button
              className="flex items-center bg-red-500 text-lg hover:bg-red-700 my-2"
              variant="contained"
              type="button"
              onClick={() => googleLogin()}
              disabled={loading}
            >
              <span className="mr-2 items-center flex ">
                <GoogleIcon className="" />
              </span>
              {loading? "Loading...": "Sign In"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
