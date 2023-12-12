import React from "react";
import Button from "react-bootstrap/Button";

export default function UserCard(prop) {
     return (
          <div className="UserCardMainContainer">
               <div className="UserPhoto">
                    <img src={prop.image} height={"240px"} width={"240px"} />
               </div>
               <div className="UserInfo">
                    <div>
                         <b>{prop.name}</b>
                         <p>{prop.branch}</p>
                    </div>
                    <a href={prop.gitLink}>
                         <Button
                              style={{ width: "240px" }}
                              variant="outline-primary"
                         >
                              Github
                         </Button>
                    </a>
               </div>
          </div>
     );
}
