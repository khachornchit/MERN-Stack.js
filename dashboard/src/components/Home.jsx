import React, { Component } from 'react';
import { Container, Jumbotron, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
const API_URL = 'http://localhost:8082/api/scanresults';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            status: 'Queued',
            repositoryName: '',
            findingsText: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        const url = `${API_URL}`;
        let findings = [];
        e.preventDefault();

        const { status, repositoryName, findingsText } = this.state;

        if (findingsText.trim().length > 10) {
            let json = JSON.parse(findingsText);
            findings = json.findings;
        }

        axios.post(url, { status, repositoryName, findings })
            .then((result) => {
                alert("Submit Scan Result Successfully !");
                this.setState({
                    status: 'Queued',
                    repositoryName: '',
                    findingsText: ''
                });
            });
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h3>Form to submit scan result</h3>
                </Jumbotron>

                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="scanresultsForm.RepositoryName">
                        <Form.Label>Repository Name *</Form.Label>
                        <Form.Control type="text" placeholder="Repository Name" name="repositoryName" value={this.state.repositoryName} onChange={this.onChange} />
                    </Form.Group>

                    <Form.Group controlId="scanresultsForm.ControlSelect1">
                        <Form.Label>Status *</Form.Label>
                        <Form.Control as="select" name="status" value={this.state.status} onChange={this.onChange}>
                            <option value="Queued">Queued</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Success">Success</option>
                            <option value="Failure">Failure</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="scanresultsForm.ControlTextarea1">
                        <Form.Label>Findings Data (JSON format)</Form.Label>
                        <Form.Control as="textarea" rows="10" name="findingsText" value={this.state.findingsText} onChange={this.onChange} />
                        <Form.Text className="text-muted">
                            See example data format at 
                            <a target="_blank"
                                href="https://github.com/guardrailsio/full-stack-engineer-challenge/blob/master/example-findings.json">
                                https://github.com/guardrailsio/full-stack-engineer-challenge/blob/master/example-findings.json
                            </a>
                        </Form.Text>
                    </Form.Group>

                    <hr></hr>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}