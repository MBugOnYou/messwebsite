import React, { Component, Fragment } from "react";
import loading from '../../asset/image/loading.svg'
import { Container, Row, Col } from "react-bootstrap";

class Loading extends Component {
  render() {
    return (
      <Fragment>
        <Container className="text-center centered">
          <Row>
            <Col>
              <img className="loaderanimation" src={loading}></img>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Loading;
