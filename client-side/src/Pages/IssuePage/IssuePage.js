import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IssueCard from "../../Components/IssueCard";
import Button from "react-bootstrap/Button";
import "./IssuePage.css";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import AddImg from "./AddImg.png";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function NewIssueModal(props) {
     const navigate = useNavigate();

     const [IssueName, setIssueName] = useState("");
     const [IssueDescription, setIssueDescription] = useState("");

     const updateIssueName = (e) => {
          setIssueName(e.target.value);
     };

     const updateIssueDescription = (e) => {
          setIssueDescription(e.target.value);
     };

     const addIssue = async (e) => {
          props.onHide();
          try {
               const dizkuzData = JSON.parse(
                    localStorage.getItem("dizkuzData")
               );
               const currentUser_ = JSON.parse(
                    localStorage.getItem("currentUser")
               );
               const CatID = dizkuzData.currentCategory;
               const inp = {
                    name: currentUser_.name,
                    email: currentUser_.email,
                    password: currentUser_.password,
                    NAME: IssueName,
                    DESCRIPTION: IssueDescription,
                    ID: CatID,
               };
               const response = await fetch("https://dizkuz-server.onrender.com/newIssue", {
                    method: "POST",
                    body: JSON.stringify(inp),
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const data = await response.json();
               if (data == null) {
                    props.setAlertHead("Issue already exists!");
                    props.setAlertBody(
                         "A Issue with the same name in this category already exists. Please try making some changes in the name and then try again."
                    );
                    props.setAlertVarient("warning");
                    props.setAlertShow(true);
               } else if (data.status === "success") {
                    props.setAlertHead("Issue Added successfully!");
                    props.setAlertBody(
                         "The issue you just created has been added into the database. If you cannot find it, please try reloading the page."
                    );
                    props.setAlertVarient("success");
                    props.setAlertShow(true);
                    const redirectURL = "/issues";
                    localStorage.setItem(
                         "dizkuzredirectURL",
                         JSON.stringify(redirectURL)
                    );
                    navigate("/redirect");
               } else {
                    props.setAlertHead("Some unknown Error occured!");
                    props.setAlertBody(
                         "There was some unexpected error which prevented us to create the issue you wanted. Please try again."
                    );
                    props.setAlertVarient("danger");
                    props.setAlertShow(true);
               }
          } catch (error) {
               props.setAlertHead("Unexpected Error occured!");
               props.setAlertBody(
                    "Some unknown error occured. Please check your connection and try again."
               );
               props.setAlertVarient("danger");
               props.setAlertShow(true);
          }

          props.setRerenderer(!props.rerenderer);
     };

     return (
          <Modal
               {...props}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
          >
               <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                         New Issue
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <Form.Control
                         type="text"
                         placeholder="Enter Issue name"
                         style={{ marginBottom: "5px" }}
                         value={IssueName}
                         onChange={updateIssueName}
                    />
                    <Form.Control
                         type="textarea"
                         placeholder="Enter Issue description"
                         style={{ marginTop: "5px" }}
                         value={IssueDescription}
                         onChange={updateIssueDescription}
                    />
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                         Cancel
                    </Button>
                    <Button variant="primary" onClick={addIssue}>
                         Create
                    </Button>
               </Modal.Footer>
          </Modal>
     );
}

export default function IssuePage() {
     const navigate = useNavigate();

     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [alertVarient, setAlertVarient] = useState("");
     const [Alertshow, setAlertShow] = useState(false);
     const [rerenderer, setRerenderer] = useState(false);
     const [modalShow, setModalShow] = React.useState(false);
     const [HtmlLoaded, setHtmlLoaded] = useState(false);
     const [IssueComponent, setIssueComponent] = useState(<></>);
     const [CategoryName, setCategoryName] = useState("");
     const [OrganisationName, setOrganisationName] = useState("");

     const JumpToAddIssue = () => {
          setModalShow(true);
     };

     let currentUser_ = {};

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
                    setOrganisationName(dizkuzData.currentOrganisationName);
                    setCategoryName(dizkuzData.currentCategoryName);
                    const CatID = dizkuzData.currentCategory;
                    const inp = {
                         email: currentUser_.email,
                         password: currentUser_.password,
                         ID: CatID,
                    };
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/issues",
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
                              "Due to some unexpected error, the issues were not loaaded. Please try again."
                         );
                         setAlertVarient("danger");
                         setAlertShow(true);
                    } else {
                         const LoadedData = fetchData.data;
                         const Issues = LoadedData;
                         let tempVar;
                         if (Issues.length == 0) {
                              tempVar = (
                                   <div
                                        style={{
                                             paddingTop: "100px",
                                             paddingBottom: "50px",
                                             color: "darkred",
                                        }}
                                   >
                                        <h4>Sorry, No issue exists.</h4>
                                   </div>
                              );
                         } else {
                              tempVar = Issues.map((issue) => {
                                   return (
                                        <div>
                                             <IssueCard
                                                  title={issue.title}
                                                  body={issue.body}
                                                  id={issue._id}
                                                  author={issue.author}
                                                  date={issue.date}
                                                  key={issue.id}
                                             />
                                        </div>
                                   );
                              });
                         }
                         const tempIssueComponent = tempVar;
                         setRerenderer(!rerenderer);
                         setIssueComponent(tempIssueComponent);
                         setHtmlLoaded(true);
                    }
               } catch (error) {
                    setAlertHead("Unexpected error occured!");
                    setAlertBody(
                         "Due to some unexpected error we were not able to get the issues for you. Please check your connection and try again..."
                    );
                    setAlertVarient("danger");
                    setAlertShow(true);
               }
          };
          doWork();
     }, [rerenderer]);

     return HtmlLoaded ? (
          Alertshow ? (
               <>
                    <NavBar />
                    <div style={{height : '80px'}}></div>
                    <Alert
                         variant={alertVarient}
                         onClose={() => setAlertShow(false)}
                         dismissible
                    >
                         <Alert.Heading>{alertHead}</Alert.Heading>
                         <p>{alertBody}</p>
                    </Alert>
                    <div
                         className="IssuePageOuterContainer"
                         style={{ paddingTop: "100px" }}
                    >
                         <h3 style={{ textAlign: "center" }}>
                              <span style={{ fontSize: "25px" }}>
                                   {OrganisationName}
                              </span>
                              <span style={{ fontSize: "50px" }}>
                                   <b>/{CategoryName}</b>
                              </span>
                         </h3>
                         <hr />
                         <div className="IssuePageContainer">
                              <div
                                   className="NewIssue"
                                   onClick={JumpToAddIssue}
                              >
                                   <div>
                                        <div className="NewIssueCont">
                                             <img
                                                  src={AddImg}
                                                  height={"100px"}
                                             />
                                        </div>
                                        <div>Add new issue</div>
                                   </div>
                              </div>
                              {IssueComponent}
                         </div>
                    </div>
                    <NewIssueModal
                         show={modalShow}
                         onHide={() => setModalShow(false)}
                         rerenderer={rerenderer}
                         setRerenderer={setRerenderer}
                    />
                    <Footer />
               </>
          ) : (
               <>
                    <NavBar />
                    <div style={{height : '80px'}}></div>
                    <div
                         className="IssuePageOuterContainer"
                         style={{ paddingTop: "10px" }}
                    >
                         <h3 style={{ textAlign: "center" }}>
                              <span style={{ fontSize: "25px" }}>
                                   {OrganisationName}
                              </span>
                              <span style={{ fontSize: "50px" }}>
                                   <b>/{CategoryName}</b>
                              </span>
                         </h3>
                         <hr />
                         <div className="IssuePageContainer">
                              <div
                                   className="NewIssue"
                                   onClick={JumpToAddIssue}
                              >
                                   <div>
                                        <div className="NewIssueCont">
                                             <img
                                                  src={AddImg}
                                                  height={"100px"}
                                             />
                                        </div>
                                        <div>Add new issue</div>
                                   </div>
                              </div>
                              {IssueComponent}
                         </div>
                    </div>
                    <NewIssueModal
                         show={modalShow}
                         onHide={() => setModalShow(false)}
                         rerenderer={rerenderer}
                         setRerenderer={setRerenderer}
                    />
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
