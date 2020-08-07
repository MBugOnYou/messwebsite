import React, { Component, Fragment } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  NavLink,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getToken, getUser } from "../Common/Common";

class HomePageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: 1,
      total: 0,
      per_page: 10,
      addmemberList: [],
      removeMemberList: [],
      user: getUser(),
      deleteshow: false,
      editshow: false,
      addshow: false,
      loading: true,
      selecteduser: "",
      Option: [],
      error: false,
      selectedItem: {
        id: 0,
        cost: 0,
        date: "",
        user_id: 0,
        yr_month: "",
        mess_name: "",
      },
      loggedin: false,
      access_token: "",
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    let isManager;

    if (this.state.user[0].manager == 1) {
      isManager = 1;
    } else {
      isManager = 0;
    }

    return (
      <Fragment>
        <Container>
          <br></br>

          <Row>
            <Col sm={12} md={4} lg={4}>
              <h3 className="text-center white">
                User name:- {this.state.user[0].name}
              </h3>
            </Col>

            <Col sm={12} md={4} lg={4}>
              <h3 className="text-center white">
                Mess name:- {this.state.user[0].mess_name}
              </h3>
            </Col>

            <Col sm={12} md={4} lg={4}>
              <h3 className="text-center white">
                Type:- {this.state.user[0].manager == 1 ? "Admin" : "User"}
              </h3>
            </Col>
          </Row>

          <br></br>
          <br></br>
          <Row>
            {isManager == 1 ? (
              <Col sm={12} md={4} lg={4}>
                <Card
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  style={{ width: "20rem" }}
                >
                  <Card.Body className="text-center">
                    <img
                      src="https://www.flaticon.com/premium-icon/icons/svg/3160/3160690.svg"
                      width="80"
                      height="80"
                      alt="React Bootstrap logo"
                    />
                    <br></br>

                    <Card.Title className="text-center">
                      <h4>Add/Remove Member</h4>
                    </Card.Title>

                    <br></br>
                    <Link
                      to="/AddOrRemoveMember"
                      className="btn btn-block btn-primary"
                    >
                      Go
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ) : null}
            {isManager == 1 ? (
              <Col sm={12} md={4} lg={4}>
                <Card
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  style={{ width: "20rem" }}
                >
                  <Card.Body className="text-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/550/550607.svg"
                      width="80"
                      height="80"
                      alt="React Bootstrap logo"
                    />
                    <Card.Title className="text-center">
                      <h3>Calculate meal</h3>
                    </Card.Title>
                    <br></br>

                    <Link
                      to="/CalculateMeal"
                      className="btn btn-block btn-primary"
                    >
                      Go
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ) : null}

            {isManager == 1 ? (
              <Col sm={12} md={4} lg={4}>
                <Card
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  style={{ width: "20rem" }}
                >
                  <Card.Body className="text-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/3004/3004164.svg"
                      width="80"
                      height="80"
                      alt="React Bootstrap logo"
                    />
                    <Card.Title className="text-center">
                      <h3>Daily Cost </h3>
                    </Card.Title>
                    <br></br>

                    <Link to="/DailyCost" className="btn btn-block btn-primary">
                      Go
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ) : null}
            {isManager == 1 ? (
              <Col sm={12} md={4} lg={4}>
                <Card
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  style={{ width: "20rem" }}
                >
                  <Card.Body className="text-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/3135/3135706.svg"
                      width="80"
                      height="80"
                      alt="React Bootstrap logo"
                    />
                    <Card.Title className="text-center">
                      <h3>Deposit Money</h3>
                    </Card.Title>
                    <br></br>

                    <Link to="/Deposit" className="btn btn-block btn-primary">
                      Go
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ) : null}
            <Col sm={12} md={4} lg={4}>
              <Card
                className="shadow-lg p-3 mb-5 bg-white rounded"
                style={{ width: "20rem" }}
              >
                <Card.Body className="text-center">
                  <img
                    src="https://image.flaticon.com/icons/svg/2413/2413874.svg"
                    width="80"
                    height="80"
                    alt="React Bootstrap logo"
                  />
                  <Card.Title className="text-center">
                    <h3>Previous Month </h3>
                  </Card.Title>
                  <br></br>

                  <Link
                    to="/PreviousMonth"
                    className="btn btn-block btn-primary"
                  >
                    Go
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12} md={4} lg={4}>
              <Card
                className="shadow-lg p-3 mb-5 bg-white rounded"
                style={{ width: "20rem" }}
              >
                <Card.Body className="text-center">
                  <img
                    src="https://www.flaticon.com/premium-icon/icons/svg/1047/1047467.svg"
                    width="80"
                    height="80"
                    alt="React Bootstrap logo"
                  />
                  <Card.Title className="text-center">
                    <h3>Total Meal </h3>
                  </Card.Title>
                  <br></br>

                  <Link to="/TotalMeal" className="btn btn-block btn-primary">
                    Go
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default HomePageContent;
