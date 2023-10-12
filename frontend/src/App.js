import logo from "./logo.svg";
import "./App.css";

import NavbarComponent from "./Components/Navbar";
import { AuthProvider } from "./Assets/Context/AuthContext";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MatchPage from "./Pages/MatchPage";
import SignupPage from "./Pages/SignupPage";
import UploadPage from "./Pages/UploadPage";
import PrivateRoute from "./Assets/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/match/:id" element={<MatchPage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<SignupPage />} />
          <Route path="/reset_password" element={<SignupPage />} />
          <Route path="/activate/:uid/:token" element={<SignupPage />} />
          <Route
            path="/reset_password_confirm/:uid/:token"
            element={<SignupPage />}
          />
          <Route path="/send_reset_password_link" element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/upload" element={<UploadPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
