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
import YearMonthPicker from "react-year-month-picker";
import MonthYearPicker from "react-month-year-picker";
import YearPicker from "react-year-picker";
import MonthPickerInput from "react-month-picker-input";
import "react-month-picker-input/dist/react-month-picker-input.css";

import MonthPicker from "@9softstudio/react-monthpicker";

import "@9softstudio/react-monthpicker/dist/reactmonthpicker.css";
import GetMonthName from "../Common/GetMonthName";

class CalculateMealContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduled: null,
      current_page: 1,
      month: 12,
      year: 2018,
      total: 0,
      per_page: 10,
      data: [],
      dailyMealArrayList: [],
      depositAmountArrayList: [],
      userInfoArrayList: [],
      userlist: [],
      user: getUser(),
      deleteshow: false,
      editshow: false,
      addshow: false,
      loading: false,
      selecteduser: "",
      yearMonth: "",
      Option: [],
      error: false,

      TotalCostServer: "",
      TotalmealServer: "",
      Month: "",
      MillRateServer: 0,
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

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ current_page: pageNumber });
    this.getAllPreviousMontdataFromServer(pageNumber);
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
    this.getAllPreviousMontdataFromServer();
    this.getTotalDailyCostByMonth();
  }

  getTotalDailyCostByMonth() {
    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    const isAdmin = this.state.user[0].manager;

    var url = "";

    url = AppUrl.getTotalDailyCostByMonth;

    console.log(id);
    console.log(mess);

    let jsonObject = {
      mess_name: mess,
      user_id: id,
      yr_month: ThisMonthYear(),
    };

    RestClient.PostRequest(url, JSON.stringify(jsonObject))
      .then((result) => {
        if (result == null || result.success == "0") {
          console.log("data" + this.state.dailyMealArrayList);
        } else {
          console.log(
            "datafgdfgfgdffghdfhdfghdfgshfgshfgsthfsghfgshfghfghfghfgsh" +
              this.state.dailyMealArrayList
          );

          var millRate = 0;

          if (result.totalmeal != null && result.totalmeal != 0) {
            millRate = result.totalCost / result.totalmeal;
          }

          this.setState({
            dailyMealArrayList: result.userMealList,
            depositAmountArrayList: result.userDepositList,
            TotalCostServer: result.totalCost,
            TotalmealServer: result.totalmeal,
            userInfoArrayList: result.approveuserList,
            MillRateServer: millRate,
            loading: false,
            error: false,
          });

          console.log("data" + this.state.dailyMealArrayList);
        }
      })
      .catch((error) => {
        console.log("data" + this.state.dailyMealArrayList);
      });
  }

  getAllPreviousMontdataFromServer(pageNumber = 1) {
    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    const isAdmin = this.state.user[0].manager;

    var url = "";

    url = AppUrl.getPreviousMonthByMonth;

    console.log(id);
    console.log(mess);

    let jsonObject = {
      mess_name: mess,
      user_id: id,
      yr_month: ThisMonthYear(),
    };

    RestClient.PostRequest(url + pageNumber, JSON.stringify(jsonObject))
      .then((result) => {
        if (result == null || result.success == "0") {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({
            data: result.data.data,
            total: result.data.total,
            per_page: result.data.per_page,
            loading: false,
            error: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    const defaultOption = this.state.selecteduser;

    if (getToken() == null) {
      return <Redirect to="/login"></Redirect>;
    } else if (this.state.loading == true) {
      return <Loading></Loading>;
    } else if (this.state.error == false) {
      const mylist = this.state.data;
      const myview = mylist.map((myList1) => {
        return (
          <tr>
            <td className="white">{myList1.name}</td>
            <td className="white">{myList1.meal_rate}</td>
            <td className="white">{myList1.total_deposit}</td>
            <td className="white">{myList1.total_cost}</td>
            <td className="white">{myList1.extra_money}</td>
            <td className="white">{myList1.given_money}</td>
          </tr>
        );
      });

      return (
        <Fragment>
          <Container className="mt-5 mb-5">
            <Row>
              <Col className="text-center" sm={12} md={12} lg={6}>
                <h5 className="white">Total Cost:- {this.state.TotalCostServer}</h5>
                <h5 className="white">Month:- {ThisMonthYear()}</h5>
                <h5 className="white">Total Meal:- {this.state.TotalmealServer}</h5>
                <h5 className="white">Mill Rate:- {Math.round(this.state.MillRateServer)}</h5>
              </Col>

              <Col sm={12} md={12} lg={6}>
                <Button variant="primary" onClick={this.onAddDailyCost}>
                  Upload Meal Rate
                </Button>
              </Col>
            </Row>

            <br></br>
            <br></br>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <ToastContainer />

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="darkorange">Name</th>
                      <th className="darkorange">MealRate</th>
                      <th className="darkorange">Deposit</th>
                      <th className="darkorange">Cost</th>
                      <th className="darkorange">Extra</th>
                      <th className="darkorange">Give</th>
                    </tr>
                  </thead>
                  <tbody>{myview}</tbody>
                </Table>

                <Pagination
                  activePage={this.state.current_page}
                  itemsCountPerPage={this.state.per_page}
                  totalItemsCount={this.state.total}
                  pageRangeDisplayed={10}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                  nextPageText="Next"
                  prevPageText="Prev"
                  onChange={this.handlePageChange.bind(this)}
                />
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
  }
}

export default CalculateMealContent;
