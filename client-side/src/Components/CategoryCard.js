import React from "react";
import "./Components.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(prop) {
     const navigate = useNavigate();
     const openCategory = () => {
          const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
          dizkuzData.currentCategory = prop.id;
          dizkuzData.currentCategoryName = prop.title;
          localStorage.removeItem("dizkuzData");
          localStorage.setItem("dizkuzData", JSON.stringify(dizkuzData));
          navigate("/issues");
     };
     return (
          <div className="CategoryCardOuter" onClick={openCategory}>
               <div className="CategoryCardTitle">
                    <h4>{prop.title}</h4>
               </div>
               <hr />
               <div className="CategoryCardDescription">
                    <small>
                         ID :{" "}
                         <span style={{ userSelect: "all" }}>{prop.id}</span>
                    </small>
               </div>
          </div>
     );
}
