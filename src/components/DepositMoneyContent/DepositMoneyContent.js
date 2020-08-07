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

class DepositMoneyContent extends Component {

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
        this._onSelect = this._onSelect.bind(this)
       
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

    if(isAdmin==1) {
        this.getUserList();
        this.getAllDepositAmountFromServer();
    }else{

        //this.getAlldepositAmountByUserIDFromServer();
    }

  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ current_page: pageNumber });
    this.getDailyCostByMonth(pageNumber);
  }


  getUserList() {
    //this.setState({ loading: true });

 
    const mess = this.state.user[0].mess_name;


    let jsonObject = {
      mess_name: mess,
    };

    RestClient.PostRequest(
      AppUrl.getAllApprovedUserList,
      JSON.stringify(jsonObject)
    )
      .then((result) => {
        if (result == null || result.success == "0") {
          
        } else {
          this.setState({
            userlist: result.data,
          });

          
          
          if(this.state.userlist.length>0){
              for(let item of this.state.userlist){
                  console.log(item.name)
                  this.state.Option.push(item.name);
              }
              //this.state.defaultOption = this.state.Option[0];
              //this.setState({selecteduser: this.state.defaultOption})
          }


        }
      })
      .catch((error) => {
        
      });
  }


  _onSelect = (option)=>{
    console.log('You selected ', option)
    this.setState({selecteduser: option.label})
    console.log('You selected ', this.state.selecteduser)

  }


  // _onSelect (option) {
    
  //   //this.setState({selecteduser: option.value})
  //   //console.log('You selected ', this.state.selecteduser)

  // }


  getAlldepositAmountByUserIDFromServer(pageNumber = 1) {
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
      AppUrl.getDepositMoneyByYearMonthAndUserID + pageNumber,
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


  getAllDepositAmountFromServer(pageNumber = 1) {
    //this.setState({ loading: true });

    console.log(ThisMonthYear());

    const id = this.state.user[0].id;
    const mess = this.state.user[0].mess_name;

    console.log(id);
    console.log(mess);

    let jsonObject = {
      mess_name: mess,
      yr_month: ThisMonthYear(),
    };

    RestClient.PostRequest(
      AppUrl.getDepositMoneyByYearMonth + pageNumber,
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

  onAddDailyCost = (e) =>{

    e.preventDefault();

    let amount = document.getElementById("amount").value;

    if(this.state.selecteduser == ''){
      return this.errorToast("Please select user");
    }
    
    if (amount != null && amount.length == 0) {
        return this.errorToast("Please write deposit amount");
      }

     


//this.setState({ loading: true });

console.log(ThisMonthYear());

var id = 0;

if(this.state.userlist.length>0){
  for(let item of this.state.userlist){
      console.log(item.name)
      if(this.state.selecteduser == item.name){
        id=item.id;
      }
  }
  
}

const mess = this.state.user[0].mess_name;

console.log(id);
console.log(mess);

let jsonObject = {
  user_id: id,
  amount: amount,
  creation_date: TodayDate(),
  mess_name: mess,
  yr_month: ThisMonthYear(),
};

RestClient.PostRequest(
  AppUrl.createDepositMoney,
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

      this.successToast("Deposit Money added successfully");

      document.getElementById("amount").value = "";
      

     this.getAllDepositAmountFromServer();


    }
  })
  .catch((error) => {
    this.setState({ error: true, loading: false });
  });


  e.preventDefault();
 

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
                <td className="white">{myList1.amount}</td>
  
              </tr>
            );
          });
    
          return (
            <Fragment>
              <Container className="mt-5 mb-5">
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <Form>
                      <Row>
                      <Col>

          
                      <Dropdown options={this.state.Option} onChange={this._onSelect} value={defaultOption} placeholder="Select an user" />
                        </Col>
                        <Col>
                          <Form.Control  id="amount" type="text" placeholder="Write Amount" />
                        </Col>
                        <Col>
                        <Button variant="primary" onClick={this.onAddDailyCost}>Deposit Money</Button>
                        </Col>
                      </Row>
                    </Form>
                    <br></br>
    
                    <ToastContainer />
    
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                        <th className="darkorange">Name</th>
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

export default DepositMoneyContent;