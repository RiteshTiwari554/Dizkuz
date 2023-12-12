import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./NewOrganisationPage.css";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function NewOrganisationPage() {
     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [variant, setVariant] = useState("");
     const [show, setShow] = useState(false);
     const navigate = useNavigate();
     const [participants, setParticipants] = useState([]);
     const [dummy, setDummy] = useState(true);
     const [OrganisationName, setOrganisationName] = useState("");

     let NewUserID = "";
     let currentUser_ = {};
     let participants_ = participants;

     let participantComponent = participants_.map((participant) => {
          return (
               <>
                    <p>{participant}</p>
               </>
          );
     });
     const handleInputName = (e) => {
          setOrganisationName(e.target.value);
     };
     const handleID = (e) => {
          NewUserID = e.target.value;
     };
     const AddNewUser = async (e) => {
          e.preventDefault();
          if (NewUserID == "") {
               setAlertHead("UserID is empty!");
               setAlertBody(
                    "The userID cannot be an empty string. Please enter userID."
               );
               setVariant("warning");
               setShow(true);
          } else {
               const checkID = {
                    userID: NewUserID,
               };
               try {
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/checkuserid",
                         {
                              method: "POST",
                              body: JSON.stringify(checkID),
                              headers: {
                                   "Content-Type": "application/json",
                              },
                         }
                    );
                    const data = await response.json();
                    if (data.status === "Found") {
                         setAlertHead("User Added Succesfully!");
                         setAlertBody(
                              "The user has been added to the organisation"
                         );
                         setVariant("success");
                         setShow(true);
                         let arr = participants;
                         arr.push(NewUserID);
                         setParticipants(arr);
                         setDummy(!dummy);
                         document.getElementsByClassName(
                              "newUserIDUserInput"
                         )[0].value = "";
                    } else {
                         setAlertHead("User not found!");
                         setAlertBody(
                              "The userID you entered does not exist in our database. Please check it and try again."
                         );
                         setVariant("danger");
                         setShow(true);
                    }
               } catch (error) {
                    setAlertHead("Unknown error occured!");
                    setAlertBody(
                         "An unknown error occured. please check your network and try again."
                    );
                    setVariant("danger");
                    setShow(true);
               }
          }
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          const currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          const organisation = {
               name: currentUser_.name,
               email: currentUser_.email,
               password: currentUser_.password,
               organisations: currentUser_.organisations,
               User_id: currentUser_._id,
               users: participants,
               OrgName: OrganisationName,
          };
          try {
               const response = await fetch("https://dizkuz-server.onrender.com/newOrg", {
                    method: "POST",
                    body: JSON.stringify(organisation),
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const data = await response.json();
               if (data.status === "Success") {
                    let curUser = {
                         name: data.name,
                         email: data.email,
                         password: data.password,
                         organisations: data.organisations,
                         messages: data.messages,
                         _id: data._id,
                         __v: data.__v,
                    };
                    localStorage.removeItem("currentUser");
                    localStorage.setItem(
                         "currentUser",
                         JSON.stringify(curUser)
                    );
                    navigate("/organisations");
               } else {
                    setAlertHead("Unknown error occured!");
                    setAlertBody(
                         "An unknown error occured. please check your network and try again."
                    );
                    setShow(true);
               }
          } catch (error) {
               setAlertHead("Unknown error occured!");
               setAlertBody(
                    "An unknown error occured. please check your network and try again."
               );
               setShow(true);
          }
     };

     useEffect(() => {
          currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser_ == null) {
               navigate("/landing");
          }
     }, []);

     return show ? (
          <div>
               <div style={{ height: "50px" }}></div>
               <Alert
                    variant={variant}
                    onClose={() => setShow(false)}
                    dismissible
               >
                    <Alert.Heading>{alertHead}</Alert.Heading>
                    <p>{alertBody}</p>
               </Alert>
               <>
                    <NavBar />
                    <div
                         className="NewOrganisationContainer"
                         style={{ paddingTop: "0px" }}
                    >
                         <h4>Create New Organisation</h4>
                         <div className="NewOrganisationSubContainer">
                              <Form
                                   className="NewOrganisationSubContainer2"
                                   onSubmit={handleSubmit}
                              >
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>
                                             Organisation's name
                                        </Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Enter your organisation's name"
                                             name="organisationName"
                                             value={OrganisationName}
                                             onChange={handleInputName}
                                             required
                                        />
                                        <Form.Text className="text-muted">
                                             Name of an organisation can never
                                             be changed again.
                                        </Form.Text>
                                   </Form.Group>
                                   <div className="participantContainer">
                                        <b>Users</b>
                                        <hr />
                                        <div style={{ textAlign: "start" }}>
                                             {participantComponent}
                                        </div>
                                   </div>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>Add user</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Enter the ID of the user"
                                             name="newUserID"
                                             onChange={handleID}
                                             className="newUserIDUserInput"
                                        />
                                        <Form.Text className="text-muted">
                                             Leave it blank if you don't want to
                                             add more users.
                                        </Form.Text>
                                   </Form.Group>
                                   <Button
                                        variant="outline-primary"
                                        className="newOrgButton"
                                        onClick={AddNewUser}
                                   >
                                        Add User
                                   </Button>
                                   <Button
                                        variant="primary"
                                        type="submit"
                                        className="newOrgButton"
                                        onClick={handleSubmit}
                                   >
                                        Create Organisation
                                   </Button>
                              </Form>
                         </div>
                    </div>
                    <Footer />
               </>
          </div>
     ) : (
          <div>
               <>
                    <NavBar />
                    <div
                         className="NewOrganisationContainer"
                         style={{ paddingTop: "70px" }}
                    >
                         <h4>Create New Organisation</h4>
                         <div className="NewOrganisationSubContainer">
                              <Form className="NewOrganisationSubContainer2">
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>
                                             Organisation's name
                                        </Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Enter your organisation's name"
                                             name="organisationName"
                                             value={OrganisationName}
                                             onChange={handleInputName}
                                             required
                                        />
                                        <Form.Text className="text-muted">
                                             Name of an organisation can never
                                             be changed again.
                                        </Form.Text>
                                   </Form.Group>
                                   <div className="participantContainer">
                                        <b>Users</b>
                                        <hr />
                                        <div style={{ textAlign: "start" }}>
                                             {participantComponent}
                                        </div>
                                   </div>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>Add user</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Enter the ID of the user"
                                             name="newUserID"
                                             onChange={handleID}
                                             className="newUserIDUserInput"
                                        />
                                        <Form.Text className="text-muted">
                                             Leave it blank if you don't want to
                                             add more users.
                                        </Form.Text>
                                   </Form.Group>
                                   <Button
                                        variant="outline-primary"
                                        className="newOrgButton"
                                        onClick={AddNewUser}
                                   >
                                        Add User
                                   </Button>
                                   <Button
                                        variant="primary"
                                        type="submit"
                                        className="newOrgButton"
                                        onClick={handleSubmit}
                                   >
                                        Create Organisation
                                   </Button>
                              </Form>
                         </div>
                    </div>
                    <Footer />
               </>
          </div>
     );
}
