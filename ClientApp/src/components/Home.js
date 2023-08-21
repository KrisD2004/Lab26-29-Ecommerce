import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { ButtonToolbar } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="firstDiv">
                <h1>Welcome to Krisler </h1>
                <p>Welcome to your new favortie store!</p>

                <div className="secDivv">
                    <Container>
                        <Row>
                            <Col>
                                Groceries
                                Clothes
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                Electronics
                                Jewlery
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                Home Applicances
                                Instruments
                            </Col>
                        </Row>


                    </Container>
                </div>
                {/* 
                <div className="secDiv">
                    <Button outline color="primary">Groceries</Button>{' '}
                    <Button outline color="primary">Clothes</Button>{' '}
                    <Button outline color="primary">Jewelry</Button>{' '}
                    <Button outline color="primary">Eletronics</Button>{' '}
                    <Button outline color="primary">Home Applicances</Button>{' '}
                    <Button outline color="primary">Automotive</Button>{' '}

                    
                </div>
                */}

            </div>

        );
    }
}
