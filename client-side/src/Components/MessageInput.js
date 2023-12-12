import React, { useState } from "react";
import "./Components.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function MessageInput(props) {
     const [message, setMessage] = useState("");

     const updateMessage = (e) => {
          setMessage(e.target.value);
     };

     const sendMessage = async () => {
          try {
               const dizkuzData = JSON.parse(
                    localStorage.getItem("dizkuzData")
               );
               const currentUser_ = JSON.parse(
                    localStorage.getItem("currentUser")
               );
               const IssID = dizkuzData.currentIssue;
               const inp = {
                    name: currentUser_.name,
                    email: currentUser_.email,
                    password: currentUser_.password,
                    User_id: currentUser_._id,
                    body: message,
                    IssueID: IssID,
               };
               const response = await fetch(
                    "https://dizkuz-server.onrender.com/sendmessage",
                    {
                         method: "POST",
                         body: JSON.stringify(inp),
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );
               const data = await response.json();
               if (data.status === "success") {
                    props.setChatReloader(props.chatReloader + 1);
                    setMessage("");
               } else {
                    props.setAlertHead("Some unknown Error occured!");
                    props.setAlertBody(
                         "There was some unexpected error which prevented the message to be sent. Please try again."
                    );
                    props.setAlertVarient("danger");
                    props.setAlertShow(true);
               }
          } catch (error) {
               props.setAlertHead("Unexpected Error occured!");
               props.setAlertBody(
                    "Could not send the message. Please check your connection and try again."
               );
               props.setAlertVarient("danger");
               props.setAlertShow(true);
          }
     };
     return (
          <div className="MessageInputBar">
               <div className="MessageBar">
                    <Form className="Inputmsg">
                         <Form.Control
                              type="text"
                              placeholder="Enter your message"
                              onChange={updateMessage}
                              value={message}
                         />
                    </Form>
                    <Button
                         className="sendBtn"
                         variant="outline-success"
                         onClick={sendMessage}
                    >
                         Send
                    </Button>
               </div>
          </div>
     );
}
