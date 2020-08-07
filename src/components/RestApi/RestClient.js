import React, { Component } from 'react';
import axios from "axios";
class RestClient  {



    // static GetRequest(getUrl) {
    //     return axios
    //        .get(getUrl)
    //        .then(function (response) {
    //          // handle success
    //          console.log(response);
     
    //          return response.data;
    //        })
    //        .catch(function (error) {
    //          // handle error
    //          console.log(error);
    //          return null;
    //        });
    //    }


    static PostRequest(postURL,postJsondata) {

        let config={
          headers: {'Content-Type': 'application/x-www-form-urlencoded',}
      }
    
      console.log(postURL)
      console.log(postJsondata)
    
        return axios
           .post(postURL,postJsondata,config)
           .then(function (response) {
             // handle success
             console.log(response);
     
             return response.data;
           })
           .catch(function (error) {
             // handle error
             console.log(error);
             return null;
           });
       }




    
}

export default RestClient;