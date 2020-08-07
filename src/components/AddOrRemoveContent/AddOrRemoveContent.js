import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { getToken, getUser } from "../Common/Common";
import RestClient from "../RestApi/RestClient";
import AppUrl from "../RestApi/AppUrl";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router";
import Loading from "../Loading/Loading";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import ThisMonthYear from "../Common/ThisMonthYear";
import TodayDate from "../Common/TodayDate";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class AddOrRemoveContent extends Component {
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
    });

  componentDidMount() {
    window.scroll(0, 0);
    this.getAllUserApproveStatus(0);
    this.getAllUserApproveStatus(1);
  }

  getAllUserApproveStatus(isAddmember) {
    //this.setState({ loading: true });

    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    let jsonObject = {
      mess_name: mess,
      approve: isAddmember,
    };

    RestClient.PostRequest(
      AppUrl.getAllUserApproveStatus,
      JSON.stringify(jsonObject)
    )
      .then((result) => {
        if (result == null || result.success == "0") {
          this.setState({ error: false, loading: false });

          if (isAddmember == 0) {
            this.setState({
              addmemberList: [],

              loading: false,
              error: false,
            });
          } else {
            this.setState({
              removeMemberList: [],

              loading: false,
              error: false,
            });
          }
        } else {
          if (isAddmember == 0) {
            this.setState({
              addmemberList: result.data,

              loading: false,
              error: false,
            });
          } else {
            this.setState({
              removeMemberList: result.data,

              loading: false,
              error: false,
            });
          }
        }
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  }

  RemoveMember = (data) => {
    let jsonObject = {
      id: data.id,
      mess_name: data.mess_name,
      manager: data.manager,
      approve: 0,
    };

    RestClient.PostRequest(
      AppUrl.updateUserInfoModel,
      JSON.stringify(jsonObject)
    )
      .then((result) => {
        if (result == null || result.success == "0") {
          this.setState({ error: false, loading: false });
        } else {
          this.getAllUserApproveStatus(0);
          this.getAllUserApproveStatus(1);
        }
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  };

  AddMember = (data) => {
    let jsonObject = {
      id: data.id,
      mess_name: data.mess_name,
      manager: data.manager,
      approve: 1,
    };

    RestClient.PostRequest(
      AppUrl.updateUserInfoModel,
      JSON.stringify(jsonObject)
    )
      .then((result) => {
        if (result == null || result.success == "0") {
          this.setState({ error: false, loading: false });
        } else {
          this.getAllUserApproveStatus(0);
          this.getAllUserApproveStatus(1);
        }
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  };

  render() {
    const defaultOption = this.state.selecteduser;

    if (getToken() == null) {
      return <Redirect to="/login"></Redirect>;
    } else if (this.state.loading == true) {
      return <Loading></Loading>;
    } else if (this.state.error == false) {
      const mylist = this.state.addmemberList;
      const myview = mylist.map((myList1) => {
        return (
          <tr>
            <td className="white">{myList1.name}</td>

            <td className="text-center">
              <Button
                onClick={this.AddMember.bind(this, myList1)}
                variant="success"
              >
                Add
              </Button>
            </td>
          </tr>
        );
      });

      const mylist1 = this.state.removeMemberList;
      const myview1 = mylist1.map((myList1) => {
        return (
          <tr>
            <td className="white">{myList1.name}</td>
            <td className="text-center">
              <Button
                onClick={this.RemoveMember.bind(this, myList1)}
                variant="danger"
              >
                Remove
              </Button>
            </td>
          </tr>
        );
      });

      return (
        <Fragment>
          <Container className="mt-5 mb-5">
            <Row>
              <Col sm={12} md={6} lg={6}>
                <ToastContainer />

                <h3 className="white">Add Member List</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="darkorange">Name</th>
                    </tr>
                  </thead>
                  <tbody>{myview}</tbody>
                </Table>
              </Col>

              <Col sm={12} md={6} lg={6}>
                <h3 className="white">Remove Member List</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="darkorange">Name</th>
                    </tr>
                  </thead>
                  <tbody>{myview1}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  }
}

export default AddOrRemoveContent;
