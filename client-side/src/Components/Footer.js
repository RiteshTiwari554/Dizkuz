import React from "react";
import "./Components.css";

export default function Footer() {
     return (
          <div className="FooterContainer">
               <p style={{ textAlign: "centre", fontWeight: "bold" }}>
                    Created in 2023
               </p>
               <hr />
               <div style={{ textAlign: "start" }}>
                    <p>@Creators : </p>
                    <a
                         href="https://github.com/adityarai0705"
                         style={{ textDecoration: "none", color: "azure" }}
                    >
                         Aditya Raj Rai
                              
                    </a>
                    <br />
                    <a
                         href="https://github.com/ishavishwakarma29"
                         style={{ textDecoration: "none", color: "azure" }}
                    >
                         Isha Vishwakarma
                    </a>
                    <br />
                    <a
                         href="https://github.com/Aishwaryavikramsingh"
                         style={{ textDecoration: "none", color: "azure" }}
                    >
                         Aishwarya Vikarm Singh
                    </a>
                    <br />
                    <a
                         href="https://github.com/aditya-mnnit"
                         style={{ textDecoration: "none", color: "azure" }}
                    >
                         Aditya Singh Yadav
                    </a>
               </div>
          </div>
     );
}
