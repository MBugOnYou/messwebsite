import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';

class NavFooter extends Component {
    render() {
        return (
          <Fragment>
            <Container fluid={true} className="text-center footer dark">
              <p className="footertext">Copyright @Mess Managment 2020</p>
            </Container>
          </Fragment>
        );
      }
}

export default NavFooter;