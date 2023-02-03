import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Login from "./screens/auth/Login/Login";
import Profile from "./screens/auth/Profile/Profile";
import Signup from "./screens/auth/Signup/Signup";
import MyCollections from "./screens/Collection/MyCollections";
import CreateRooms from "./screens/flatOwner/Dashboard/CreateRooms";
import Dashboard from "./screens/flatOwner/Dashboard/Dashboard";
import HomePage from "./screens/HomePage";
import JobHunterDetailsPage from "./screens/jobHunter/JobHunterDetailsPage";
import ResetPasswordJobHunter from "./screens/jobHunter/ResetPasswordJobHunter";
import ProjectDetailsPage from "./screens/Projects/ProjectDetailsPage";
import ResetPasswordRecruiter from "./screens/recruiter/ResetPasswordRecruiter";
import ShowJobHunters from "./screens/ShowJobHunters";
import ShowProjects from "./screens/ShowProjects";
import { fetchCollections, reset } from "./store/collections/collectionSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    dispatch(fetchCollections());

    dispatch(reset());
  }, [user, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/project/:projectId' element={<ProjectDetailsPage />} /> */}
        {/* <Route
          path='/jobHunter/:jobHunterId'
          element={<JobHunterDetailsPage />}
        /> */}
        {/* {user && user.role === "tenant" && (
          <> */}
        <Route path='/search/rooms' element={<ShowProjects user={user} />} />
        <Route
          path='/search/tenants'
          element={<ShowJobHunters user={user} />}
        />
        {/* </> */}
        {/* )} */}
        <Route path='/forgotPassword' element={<ForgotPassword />} />

        {/* Job Hunter routes */}
        <Route
          path='/tenant/resetPassword/:token'
          element={<ResetPasswordJobHunter />}
        />

        {/* Recruiter routes */}
        <Route
          path='/owner/resetPassword/:token'
          element={<ResetPasswordRecruiter />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        {user && user.role === "flatowner" && (
          <>
            <Route element={<ProtectedRoute />}>
              <Route path='/owner/dashboard' element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/owner/createRooms' element={<CreateRooms />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/owner/rooms' element={<Dashboard />} />
            </Route>
          </>
        )}

        {/* <Route element={<ProtectedRoute />}>
          <Route path='/collections' element={<MyCollections />} />
        </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;
