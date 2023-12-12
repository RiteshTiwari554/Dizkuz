import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import ImageContainer from "../../Components/ImageContainer";
import Spinner from "react-bootstrap/Spinner";

export default function HomePage(prop) {
     const [HtmlLoaded, setHtmlLoaded] = useState(false);

     const navigate = useNavigate();
     const jumptoOrganisations = () => {
          navigate("/organisations");
     };

     const JumpToNewOrganisation = () => {
          navigate("/neworganisation");
     };

     const jumptoAboutus = () => {
          navigate("/aboutus");
     };

     const [currentUser, setCurrentUser] = useState({
          name: "",
          email: "",
          organisations: [],
          messages: 0,
     });

     let currentUser_ = {};
     let profilePic = null;

     useEffect(() => {
          const doWork = async () => {
               currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
               if (currentUser_ == null) {
                    navigate("/landing");
               }
               setCurrentUser({
                    name: currentUser_.name,
                    emaill: currentUser_.email,
                    organisations: currentUser_.organisations,
                    messages: currentUser_.messages,
                    _id: currentUser_._id,
               });
               profilePic = currentUser_.profilePic;
               setHtmlLoaded(true);
          };
          doWork();
     }, []);

     return HtmlLoaded ? (
          <>
               <NavBar />
               <div className="HomePageOuterContainer">
                    <div className="HomePageUserInfo">
                         <div className="HomePageProfileContainer">
                              <div>
                                   <div className="title_he">
                                        <i>User name :</i>
                                   </div>{" "}
                                   <h2>{currentUser.name}</h2>
                              </div>
                              <div>
                                   <div className="title_he">
                                        <i>User ID :</i>
                                   </div>{" "}
                                   <h4 style={{ color: "rgb( 0, 89, 89)" }}>
                                        {currentUser._id}
                                   </h4>
                              </div>
                              <div>
                                   <div className="title_he">
                                        <i>email :</i>
                                   </div>{" "}
                                   <h4 style={{ color: "rgb( 0, 89, 89)" }}>
                                        {currentUser.emaill}
                                   </h4>
                              </div>
                              <div>
                                   <div className="title_he">
                                        <i>Organisations :</i>
                                   </div>{" "}
                                   <h4 style={{ color: "rgb( 0, 89, 89)" }}>
                                        {currentUser.organisations.length}
                                   </h4>
                              </div>
                         </div>
                         <ImageContainer image={profilePic} />
                    </div>
                    <hr />
                    <div className="HomePageButtons">
                         <div className="HBtn" onClick={jumptoOrganisations}>
                              Go to your Organisations
                         </div>
                         <div className="HBtn" onClick={JumpToNewOrganisation}>
                              Create a new Organisation
                         </div>
                    </div>
                    <hr />
                    <div className="appInfo">
                         <p>
                              <b>Dizkuz</b> is a website that allows users in an
                              organisation to collaborate and discuss seamlessly
                              on various categories of topics in real time. This
                              app allows several organisations to have their
                              users discuss their issues classified on the basis
                              of categories. Every user can be a member of
                              various organisations. Every organisation contains
                              several categories and inside those categories are
                              listed issues which individuals face and have
                              posted on the site. Every other user in the same
                              organisation can check the issue and discuss about
                              the possible solutions to it. It works on real
                              time chat system which can help reduce the wasted
                              of time in searching solution to a problem which
                              is already known by other.
                         </p>
                    </div>
                    <hr />
                    <div className="abt">
                         <div className="HBtn small" onClick={jumptoAboutus}>
                              Learn more about us
                         </div>
                    </div>
               </div>
               <Footer />
          </>
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
