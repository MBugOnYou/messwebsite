import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import PreviousMonthContent from "../components/PreviousMonthContent/PreviousMonthContent";
import NavFooter from "../components/Footer/NavFooter";

class PreviousMonth extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <PreviousMonthContent></PreviousMonthContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default PreviousMonth;
