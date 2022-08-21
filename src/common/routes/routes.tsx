import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "../../screens/home/index";
import ErrorScreen from "../../screens/home/index";

function Routing(): JSX.Element {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/*" element={<ErrorScreen/>} />
    </Routes>
  );
};

export default Routing;
