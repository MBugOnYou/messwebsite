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

class DailyCostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: 1,
      total: 0,
      per_page: 10,
      data: [],
      user: getUser(),
      deleteshow: false,
      editshow: false,
      addshow: false,
      loading: true,
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
    this.getDailyCostByMonth();
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ current_page: pageNumber });
    this.getDailyCostByMonth(pageNumber);
  }

  getDailyCostByMonth(pageNumber = 1) {
    //this.setState({ loading: true });

    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    console.log(id);
    console.log(mess);

    let jsonObject = {
      user_id: id,
      mess_name: mess,
      yr_month: ThisMonthYear(),
    };

    RestClient.PostRequest(
      AppUrl.getDailyCostByMonthAndUserID + pageNumber,
      JSON.stringify(jsonObject)
    )
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


    onAddDailyCost = (e) =>{

        e.preventDefault();
    
        let amount = document.getElementById("amount").value;

        if (amount != null && amount.length == 0) {
            return this.errorToast("Please write daily cost");
          }


    //this.setState({ loading: true });

    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    console.log(id);
    console.log(mess);

    let jsonObject = {
      user_id: id,
      cost: amount,
      date: TodayDate(),
      mess_name: mess,
      yr_month: ThisMonthYear(),
    };

    RestClient.PostRequest(
      AppUrl.createDailyCost,
      JSON.stringify(jsonObject)
    )
      .then((result) => {
        if (result == null || result.success == "0") {
          this.setState({ error: false, loading: false });
          this.errorToast("Daily cost added failed");
        } else {
           
          this.setState({
            loading: false,
            error: false,
          });

          this.successToast("Daily cost added successfully");

         

         this.getDailyCostByMonth();


        }
      })
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });


      e.preventDefault();
     

    }



  render() {
    if (getToken() == null) {
      return <Redirect to="/login"></Redirect>;
    } else if (this.state.loading == true) {
      return <Loading></Loading>;
    } else if (this.state.error == false) {
      const mylist = this.state.data;
      const myview = mylist.map((myList1) => {
        return (
          <tr>
            <td className="white">{myList1.date}</td>
            <td className="white">{myList1.cost}</td>

            {/* <td className="text-center">
                    <Button
                      onClick={this.editRow.bind(this, myList1)}
                      variant="primary"
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button
                      onClick={this.deleteRow.bind(this, myList1)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td> */}
          </tr>
        );
      });

      return (
        <Fragment>
          <Container className="mt-5 mb-5">
            <Row >
              <Col sm={12} md={12} lg={12}>
                <Form>
                  <Row>
                    <Col>
                      <Form.Control  id="amount" type="text" placeholder="Write Amount" />
                    </Col>
                    <Col>
                    <Button variant="primary" onClick={this.onAddDailyCost}>Add Cost</Button>
                    </Col>
                  </Row>
                </Form>
                <br></br>

                <ToastContainer />

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="darkorange">Date</th>
                      <th className="darkorange">Amount</th>
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

export default DailyCostContent;
