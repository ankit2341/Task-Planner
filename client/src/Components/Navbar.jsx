import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { LoginSuccess, LogoutSuccess } from "../Providers/action";
import { toast, ToastContainer } from "react-toastify";

const NavbarMain = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.reducer.userData);

  const handleLogout = () => {
    toast.success("Logout Success!");
    dispatch(LogoutSuccess());
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
        style={{
          padding: "20px 20px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Container>
          <Navbar.Brand>Task Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Button
                style={{ marginRight: "10px" }}
                variant="light"
                onClick={() => setModalShow(true)}
              >
                Add Task
              </Button>
              {userData === "" ? (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded);
                    fetch(`${process.env.REACT_APP_API_URL}users`, {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({ data: decoded }),
                    })
                      .then((res) => {
                        return res.json();
                      })
                      .then((res) => {
                        toast.success("Login Success");
                        dispatch(LoginSuccess(res));
                      });
                  }}
                  onError={() => {
                    console.log("Login Failed");
                    toast.error("Login Failed!");
                  }}
                />
              ) : (
                <Button onClick={handleLogout} variant="light">
                  <img
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      height: "30px",
                    }}
                    src={userData.avatar}
                    alt=""
                  />
                  {userData.username}
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AddTaskModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default NavbarMain;
