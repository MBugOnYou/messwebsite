import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import DailyCostContent from "../components/DailyCostContent/DailyCostContent";
import NavFooter from "../components/Footer/NavFooter";

class DailyCost extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <DailyCostContent></DailyCostContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default DailyCost;
