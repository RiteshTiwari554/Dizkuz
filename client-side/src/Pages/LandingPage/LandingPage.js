import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing_img from "./Landing_img.jpg";
import Button from "react-bootstrap/Button";
import "./LandingPage.css";

export default function LandingPage() {
     const navigate = useNavigate();
     const jumptoLogin = () => {
          navigate("/login");
     };

     const jumptoSignup = () => {
          navigate("/signup");
     };

     const [currentUser, setCurrentUser] = useState({
          name: null,
          email: null,
          password: null,
          organisations: [],
          messages: 0,
     });

     useEffect(() => {
          const currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          setCurrentUser(currentUser_);
          if (currentUser.name == null) {
               navigate("/landing");
          }
     }, []);

     return (
          <>
               <div className="LandingContainer">
                    <div className="LandingPageContainer">
                         <div className="LandingPageChild1">
                              <img src={Landing_img} alt="img" />
                         </div>
                         <div className="LandingPageChild2">
                              <h1>
                                   Welcome to <b>Dizkuz</b>
                              </h1>
                              <Button
                                   className="button"
                                   variant="primary"
                                   onClick={jumptoLogin}
                              >
                                   Login
                              </Button>
                              <Button
                                   className="button"
                                   variant="primary"
                                   onClick={jumptoSignup}
                              >
                                   Sign up
                              </Button>{" "}
                         </div>
                    </div>
               </div>
          </>
     );
}
