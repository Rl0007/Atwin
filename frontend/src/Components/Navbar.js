import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Soccer from "../Assets/SportsIcons/football.png";
import basketball from "../Assets/SportsIcons/basketball.png";
import cricket from "../Assets/SportsIcons/cricket.png";
import judo from "../Assets/SportsIcons/judo.png";
import ping_pong from "../Assets/SportsIcons/ping-pong.png";
import "./Navbar.css";
import Button from "react-bootstrap/esm/Button";
import { useContext, useState } from "react";
import AuthContext from "../Assets/Context/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function NavbarComponent() {
  const navigate = useNavigate();
  let { user, user_details, logoutUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary " expanded={expanded}>
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          Score Snap
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <img src={Soccer} className="SportsIcon" />
              &nbsp; Soccer
            </Nav.Link>
            <Nav.Link href="#home">
              <img src={basketball} className="SportsIcon" />
              &nbsp; Basketball
            </Nav.Link>{" "}
            <Nav.Link href="#home">
              <img src={cricket} className="SportsIcon" />
              &nbsp; Cricket
            </Nav.Link>{" "}
            <Nav.Link href="#home">
              <img src={judo} className="SportsIcon" />
              &nbsp; Judo
            </Nav.Link>{" "}
            <Nav.Link href="#home">
              <img src={ping_pong} className="SportsIcon" />
              &nbsp; Ping Pong
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                title={user === null ? "User" : user_details?.name}
                id="basic-nav-dropdown"
                className="user_dropdown"
              >
                {user ? (
                  <Nav.Link
                    onClick={() => {
                      logoutUser();
                      window.location.reload();
                    }}
                  >
                    {" "}
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    {" "}
                    Login
                  </Nav.Link>
                )}
                {user_details?.is_staff ? (
                  <>
                    <NavDropdown title="Upload" drop="start">
                      <NavDropdown.Item
                        onClick={() => {
                          navigate("/Upload");
                        }}
                      >
                        Table Tennis
                      </NavDropdown.Item>
                      <NavDropdown.Item>Soccer</NavDropdown.Item>
                      <NavDropdown.Item>Basketball</NavDropdown.Item>
                      <NavDropdown.Item>Cricket</NavDropdown.Item>
                      <NavDropdown.Item>Judo</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  ""
                )}
              </NavDropdown>
            ) : (
              <Button
                variant="outline-dark login_button"
                // size="lg"
                onClick={() => {
                  setExpanded(false);

                  navigate("/login");
                }}
              >
                Login/Register
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
