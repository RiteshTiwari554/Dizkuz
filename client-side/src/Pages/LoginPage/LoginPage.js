import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login_img from "./Landing_img.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginPage.css";
import Alert from "react-bootstrap/Alert";

export default function LoginPage(prop) {
     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [show, setShow] = useState(false);

     let currentUser_ = {};

     const [userCredentials, setUserCredentials] = useState({
          email: "",
          password: "",
     });
     const navigate = useNavigate();

     const CheckLogin = () => {
          prop.setUser(true);
          navigate("/");
     };

     const handleInputs = (e) => {
          const Name = e.target.name;
          const Value = e.target.value;
          setUserCredentials({ ...userCredentials, [Name]: Value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await fetch("https://dizkuz-server.onrender.com/login", {
                    method: "POST",
                    body: JSON.stringify(userCredentials),
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const data = await response.json();
               if (data.status == "notFound") {
                    setAlertHead("User not found!");
                    setAlertBody(
                         "The email you used to login is not present in our database. Please try to recall your email and try again."
                    );
                    setShow(true);
               } else {
                    const check = data.password;
                    if (data.status === "matched") {
                         const curUser = {
                              name: data.name,
                              email: data.email,
                              password: data.password,
                              organisations: data.organisations,
                              messages: data.messages,
                              _id: data._id,
                              __v: data.__v,
                         };
                         localStorage.setItem(
                              "currentUser",
                              JSON.stringify(curUser)
                         );
                         navigate("/");
                    } else {
                         setAlertHead("Incorrect password!");
                         setAlertBody(
                              "The password you entered is not the correct password for the account " +
                                   userCredentials.email +
                                   ". Please recall your password and try again."
                         );
                         setShow(true);
                    }
               }
          } catch (error) {
               setAlertHead("Login failed!");
               setAlertBody(
                    "Due to an unexpected error we were not able to log you in, please check your connection try again."
               );
               setShow(true);
          }
     };

     useEffect(() => {
          const currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser_ != null) {
               navigate("/");
          }
     }, []);

     return show ? (
          <>
               <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
               >
                    <Alert.Heading>{alertHead}</Alert.Heading>
                    <p>{alertBody}</p>
               </Alert>
               <div className="LoginContainer">
                    <div className="LoginPageContainer">
                         <div className="LoginPageChild1">
                              <img src={Login_img} alt="img" />
                         </div>
                         <div className="LoginPageChild2">
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                             type="email"
                                             name="email"
                                             placeholder="Enter email"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                   >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                             type="password"
                                             name="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>
                                   <Button variant="primary" type="submit">
                                        Login
                                   </Button>
                              </Form>
                              <a onClick={ () => { navigate("/signup")}}>Sign up instead?</a>
                         </div>
                    </div>
               </div>
          </>
     ) : (
          <>
               <div className="LoginContainer">
                    <div className="LoginPageContainer">
                         <div className="LoginPageChild1">
                              <img src={Login_img} alt="img" />
                         </div>
                         <div className="LoginPageChild2">
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                   >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                             type="email"
                                             name="email"
                                             placeholder="Enter email"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>
                                   <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                   >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                             type="password"
                                             name="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Button variant="primary" type="submit">
                                        Login
                                   </Button>
                              </Form>
                              <a onClick={ () => { navigate("/signup")}}>Sign up instead?</a>
                         </div>
                    </div>
               </div>
          </>
     );
}
