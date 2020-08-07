import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import NavFooter from "../components/Footer/NavFooter";
import CalculateMealContent from "../components/CalculateMealContent/CalculateMealContent";

class CalculateMeal extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <CalculateMealContent></CalculateMealContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default CalculateMeal;
