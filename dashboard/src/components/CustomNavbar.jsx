import React, { Component } from 'react';
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';

export default class CustomNavbar extends Component {
    render() {
        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Secuirty Scan Result</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Submit scan result</Nav.Link>
                            <Nav.Link href="/scanresults">List of scan result</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}