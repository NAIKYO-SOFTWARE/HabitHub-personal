import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./views/Authorized/Home";
import NotFound from "./components/Notfound";
import Login from "./views/Unauthorized/Login";
import { useAppStore } from "./store/app-store";
import Suggestion from "./views/Authorized/Suggestion";
import NewTask from "./views/Authorized/NewTask";
import Calendar from "./views/Authorized/Calendar";
import Profile from "./views/Authorized/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Intro from "./views/Unauthorized/Intro";

function App() {
  const isAuthorized = useAppStore((store) => store.isAuthorized);

  return (
    <BrowserRouter>
      {isAuthorized ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
}
function AuthorizedRoutes() {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<Home />} />
      <Route path={"/suggestion"} element={<Suggestion />} />
      <Route path={"/new-task"} element={<NewTask />} />
      <Route path={"/calendal"} element={<Calendar />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function UnauthorizedRoutes() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Navigate to="/intro" replace state={{ from: location.pathname }} />
        }
      />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/intro"} element={<Intro />} />
    </Routes>
  );
}

export default App;
