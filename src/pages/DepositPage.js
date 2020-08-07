import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import DepositMoneyContent from "../components/DepositMoneyContent/DepositMoneyContent";
import NavFooter from "../components/Footer/NavFooter";

class DepositPage extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <DepositMoneyContent></DepositMoneyContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default DepositPage;
