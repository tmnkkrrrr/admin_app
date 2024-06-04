import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function VisitorRoute(prop) {
  const { Component } = prop;
  const navigate = useNavigate();
  function auth() {
    const token = localStorage.getItem("auth");
    if (token === null) {
      navigate("/login");
    }
  }
    useEffect(() => auth(), []);
    auth();
    return <Component />;
}

export default VisitorRoute;
