import React from "react";
import "./Components.css";

export default function MessageCardOther(prop) {
     return (
          <div className="messageCardOuterOther">
               <div className="MessageCardOther">
                    <b style={{ color: "orange" }}>{prop.author}</b>
                    <p>{prop.text}</p>
                    <small style={{ fontWeight: "200", textAlign: "end" }}>
                         <i>{prop.dateTime}</i>
                    </small>
               </div>
          </div>
     );
}
