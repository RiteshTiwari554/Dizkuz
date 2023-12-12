import React, { useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

function App() {
     const navigate = useNavigate();

     useEffect(() => {
          const redirectURL = JSON.parse(
               localStorage.getItem("dizkuzredirectURL")
          );
          navigate(redirectURL);
     }, []);

     return (
          <>
               <NavBar />
               <h1
                    style={{
                         height: "70vh",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                    }}
               >
                    Redirecting...
               </h1>
               <Footer />
          </>
     );
}

export default App;
