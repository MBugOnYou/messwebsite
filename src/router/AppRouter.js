import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddOrRemoveMember from "../pages/AddOrRemoveMember";
import CalculateMeal from "../pages/CalculateMeal";
import DailyCost from "../pages/DailyCost";
import DepositPage from "../pages/DepositPage";
import LoginPage from "../pages/LoginPage";
import PreviousMonth from "../pages/PreviousMonth";
import RegisterPage from "../pages/RegisterPage";
import TotalMeal from "../pages/TotalMeal";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Fragment>
            <Switch>
            <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
            <Route exact path="/AddOrRemoveMember" component={AddOrRemoveMember}></Route>
            <Route exact path="/CalculateMeal" component={CalculateMeal}></Route>
            <Route exact path="/DailyCost" component={DailyCost}></Route>
            <Route exact path="/Deposit" component={DepositPage}></Route>
            <Route exact path="/Login" component={LoginPage}></Route>
            <Route exact path="/PreviousMonth" component={PreviousMonth}></Route>
            <Route exact path="/Register" component={RegisterPage}></Route>
            <Route exact path="/TotalMeal" component={TotalMeal}></Route>




            </Switch>
            
        </Fragment>
    );
};

export default AppRouter;