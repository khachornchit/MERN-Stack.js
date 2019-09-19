import React, { Component } from 'react';
import axios from 'axios';
import { Container, Table, Badge, Accordion, Card, Button, Jumbotron, ListGroup } from 'react-bootstrap';
const API_URL = 'http://localhost:8082/api/scanresults';

function ShowBadge(props) {
    const findings = props.findings;
    if (findings.length > 0) {
        return (
            <td>
                <Badge variant="warning">Findings number : {findings.length}</Badge>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Click to display findings items
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {findings.map((item, index) => (
                                    <ListGroup as="ul" key={index}>
                                        <ListGroup.Item as="li" active>Rule Id : {item.ruleId}</ListGroup.Item>
                                        <ListGroup.Item as="li">Description : {item.metadata.description}</ListGroup.Item>
                                        <ListGroup.Item as="li">Severity : {item.metadata.severity}</ListGroup.Item>
                                        <ListGroup.Item as="li">Path name : {item.location.path}</ListGroup.Item>
                                        <ListGroup.Item as="li">Line of code of the finding : {item.location.positions.begin.line}</ListGroup.Item>
                                    </ListGroup>
                                ))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </td>
        )
    } else {
        return (<td>Not Found</td>);
    }
}

export default class ScanResults extends Component {
    state = {
        scanresults: []
    }

    componentDidMount() {
        const url = `${API_URL}`;
        axios.get(url).then(response => response.data)
            .then((data) => {
                this.setState({ scanresults: data })
            })
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>List of security scan results</h2>
                </Jumbotron>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Repository Name</th>
                            <th>Status</th>
                            <th>Scanning At</th>
                            <th>Findings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.scanresults.map((scan, index) => (
                            <tr key={index}>
                                <td>{scan._id}</td>
                                <td>{scan.repositoryName}</td>
                                <td>{scan.status}</td>
                                <td>{scan.scanningAt}</td>
                                <ShowBadge findings={scan.findings}></ShowBadge>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}