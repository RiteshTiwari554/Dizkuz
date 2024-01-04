import React from "react";
import UserCard from "./UserCard";
import Isha from "./StaticRES/isha.png";
import Aditya1 from "./StaticRES/adityarai.png";
import Aditya2 from "./StaticRES/adityayadav.png";
import Aishwarya from "./StaticRES/aishwarya.png";

export default function Creaters() {
     return (
          <div style={{ padding: "20px" }}>
               <h2 style={{ color: "darkcyan" }}>Creators</h2>
               <div className="UserCardOuterContainer">
                    <div className="UserCardContainer">
                         <UserCard
                              name={"Aditya Raj Rai"}
                              branch={"Computer Science & Engineering"}
                              image={Aditya1}
                              gitLink={"https://github.com/adityarai0705"}
                         />
                         <UserCard
                              name={"Aishwarya Vikram Singh"}
                              branch={"Computer Science & Engineering"}
                              image={Aishwarya}
                              gitLink={
                                   "https://github.com/Aishwaryavikramsingh"
                              }
                         />
                         <UserCard
                              name={"Ritesh Tiwari"}
                              branch={"Computer Science & Engineering"}
                              image={Isha}
                              gitLink={"https://github.com/RiteshTiwari554"}
                         />
                         <UserCard
                              name={"Aditya Singh Yadav"}
                              branch={"Computer Science & Engineering"}
                              image={Aditya2}
                              gitLink={"https://github.com/aditya-mnnit"}
                         />
                    </div>
               </div>
          </div>
     );
}
