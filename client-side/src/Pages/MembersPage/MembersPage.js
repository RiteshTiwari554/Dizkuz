import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import "./MembersPage.css";
import Spinner from "react-bootstrap/Spinner";
import MemberCard from "../../Components/MemberCard";
import Alert from "react-bootstrap/Alert";

export default function MembersPage() {
     const navigate = useNavigate();

     let currentUser_ = {};

     const [MembersComponent, setMembersComponent] = useState(<></>);
     const [OrganisationName, setOrganisationName] = useState("Organisation 1");
     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [alertVarient, setAlertVarient] = useState("");
     const [Alertshow, setAlertShow] = useState(false);
     const [rerenderer, setRerenderer] = useState(false);
     const [HtmlLoaded, setHtmlLoaded] = useState(false);

     useEffect(() => {
          currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser_ == null) {
               navigate("/landing");
          }
          const doWork = async () => {
               try {
                    const dizkuzData = JSON.parse(
                         localStorage.getItem("dizkuzData")
                    );
                    const currentUser_ = JSON.parse(
                         localStorage.getItem("currentUser")
                    );
                    const OrgID = dizkuzData.currentOrganisation;
                    setOrganisationName(dizkuzData.currentOrganisationName);
                    const inp = {
                         email: currentUser_.email,
                         password: currentUser_.password,
                         ID: OrgID,
                    };
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/members",
                         {
                              method: "POST",
                              body: JSON.stringify(inp),
                              headers: {
                                   "Content-Type": "application/json",
                              },
                         }
                    );
                    const fetchData = await response.json();
                    if (fetchData.status === "authFailed") {
                         localStorage.removeItem("currentUser");
                         navigate("/landing");
                    } else if (fetchData.status == "failed") {
                         setAlertHead("Unknown error occured");
                         setAlertBody(
                              "Due to some unexpected error, the members were not loaaded. Please try again."
                         );
                         setAlertVarient("danger");
                         setAlertShow(true);
                    } else {
                         const LoadedData = fetchData.data;
                         const Members = LoadedData;
                         let tempVar;
                         if (Members.length == 0) {
                              tempVar = (
                                   <div
                                        style={{
                                             paddingTop: "100px",
                                             paddingBottom: "50px",
                                             color: "darkred",
                                        }}
                                   >
                                        <h4>Sorry, No Member exists.</h4>
                                   </div>
                              );
                         } else {
                              tempVar = Members.map((member) => {
                                   return (
                                        <MemberCard
                                             name={member.name}
                                             email={member.email}
                                             _id={member._id}
                                        />
                                   );
                              });
                         }
                         const tempMemberComponent = tempVar;

                         setRerenderer(!rerenderer);
                         setMembersComponent(tempMemberComponent);
                         setHtmlLoaded(true);
                    }
               } catch (error) {
                    setAlertHead("Unexpected error occured!");
                    setAlertBody(
                         "Due to some unexpected error we were not able to get the Members for you. Please check your connection and try again..."
                    );
                    setAlertVarient("danger");
                    setAlertShow(true);
               }
          };
          doWork();
     }, []);
     return HtmlLoaded ? (
          Alertshow ? (
               <>
                    <NavBar />
                    {/* <div style={{height:'10px'}}></div> */}
                    <Alert
                         variant={alertVarient}
                         onClose={() => setAlertShow(false)}
                         dismissible
                    >
                         <Alert.Heading>{alertHead}</Alert.Heading>
                         <p>{alertBody}</p>
                    </Alert>
                    <div style={{ padding: "20px", paddingTop: "0px" }}>
                         <h3>{OrganisationName}</h3> <hr />
                         <div className="MembersHeading">
                              <h4>Members</h4>
                         </div>
                         <div className="MembersContainer">
                              {MembersComponent}
                         </div>
                    </div>
                    <Footer />
               </>
          ) : (
               <>
                    <NavBar />
                    <div style={{ padding: "20px", marginTop: "10px" }}>
                         <h3>{OrganisationName}</h3> <hr />
                         <div className="MembersHeading">
                              <h4>Members33</h4>
                         </div>
                         <div className="MembersContainer">
                              {MembersComponent}
                         </div>
                    </div>
                    <Footer />
               </>
          )
     ) : (
          <>
               <NavBar />
               <div className="SpinnerContainer">
                    <Spinner animation="border" variant="dark" />
               </div>
               <Footer />
          </>
     );
}
