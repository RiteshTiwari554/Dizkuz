import React from "react";
import "./Components.css";

export default function MessageCardUser(prop) {
     return (
          <div className="messageCardOuterUser">
               <div className="MessageCardUser">
                    <b style={{ color: "pink" }}>{prop.author}</b>
                    <p>{prop.text}</p>
                    <small style={{ fontWeight: "200", textAlign: "end" }}>
                         <i>{prop.dateTime}</i>
                    </small>
               </div>
          </div>
     );
}
