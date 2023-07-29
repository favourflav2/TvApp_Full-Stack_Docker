import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
//import Home from './pages/Home/Home';
import NavBar from "./components/navbar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import MovieDetails from './components/details/MovieDetails';
//import ViewAll from './components/viewAll/ViewAll';
//import Signup from './pages/auth/Signup';
import { Dispatch } from "./redux/store";
import { setUser } from "./redux/features/authSlice";
//import Login from './pages/auth/Login';
//import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from "./components/redirects/PrivateRoute";


const Home = lazy(() => import("./pages/Home/Home"));
const MovieDetails = lazy(() => import("./components/details/MovieDetails"));
const ViewAll = lazy(() => import("./components/viewAll/ViewAll"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

function App() {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = Dispatch();

  React.useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/movieDetails/:id"
            element={
              <Suspense fallback={<div className="homebg w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <MovieDetails />
              </Suspense>
            }
          />
          <Route
            path="/viewAll/:pageName"
            element={
              <Suspense fallback={<div className="bg-white w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <ViewAll />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<div className="bg-white w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div className="bg-white w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<div className="bg-gray-200 w-full h-screen flex items-center justify-center"><div>Loading...</div></div>}>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
