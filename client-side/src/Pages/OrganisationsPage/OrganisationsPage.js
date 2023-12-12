import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrganisationCard from "../../Components/OrganisationCard";
import testImg from "./testimg.jpeg";
import "./OrganisationPage.css";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

export default function OrganisationsPage(prop) {
     const navigate = useNavigate();
     let currentUser_ = {};

     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [alertVarient, setAlertVarient] = useState("");
     const [show, setShow] = useState(false);
     const [rerenderer, setRerenderer] = useState(false);
     const [HtmlLoaded, setHtmlLoaded] = useState(false);
     const [CardsComponent, setCardsComponent] = useState(null);

     useEffect(() => {
          currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser_ == null) {
               navigate("/landing");
          }
          const doWork = async () => {
               let currentUser_ = JSON.parse(
                    localStorage.getItem("currentUser")
               );
               const reqData = {
                    email: currentUser_.email,
                    password: currentUser_.password,
                    organisations: currentUser_.organisations,
               };
               try {
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/organisations",
                         {
                              method: "POST",
                              body: JSON.stringify(reqData),
                              headers: {
                                   "Content-Type": "application/json",
                              },
                         }
                    );
                    const fetchedData = await response.json();
                    if (fetchedData.status === "authFailed") {
                         localStorage.removeItem("currentUser");
                         navigate("/landing");
                    } else if (fetchedData.status === "failed") {
                         setAlertHead("Data failed to retrieve!");
                         setAlertBody(
                              "There was some unexpected error in retrieving the data of your organisations. Please try again."
                         );
                         setAlertVarient("danger");
                         setShow(true);
                    } else {
                         const cards = fetchedData.data;
                         let tempCardsComponent;
                         if (cards.length === 0) {
                              tempCardsComponent = (
                                   <div
                                        style={{
                                             paddingTop: "100px",
                                             paddingBottom: "100px",
                                             color: "darkred",
                                        }}
                                   >
                                        <h4>
                                             Sorry, currently you do not belong
                                             to any organisation. Try creating
                                             your own organisation.
                                        </h4>
                                   </div>
                              );
                         } else {
                              tempCardsComponent = cards.map((card) => {
                                   return (
                                        <div>
                                             <OrganisationCard
                                                  title={card.name}
                                                  id={card._id}
                                                  key={card._id}
                                                  rerenderer={rerenderer}
                                                  setRerenderer={setRerenderer}
                                             />
                                        </div>
                                   );
                              });
                         }
                         setCardsComponent(tempCardsComponent);
                         setHtmlLoaded(true);
                    }
               } catch (error) {
                    setAlertHead("Data failed to retrieve!");
                    setAlertBody(
                         "There was some error in retrieving the data of your organisations. Please check your connection and try again."
                    );
                    setAlertVarient("danger");
                    setShow(true);
               }
          };
          doWork();
     }, [rerenderer]);
     return HtmlLoaded ? (
          show ? (
               <>
                    <NavBar />
                    <div style={{ paddingTop: "56px" }}>
                         <Alert
                              variant={alertVarient}
                              onClose={() => setShow(false)}
                              dismissible
                         >
                              <Alert.Heading>{alertHead}</Alert.Heading>
                              <p>{alertBody}</p>
                         </Alert>
                         <div className="OrganisationPageContainer1">
                              <h3 style={{ textAlign: "center" }}>
                                   Your Organisations
                              </h3>
                              <hr />
                              <div className="OrganisationPageContainer2">
                                   {CardsComponent}
                              </div>
                         </div>
                    </div>
                    <Footer />
               </>
          ) : (
               <>
                    <NavBar />
                    <div style={{ paddingTop: "100px" }}>
                         <div className="OrganisationPageContainer1">
                              <h3 style={{ textAlign: "center" }}>
                                   Your Organisations
                              </h3>
                              <hr />
                              <div className="OrganisationPageContainer2">
                                   {CardsComponent}
                              </div>
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
