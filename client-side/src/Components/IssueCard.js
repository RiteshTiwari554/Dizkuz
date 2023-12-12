import React from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";

export default function IssueCard(prop) {
     const navigate = useNavigate();
     const openIssue = () => {
          const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
          dizkuzData.currentIssue = prop.id;
          dizkuzData.currentIssueName = prop.title;
          localStorage.removeItem("dizkuzData");
          localStorage.setItem("dizkuzData", JSON.stringify(dizkuzData));
          navigate("/chats");
     };

     return (
          <div className="IssueCardContainer" onClick={openIssue}>
               <div
                    style={{
                         height: "50px",
                         padding: "5px",
                         textAlign: "center",
                    }}
               >
                    <h4>{prop.title}</h4>
               </div>
               <hr />
               <p style={{ height: "200px", padding: "5px" }}>{prop.body}</p>
               <hr />
               <div
                    style={{
                         height: "50px",
                         paddingRight: "10px",
                         paddingBottom: "10px",
                         textAlign: "end",
                    }}
               >
                    <p>
                         <small>
                              {prop.author}
                              <br />
                              {prop.date}
                         </small>
                    </p>
               </div>
          </div>
     );
}
