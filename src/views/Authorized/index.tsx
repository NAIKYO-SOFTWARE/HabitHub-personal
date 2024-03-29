import NotFound from "../../components/Notfound";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function Authorized() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Authorized;
