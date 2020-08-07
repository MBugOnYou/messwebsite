import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import TotalMealContent from "../components/TotalMealContent/TotalMealContent";
import NavFooter from "../components/Footer/NavFooter";

class TotalMeal extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <TotalMealContent></TotalMealContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default TotalMeal;
