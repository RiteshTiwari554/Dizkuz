import React from "react";
import "./Components.css";

export default function MemberCard(prop) {
     return (
          <div className="OuterContainer">
               <b>{prop.name}</b>
               <br />
               <small>{prop._id}</small>
               <br />
               {prop.email}
          </div>
     );
}
