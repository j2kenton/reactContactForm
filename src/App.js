import React, { Component } from 'react';
import Form from './components/form';
import Input from './components/input';
import Button from './components/button';

import logo from './jones-logo.png';
import './App.css';

import axios from 'axios'

import { isEmail } from 'validator';

const required = (value, props) => {
    if (!value || (props.isCheckable && !props.checked)) {
        return <span className="form-error is-visible">Required</span>;
    }
};

const name = (value, props) => {
    const nonAlphabeticRegex = /[^a-z]/i;
    const indexOfNonAlphabetic = value.search(nonAlphabeticRegex);
    if (indexOfNonAlphabetic > -1) {
        return <span className="form-error is-visible">value must contain only letters (a-z and A-Z)</span>;
    } else if (value.length < 2) {
        return <span className="form-error is-visible">value must be at least 2 letters long</span>;
    }
};

const telephone = (value, props) => {
    const nonNumericRegex = /[^0-9]/;
    const indexOfNonNumeric = value.search(nonNumericRegex);
    if (indexOfNonNumeric > -1) {
        return <span className="form-error is-visible">value must contain only numbers (0-9)</span>;
    } else if (value.length !== 10) {
        return <span className="form-error is-visible">value must be exactly 10 digits long</span>;
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return <span className="form-error is-visible">'{value}' is not a valid email.</span>;
    }
};

class Registration extends Component {

    constructor(API_URL) {
        super();
        this.API_URL = "http://localhost:3333/";
        this.REGISTRATION_MESSAGE = "Thank you for registering!";
        this.NO_RESPONSE_MESSAGE = "(No server response but apparently registration was successful).";
        this.FORM_SELECTOR = "#registrationForm";
        this.FORM_SERIALIZER = require("form-serialize");
    }

    handleClick = () => {
        this.form.validateAll();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const registrationForm = document.querySelector(this.FORM_SELECTOR);
        const inputData = this.FORM_SERIALIZER(registrationForm, {hash: true});
        const paramsStr = "?email=" + inputData.email + "&firstName=" + inputData.firstname + "&lastName=" + inputData.lastname + "&phoneNumber=" + inputData.phoneNumber;
        axios.get(this.API_URL + paramsStr)
            .then(response => {
                document.write(this.REGISTRATION_MESSAGE);
            }, reason => {
                document.write(this.REGISTRATION_MESSAGE + " " + this.NO_RESPONSE_MESSAGE);
            });
    };

    render() {
        return (
            <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit} id="registrationForm" className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Jones Form</h1>
                </header>
                <div className="formFields">
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <label>
                                First Name:
                                <Input
                                    placeholder="Firstname"
                                    type="text"
                                    name="firstname"
                                    validations={[required, name]}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <label>
                                Last Name:
                                <Input
                                    placeholder="Lastname"
                                    type="text"
                                    name="lastname"
                                    validations={[required, name]}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <label>
                                Email Address:
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    validations={[required, email]}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <label>
                                Phone Number:
                                <Input
                                    placeholder="Phone number"
                                    type="text"
                                    name="phoneNumber"
                                    validations={[required, telephone]}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <Button className="button">Submit</Button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}


export default function App() {
    return (
        <div>
            <Registration/>
        </div>
    )
}
