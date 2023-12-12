import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup_img from "./Landing_img.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignupPage.css";
import Alert from "react-bootstrap/Alert";

export default function SignupPage( prop) {
     const navigate = useNavigate();
     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [alertVarient, setAlertVarient] = useState("");
     const [show, setShow] = useState(false);

     const [person, setPerson] = useState({
          name: "",
          email: "",
          password: "",
          cPassword: "",
     });

     const handleInputs = (e) => {
          const Name = e.target.name;
          const Value = e.target.value;
          setPerson({ ...person, [Name]: Value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (person.password === person.cPassword) {
               try {
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/signUp",
                         {
                              method: "POST",
                              body: JSON.stringify(person),
                              headers: {
                                   "Content-Type": "application/json",
                              },
                         }
                    );
                    const data = await response.json();
                    if (data != null) {
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
                         setAlertHead("Signing up failed!");
                         setAlertBody(
                              "The email you used to sign up is already in use, try logging in or sign up with a different email."
                         );
                         setAlertVarient("danger");
                         setShow(true);
                    }
               } catch (error) {
                    setAlertHead("Signing up failed!");
                    setAlertBody(
                         "Due to an unexpected error we were not able to sign you up, please check your connection try again."
                    );
                    setAlertVarient("danger");
                    setShow(true);
               }
          } else {
               setAlertHead("Oops! Password mismatched...");
               setAlertBody(
                    "The passwords you entered didn't matched. Please check the password and try again."
               );
               setAlertVarient("warning");
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
                    variant={alertVarient}
                    onClose={() => setShow(false)}
                    dismissible
               >
                    <Alert.Heading>{alertHead}</Alert.Heading>
                    <p>{alertBody}</p>
               </Alert>
               <div className="SignupContainer">
                    <div className="SignupPageContainer">
                         <div className="SignupPageChild1">
                              <img src={Signup_img} alt="img" />
                         </div>
                         <div className="SignupPageChild2">
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                             name="name"
                                             type="text"
                                             placeholder="Enter name"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                             name="email"
                                             type="email"
                                             placeholder="Enter email"
                                             required
                                             onChange={handleInputs}
                                        />
                                        <Form.Text className="text-muted">
                                             We'll never share your email with
                                             anyone else.
                                        </Form.Text>
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Create password</Form.Label>
                                        <Form.Control
                                             name="password"
                                             type="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>
                                             Confirm password
                                        </Form.Label>
                                        <Form.Control
                                             name="cPassword"
                                             type="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Button variant="primary" type="submit">
                                        Sign up
                                   </Button>
                              </Form>
                              <a onClick={ () => { navigate("/login")}}>Login instead?</a>
                         </div>
                    </div>
               </div>
          </>
     ) : (
          <>
               <div className="SignupContainer">
                    <div className="SignupPageContainer">
                         <div className="SignupPageChild1">
                              <img src={Signup_img} alt="img" />
                         </div>
                         <div className="SignupPageChild2">
                              <Form onSubmit={handleSubmit}>
                                   <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                             name="name"
                                             type="text"
                                             placeholder="Enter name"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                             name="email"
                                             type="email"
                                             placeholder="Enter email"
                                             required
                                             onChange={handleInputs}
                                        />
                                        <Form.Text className="text-muted">
                                             We'll never share your email with
                                             anyone else.
                                        </Form.Text>
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Create password</Form.Label>
                                        <Form.Control
                                             name="password"
                                             type="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>
                                             Confirm password
                                        </Form.Label>
                                        <Form.Control
                                             name="cPassword"
                                             type="password"
                                             placeholder="Password"
                                             required
                                             onChange={handleInputs}
                                        />
                                   </Form.Group>

                                   <Button variant="primary" type="submit">
                                        Sign up
                                   </Button>
                              </Form>
                              <a onClick={ () => { navigate("/login")}}>Login instead?</a>
                         </div>
                    </div>
               </div>
          </>
     );
}
