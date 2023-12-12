import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CategoryCard from "../../Components/CategoryCard";
import "./CategoryPage.css";
import Modal from "react-bootstrap/Modal";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function NewCategoryModal(props) {
     const [CategoryName, setCategoryName] = useState("");

     const navigate = useNavigate();

     const updateCategoryName = (e) => {
          setCategoryName(e.target.value);
     };

     const addCategory = async (e) => {
          props.onHide();
          try {
               const dizkuzData = JSON.parse(
                    localStorage.getItem("dizkuzData")
               );
               const currentUser_ = JSON.parse(
                    localStorage.getItem("currentUser")
               );
               const OrgID = dizkuzData.currentOrganisation;
               const inp = {
                    name: currentUser_.name,
                    email: currentUser_.email,
                    password: currentUser_.password,
                    organisations: currentUser_.organisations,
                    User_id: currentUser_._id,
                    NAME: CategoryName,
                    ID: OrgID,
               };
               const response = await fetch(
                    "https://dizkuz-server.onrender.com/newCategory",
                    {
                         method: "POST",
                         body: JSON.stringify(inp),
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );
               const data = await response.json();
               if (data == null) {
                    props.setAlertHead("Category already exists!");
                    props.setAlertBody(
                         "A category with the same name in this organisation already exists. Please try making some changes in the name and then try again."
                    );
                    props.setAlertVarient("warning");
                    props.setAlertShow(true);
               } else if (data.status === "success") {
                    props.setAlertHead("Category Added successfully!");
                    props.setAlertBody(
                         "The category you just created has been added into the database. If you cannot find it, please try reloading the page."
                    );
                    props.setAlertVarient("success");
                    props.setAlertShow(true);
                    const redirectURL = "/categories";
                    localStorage.setItem(
                         "dizkuzredirectURL",
                         JSON.stringify(redirectURL)
                    );
                    navigate("/redirect");
               } else {
                    props.setAlertHead("Some unknown Error occured!");
                    props.setAlertBody(
                         "There was some unexpected error which prevented us to create the category you wanted. Please try again."
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
                         New Category
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <Form.Control
                         type="text"
                         placeholder="Enter category name"
                         value={CategoryName}
                         onChange={updateCategoryName}
                    />
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                         Cancel
                    </Button>
                    <Button variant="primary" onClick={addCategory}>
                         Create
                    </Button>
               </Modal.Footer>
          </Modal>
     );
}

export default function CategoryPage(props) {
     const navigate = useNavigate();

     const [alertHead, setAlertHead] = useState("");
     const [alertBody, setAlertBody] = useState("");
     const [alertVarient, setAlertVarient] = useState("");
     const [Alertshow, setAlertShow] = useState(false);
     const [modalShow, setModalShow] = React.useState(false);
     const [HtmlLoaded, setHtmlLoaded] = useState(false);
     const [orgName, setOrgName] = useState("Organization");
     const [CategoryComponent, setCategoryComponent] = useState(<></>);
     const [reloader, setreloader] = useState(false);

     const JumpToNewCategory = async (e) => {
          setModalShow(true);
     };

     const openMembers = () => {
          const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
          dizkuzData.currentCategory = props.id;
          dizkuzData.currentCategoryName = props.title;
          localStorage.removeItem("dizkuzData");
          localStorage.setItem("dizkuzData", JSON.stringify(dizkuzData));
          navigate("/members");
     };

     useEffect(() => {
          let currentUser_ = {};
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
                    setOrgName(dizkuzData.currentOrganisationName);
                    const inp = {
                         email: currentUser_.email,
                         password: currentUser_.password,
                         ID: OrgID,
                    };
                    const response = await fetch(
                         "https://dizkuz-server.onrender.com/categories",
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
                              "Due to some unexpected error, the organisation was not loaaded. Please try again."
                         );
                         setAlertVarient("danger");
                         setAlertShow(true);
                    } else {
                         const LoadedData = fetchData.data;
                         const Categories = LoadedData;
                         let tempVar;
                         if (Categories.length == 0) {
                              tempVar = (
                                   <div
                                        style={{
                                             paddingTop: "100px",
                                             paddingBottom: "50px",
                                             color: "darkred",
                                        }}
                                   >
                                        <h4>
                                             Sorry, No category exists in this
                                             organisation. Try adding a new
                                             category on your own.
                                        </h4>
                                   </div>
                              );
                         } else {
                              tempVar = Categories.map((category) => {
                                   return (
                                        <div>
                                             <CategoryCard
                                                  title={category.name}
                                                  id={category._id}
                                                  key={category._id}
                                             />
                                        </div>
                                   );
                              });
                         }
                         const tempCategoryComponent = tempVar;
                         setreloader(!reloader);
                         setCategoryComponent(tempCategoryComponent);
                         setHtmlLoaded(true);
                    }
               } catch (error) {
                    setAlertHead("Unexpected error occured!");
                    setAlertBody(
                         "Due to some unexpected error we were not able to get the categories for you. Please check your connection and try again..."
                    );
                    setAlertVarient("danger");
                    setAlertShow(true);
               }
          };
          doWork();
     }, [reloader]);

     return HtmlLoaded ? (
          Alertshow ? (
               <>
                    <NavBar />
                    <Alert
                         variant={alertVarient}
                         onClose={() => setAlertShow(false)}
                         dismissible
                    >
                         <Alert.Heading>{alertHead}</Alert.Heading>
                         <p>{alertBody}</p>
                    </Alert>
                    <div className="CategoryConainer">
                         <h3 style={{ textAlign: "center" }}>{orgName}</h3>
                         <hr />
                         <div className="OrganisationButton2">
                              <Button
                                   className="orgbtn_"
                                   variant="outline-primary"
                                   onClick={openMembers}
                              >
                                   Members
                              </Button>
                              <Button
                                   className="orgbtn_"
                                   variant="primary"
                                   onClick={JumpToNewCategory}
                              >
                                   New Category
                              </Button>
                         </div>
                         <div>{CategoryComponent}</div>
                    </div>
                    <NewCategoryModal
                         show={modalShow}
                         alertHead={alertHead}
                         alertBody={alertBody}
                         alertVarient={alertVarient}
                         Alertshow={Alertshow}
                         setAlertHead={setAlertHead}
                         setAlertBody={setAlertBody}
                         setAlertVarient={setAlertVarient}
                         setAlertShow={setAlertShow}
                         onHide={() => setModalShow(false)}
                    />
                    <Footer />
               </>
          ) : (
               <>
                    <NavBar />
                    <div
                         className="CategoryConainer"
                         style={{ paddingTop: "0px" }}
                    >
                         <h3 style={{ textAlign: "center" }}>{orgName}</h3>
                         <hr />
                         <div className="OrganisationButton2">
                              <Button
                                   className="orgbtn_"
                                   variant="outline-primary"
                                   onClick={openMembers}
                              >
                                   Members
                              </Button>
                              <Button
                                   className="orgbtn_"
                                   variant="primary"
                                   onClick={JumpToNewCategory}
                              >
                                   New Category
                              </Button>
                         </div>
                         <div>{CategoryComponent}</div>
                    </div>
                    <NewCategoryModal
                         show={modalShow}
                         alertHead={alertHead}
                         alertBody={alertBody}
                         alertVarient={alertVarient}
                         Alertshow={Alertshow}
                         setAlertHead={setAlertHead}
                         setAlertBody={setAlertBody}
                         setAlertVarient={setAlertVarient}
                         setAlertShow={setAlertShow}
                         onHide={() => setModalShow(false)}
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
