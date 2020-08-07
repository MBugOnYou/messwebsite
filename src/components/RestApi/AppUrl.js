import React, { Component } from "react";

class AppUrl {

  static baseUrl = "http://saifulcse.tk/siteapitest/";
  //static baseUrl = "https://siteapi.sptv.info/";

   static login= this.baseUrl +"onLogin";
   static signup= this.baseUrl+"createUserInfoModel";
   static  updateUserInfoModel = this.baseUrl+"updateUserInfoModel";
   static  createDailyMeal = this.baseUrl+"createDailyMeal";
   static  getDailyMealByDate = this.baseUrl+"getDailyMealByDate";
   static  getAllUserApproveStatus = this.baseUrl+"getAllUserApproveStatus";
   static  getAllApprovedUserList = this.baseUrl+"getAllApprovedUserList";
   static  createDepositMoney = this.baseUrl+"createDepositMoney";
   static  getDepositMoneyByYearMonth = this.baseUrl+"getDepositMoneyByYearMonth?page=";
   static  getDepositMoneyByYearMonthAndUserID = this.baseUrl+"getDepositMoneyByYearMonthAndUserID";
   static   getTotalDailyMealByDate = this.baseUrl+"getTotalDailyMealByDate";
   static   getTotalMealByMonthAndUserID = this.baseUrl+"getTotalMealByMonthAndUserID?page=";
   static   getTotalMealByMonth = this.baseUrl+"getTotalMealByMonth?page=";
   static   getAllMessList = this.baseUrl+"getAllMessList";
   static   createDailyCost = this.baseUrl+"createDailyCost";
   static   getDailyCostByMonthAndUserID = this.baseUrl+"getDailyCostByMonthAndUserID?page=";
   static   getTotalDailyCostByMonth = this.baseUrl+"getTotalDailyCostByMonth";
   static   createPreviousMonth = this.baseUrl+"createPreviousMonth";
   static   getPreviousMonthByMonth = this.baseUrl+"getPreviousMonthByMonth?page=";
   static   getPreviousMonthByUserID = this.baseUrl+"getPreviousMonthByUserID?page=";


}

export default AppUrl;
