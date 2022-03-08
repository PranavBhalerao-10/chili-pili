import React from "react";
import './StudentDetail.styles.css'

class StudentDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                name: '',
                age: '',
                phone: '',
                grade: '',
            },
            errors: {},
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        if (typeof fields["age"] !== "undefined") {
            if (fields["age"] < 0) {
                formIsValid = false
                errors["age"] = "Age cannot be negative"
            }
            if (!(/^\d+$/.test(fields["age"]))) {
                formIsValid = false
                errors["age"] = "Age should be a number"
            }
        }
        if (typeof fields["phone"] !== "undefined") {
            if (!(/^\d+$/.test(fields["age"]))) {
                formIsValid = false
                errors["phone"] = "Phone should be a number"
            }
            if (!fields["phone"].length === 10) {
                formIsValid = false
                errors["phone"] = "Phone Number should be 10 digit"
            }
        }
        if (typeof fields["grade"] !== "undefined") {
            if (!(/^\d+$/.test(fields["grade"]))) {
                formIsValid = false
                errors["grade"] = "Grade should be a number"
            }
            if (!(fields["grade"] <= 10 && fields["grade"] >= 0)) {
                formIsValid = false
                errors["grade"] = "Grade must be between 0 to 10"
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit = (e) => {
        e.preventDefault();
        let fields = this.state.fields;
        let errors = this.state.errors
        if (this.handleValidation()) {
            alert("Form submitted");
            const response = fetch('http://localhost:1337/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields
                }),
            })

            const data = response.json()

            if (data.status === 'ok') {
                alert('User added')
            }
        } else {
            alert(`Form has errors.${errors.name}`);
        }

    }

    handleChange = (field, e) => {
        console.log(e.target);
        let fields = this.state.fields;
        console.log(e.target.value);
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div className="student-add">
                <div className="student-div">
                    <form
                        name="contactform"
                        className="student-form"
                        onSubmit={this.contactSubmit}
                    >
                        <div>
                            <fieldset>
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    size="30"
                                    placeholder="Name"
                                    onChange={this.handleChange.bind(this, "name")}
                                    value={this.state.fields["name"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                <input
                                    className="form-control"
                                    name="age"
                                    type="text"
                                    size="30"
                                    placeholder="Age"
                                    onChange={this.handleChange.bind(this, "age")}
                                    value={this.state.fields["age"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["age"]}</span>
                                <input
                                    className="form-control"
                                    name="phone"
                                    type="text"
                                    size="30"
                                    placeholder="Phone"
                                    onChange={this.handleChange.bind(this, "phone")}
                                    value={this.state.fields["phone"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
                                <input
                                    className="form-control"
                                    name="grade"
                                    type="text"
                                    size="30"
                                    placeholder="Grade"
                                    onChange={this.handleChange.bind(this, "grade")}
                                    value={this.state.fields["grade"]}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["grade"]}</span>
                                <button className="btn btn-primary" type="submit">Add Student</button>
                            </fieldset>
                            <br />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default StudentDetail;