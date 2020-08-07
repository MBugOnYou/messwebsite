import React, { Component, Fragment } from "react";
import Navheader from "../components/Navheader/Navheader";
import AddOrRemoveContent from "../components/AddOrRemoveContent/AddOrRemoveContent";
import NavFooter from "../components/Footer/NavFooter";

class AddOrRemoveMember extends Component {
  render() {
    return (
      <Fragment>
        <Navheader></Navheader>
        <AddOrRemoveContent></AddOrRemoveContent>
        <NavFooter></NavFooter>
      </Fragment>
    );
  }
}

export default AddOrRemoveMember;
