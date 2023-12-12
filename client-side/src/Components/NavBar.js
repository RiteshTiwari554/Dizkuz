import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {
     MDBContainer,
     MDBNavbar,
     MDBNavbarBrand,
     MDBNavbarToggler,
     MDBIcon,
     MDBNavbarNav,
     MDBNavbarItem,
     MDBNavbarLink,
     MDBCollapse,
} from "mdb-react-ui-kit";

export default function NavBar() {
     const [showBasic, setShowBasic] = useState(false);

     const navigate = useNavigate();
     const logout = async () => {
          await localStorage.removeItem("currentUser");
          navigate("/landing");
     };

     return (
          <div className="NavBarC">
               <MDBNavbar expand="lg" dark bgColor="dark">
                    <MDBContainer fluid>
                         <MDBNavbarBrand href="/">Dizkuz</MDBNavbarBrand>
                         <MDBNavbarToggler
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                              onClick={() => setShowBasic(!showBasic)}
                         >
                              <MDBIcon icon="bars" fas />
                         </MDBNavbarToggler>
                         <MDBCollapse navbar show={showBasic}>
                              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                                   <MDBNavbarItem>
                                        <MDBNavbarLink onClick={ () => { navigate("/organisations")}}>
                                             Organisations
                                        </MDBNavbarLink>
                                   </MDBNavbarItem>

                                   <MDBNavbarItem>
                                        <MDBNavbarLink onClick={ () => { navigate("/aboutus")}}>
                                             About us
                                        </MDBNavbarLink>
                                   </MDBNavbarItem>
                              </MDBNavbarNav>
                              <form className="d-flex input-group w-auto">
                                   <Button
                                        variant="outline-light"
                                        style={{ width: "100px" }}
                                        onClick={logout}
                                   >
                                        Log out
                                   </Button>{" "}
                              </form>
                         </MDBCollapse>
                    </MDBContainer>
               </MDBNavbar>
          </div>
     );
}
