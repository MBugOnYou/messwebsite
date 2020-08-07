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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class TotalMealContent extends Component {


    constructor(props) {
        super(props);
        this.state = {
          current_page: 1,
          total: 0,
          per_page: 10,
          data: [],
          userlist: [],
          user: getUser(),
          deleteshow: false,
          editshow: false,
          addshow: false,
          loading: true,
          selecteduser: '',
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
        const isAdmin = this.state.user[0].manager;
    
        if(isAdmin==0) {
           
            this.getTotalMealByMonthAndUserID();

        }else{
    
            this.getTotalMealByMonth();
        }
    
      }


      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ current_page: pageNumber });
        this.getDailyCostByMonth(pageNumber);
      }

      getTotalMealByMonthAndUserID(pageNumber = 1) {
        //this.setState({ loading: true });
    
        console.log(ThisMonthYear());
    
        const id = this.state.user[0].id;
        const mess = this.state.user[0].mess_name;
    
        console.log(id);
        console.log(mess);
    
        let jsonObject = {
          mess_name: mess,
          user_id:id,
          yr_month: ThisMonthYear(),
        };
    
        RestClient.PostRequest(
          AppUrl.getTotalMealByMonthAndUserID + pageNumber,
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


      getTotalMealByMonth(pageNumber = 1) {
        //this.setState({ loading: true });
    
        console.log(ThisMonthYear());
    
        const id = this.state.user[0].id;
        const mess = this.state.user[0].mess_name;
    
        console.log(id);
        console.log(mess);
    
        let jsonObject = {
          mess_name: mess,
          user_id:id,
          yr_month: ThisMonthYear(),
        };
    
        RestClient.PostRequest(
          AppUrl.getTotalMealByMonth + pageNumber,
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


      render() {
        const defaultOption = this.state.selecteduser

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
                <td className="white">{myList1.creation_date}</td>
                <td className="white">{myList1.total_meal}</td>
  
              </tr>
            );
          });
    
          return (
            <Fragment>
              <Container className="mt-5 mb-5">
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    
                    <br></br>
    
                    <ToastContainer />
    
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                        <th className="darkorange">Name</th>
                          <th className="darkorange">Date</th>
                          <th className="darkorange">Total Meal</th>
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

export default TotalMealContent;