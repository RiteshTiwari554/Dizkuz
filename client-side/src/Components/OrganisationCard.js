import React from "react";
import "./Components.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function OrganisationCard(prop) {
     const navigate = useNavigate();
     let currentUser_ = {};

     // modal
     const [show, setShow] = useState(false);

     const handleClose = () => {
          setShow(false);
     };
     const handleShow = () => {
          setShow(true);
     };
     const handleLeave = async (e) => {
          setShow(false);
          currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
          const out = {
               name: currentUser_.name,
               email: currentUser_.email,
               password: currentUser_.password,
               organisations: currentUser_.organisations,
               userId: currentUser_._id,
               organisationId: prop.id,
          };
          try {
               const response = await fetch("https://dizkuz-server.onrender.com/leaveOrg", {
                    method: "POST",
                    body: JSON.stringify(out),
                    headers: {
                         "Content-Type": "application/json",
                    },
               });
               const newOrgs = await response.json();
               if (newOrgs.process === "success") {
                    let curUser = {
                         name: newOrgs.user.name,
                         email: newOrgs.user.email,
                         password: newOrgs.user.password,
                         organisations: newOrgs.user.organisations,
                         messages: newOrgs.user.messages,
                         _id: newOrgs.user._id,
                         __v: newOrgs.user.__v,
                    };
                    localStorage.removeItem("currentUser");
                    localStorage.setItem(
                         "currentUser",
                         JSON.stringify(curUser)
                    );
                    // navigate("/organisations");
                    prop.setRerenderer(!prop.rerenderer);
                    const redirectURL = "/organisations";
                    localStorage.setItem(
                         "dizkuzredirectURL",
                         JSON.stringify(redirectURL)
                    );
                    navigate("/redirect");
               }
          } catch (error) {
               window.alert("Try again !");
               setShow(true);
          }
     };

     const openOrganisation = () => {
          const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
          dizkuzData.currentOrganisation = prop.id;
          dizkuzData.currentOrganisationName = prop.title;
          localStorage.removeItem("dizkuzData");
          localStorage.setItem("dizkuzData", JSON.stringify(dizkuzData));
          navigate("/categories");
     };
     const leaveOrganisation = () => {
          setShow(true);
     };

     return (
          <>
               <div className="OrganisationCardOuter">
                    <div className="OrganisationTitle">
                         {" "}
                         <h5>{prop.title}</h5>{" "}
                    </div>
                    <div className="OrganisationButtons">
                         <Button
                              className="orgbtn"
                              variant="outline-primary"
                              onClick={openOrganisation}
                         >
                              Open
                         </Button>
                         <Button
                              className="orgbtn"
                              variant="outline-danger"
                              onClick={leaveOrganisation}
                         >
                              Leave
                         </Button>
                    </div>
               </div>
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         Once you leave this, you won't be able to access it
                         ever again.
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Cancel
                         </Button>
                         <Button variant="danger" onClick={handleLeave}>
                              Leave
                         </Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
