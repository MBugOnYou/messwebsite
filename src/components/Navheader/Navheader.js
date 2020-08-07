import React, { Component, Fragment } from "react";
import { Navbar, Nav, NavDropdown, Button, NavItem } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import { removeUserSession, getToken, getUser } from "../Common/Common";
class Navheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      user: getUser(),
    };
  }

  logout = () => {
    removeUserSession();
    this.setState({ logout: true });
  };

  render() {
    let isManager;

    if (this.state.user[0].manager == 1) {
      isManager = 1;
    } else {
      isManager = 0;
    }

    if (this.state.logout == true) {
      return <Redirect to="/login"></Redirect>;
    } else {
      return (
        <Fragment>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                src="https://image.flaticon.com/icons/svg/1055/1055646.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav className="mr-auto justify-content-center">
              <Nav.Link>
                <NavLink exact activeStyle={{ color: "white" }} to="/">
                  Home
                </NavLink>
              </Nav.Link>

              {isManager == 1 ? (
                <Nav.Link>
                  <NavLink
                    exact
                    activeStyle={{ color: "white" }}
                    to="/AddOrRemoveMember"
                  >
                    AddOrRemoveMember
                  </NavLink>
                </Nav.Link>
              ) : null}

              {isManager == 1 ? (
                <Nav.Link>
                  <NavLink
                    exact
                    activeStyle={{ color: "white" }}
                    to="/CalculateMeal"
                  >
                    CalculateMeal
                  </NavLink>
                </Nav.Link>
              ) : null}

              {isManager == 1 ? (
                <Nav.Link>
                  <NavLink
                    exact
                    activeStyle={{ color: "white" }}
                    to="/DailyCost"
                  >
                    DailyCost
                  </NavLink>
                </Nav.Link>
              ) : null}

        

              {isManager == 1 ? (
                <Nav.Link>
                  <NavLink exact activeStyle={{ color: "white" }} to="/Deposit">
                    Deposit Money
                  </NavLink>
                </Nav.Link>
              ) : null}

              <Nav.Link>
                <NavLink exact activeStyle={{ color: "white" }} to="/PreviousMonth">
                Previous Month
                </NavLink>
              </Nav.Link>

              <Nav.Link>
                <NavLink exact activeStyle={{ color: "white" }} to="/TotalMeal">
                Total Meal
                </NavLink>
              </Nav.Link>

              <NavItem>
                <Button color="light" onClick={this.logout}>
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
        </Fragment>
      );
    }
  }
}

export default Navheader;
