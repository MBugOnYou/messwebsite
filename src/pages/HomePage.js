import React, { Component, Fragment } from 'react';
import Navheader from '../components/Navheader/Navheader';

import HomePageContent from '../components/HomePageContent/HomePageContent';
import NavFooter from '../components/Footer/NavFooter';
import { getUser } from '../components/Common/Common';



class HomePage extends Component {





    render() {




        return (
            <Fragment>
            <Navheader></Navheader>
            <HomePageContent></HomePageContent>
            <NavFooter></NavFooter>

            
        </Fragment>
        );
    }
}

export default HomePage;