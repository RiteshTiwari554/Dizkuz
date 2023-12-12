import React from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrganisationsPage from "./Pages/OrganisationsPage/OrganisationsPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import IssuePage from "./Pages/IssuePage/IssuePage";
import ChatPage from "./Pages/ChatPage/ChatPage";
import NewOrganisationPage from "./Pages/NewOrganisationPage/NewOrganisationPage";
import Redirect from "./Components/Redirect";
import MembersPage from "./Pages/MembersPage/MembersPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";

function App() {
     return (
          <Router>
               <div className="App">
                    <Routes>
                         <Route path="/" element={<HomePage />} />
                         <Route
                              path="/organisations"
                              element={<OrganisationsPage />}
                         />
                         <Route path="/categories" element={<CategoryPage />} />
                         <Route path="/chats" element={<ChatPage />} />
                         <Route path="/issues" element={<IssuePage />} />
                         <Route
                              path="/neworganisation"
                              element={<NewOrganisationPage />}
                         />
                         <Route path="/members" element={<MembersPage />} />
                         <Route path="/aboutus" element={<AboutUsPage />} />
                         <Route path="/landing" element={<LandingPage />} />
                         <Route path="/login" element={<LoginPage />} />
                         <Route path="/signup" element={<SignupPage />} />
                         <Route path="/redirect" element={<Redirect />} />
                    </Routes>
               </div>
          </Router>
     );
}

export default App;
