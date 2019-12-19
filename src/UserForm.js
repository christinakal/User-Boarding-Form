import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


function UserForm() {

    return (
        <div>
            <Form>
                {/* NAME FIELD */}
                <div>
                    <label htmlFor="name">Name</label>
                    <Field id="name" type="text" name="name"/>
                </div>
                {/* EMAIL FIELD */}
                <div>
                    <label htmlFor="email">Email</label>
                    <Field id="email" type="email" name="email"/>
                </div>
                {/* PASSWORD FIELD */}
                <div>
                    <label htmlFor="password">Password</label>
                    <Field id="password" type="password" name="password"/>
                </div>
                {/* CHECKBOX */}
                <div>
                <label htmlFor="terms">I have read and accept the Terms of Service</label>
                    <Field id="terms" type="checkbox" name="terms"/>
                </div>
                <button>Submit!</button>
            </Form>
        </div>
    );
}


const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
      return {
        name: name || "",
        email: email || "",
        password: password,
        terms: terms || false
      };
    }
})(UserForm);


  export default FormikUserForm;