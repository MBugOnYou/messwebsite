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
import RestClient from "../components/RestApi/RestClient";
import AppUrl from "../components/RestApi/AppUrl";
import { setUserSession, getToken } from "../components/Common/Common";
import '../css/custom.css'

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      mydata: [],
      loading: false,
      error: false,
      message: "",
      loggedin: false,
    };

    this.OnRegister = this.OnRegister.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
    //removeUserSession();
  }

  errorToast = (a) =>
    toast.error("🦄 " + a, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  successToast = (a) =>
    toast.success("🦄 " + a, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      logout: false,
    });

  onLoginClick = (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email != null && email.length == 0) {
      return this.errorToast("Please write email address");
    }

    if (password != null && password.length == 0) {
      return this.errorToast("Please write password");
    }

    this.setState({ loading: true });

    let jsonObject = { mail: email, password: password };
    console.log(jsonObject);
    RestClient.PostRequest(AppUrl.login, JSON.stringify(jsonObject))
      .then((result) => {
        console.log(result);
        if (result == null) {
          this.setState({ error: true, loading: false, loggedin: false });
        } else if (result.success == "0") {
          this.setState({ error: false, loading: false, loggedin: false });
          this.setState({ message: "No account found on server" });
          this.errorToast("No account found on server");
          // alert("No account found on server");
        } else {
          this.setState({ mydata: result.data, loading: false, error: false });
          this.successToast("Logged in Successfully");
          setUserSession(result.data, result.data);
          // this.props.history.push("/home");
          //<Redirect to="/login"></Redirect>
          this.setState({ message: "Logged in Successfully" });

          this.setState({ loggedin: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true, loading: false });
      });

    e.preventDefault();
  };

  OnRegister = () => {
    console.log("clicked");

    return <Redirect to="/Register"></Redirect>;
  };

  render() {
    if (getToken() != null) {
      return <Redirect to="/"></Redirect>;
    } else if (this.state.loggedin == true) {
      return <Redirect to="/"></Redirect>;
    } else {
      return (
        <Fragment>
          {/* <h1 className="text-center mt-5 logintext">Speaking Audios</h1> */}

          {/* <Typical
                steps={["Hello", 1000, "Hello world!", 500]}
                loop={Infinity}
                wrapper="p"
              /> */}
          <Container className="centered">
            <Row >
              <Col sm={12} md={12} lg={12}>
                <ToastContainer />
                <Card
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  style={{ width: "25rem" }}
                >
                  <Card.Body>
                    <Card.Title>
                      <h3>Mess Managment</h3>
                    </Card.Title>
                    <br></br>
                    <Form onSubmit={this.onLoginClick}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          id="email"
                          type="text"
                          placeholder="Enter your email"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                        />
                      </Form.Group>
                      <Button
                        className="btn-block"
                        type="submit"
                        variant="primary"
                      >
                        Login
                      </Button>
                    </Form>

                    <br></br>
                    <h5 className="darkorange">Don't you have account?</h5>

                    {/* <Button
                      className="btn-block"
                      variant="primary"
                      onClick={this.OnRegister.bind(this)}
                    >
                      Register
                    </Button> */}

                    <Link to="/Register" className="btn btn-block btn-primary">
                    Register
                    </Link>
                  </Card.Body>
                </Card>

                <h1 className="darkorange text-center">{this.state.message}</h1>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  }
}

export default LoginPage;
