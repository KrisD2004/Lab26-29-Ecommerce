import React, { Component, useEffect } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import { ButtonToolbar } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';



export function Home() {


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadingData() {
            var response = await axios.get("https://localhost:7261/categories").then(res => {
                //console.log(res.data)
                setCategories(res.data)
            });
        }
        loadingData();
    }, [categories]);



    var categoriesHTML = categories.map((element) => {

        return (
            <Row key={element.id }>
                <Col>
                    <Link to={`/${element.name}`}>
                        {element.name}
                    </Link>
                </Col>

            </Row>
        )

    })


    return (
        <div className="firstDiv">
            <h1>Welcome to Kris Sto </h1>
            <p>Welcome to your new favortie store!</p>

            <div className="secDivv">
                <Container>
                    {categoriesHTML}
                </Container>
            </div>
        </div>

    );

}
