import React from "react";
import "./Components.css";

export default function ImageContainer(prop) {
     const outerStyle = {
          padding: "6px",
          borderWidth: "0px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "10px",
          boxShadow: "0px 0px 10px 3px rgba( 100, 100, 120, .5)",
          backgroundColor: "white",
     };
     const innerStyle = {
          backgroundSize: "cover",
          borderRadius: "50%",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
     };
     return (
          <div className="PfpConainter">
               <div className="OuterCirclePfp" style={outerStyle}>
                    {/* div for the Outer boundary */}
                    <div className="" style={innerStyle}>
                         {/* div for inner boundry */}
                         <img className="" src={prop.image} alt="" />
                         {/* The logo will the background if the inner circle */}
                    </div>
               </div>
          </div>
     );
}
