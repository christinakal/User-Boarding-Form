import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './UserForm.css'


function UserForm( {values, errors, touched} ) {

    return (
        <div>
            <Form>
                {/* NAME FIELD */}
                <div>
                    <label htmlFor="name">Name</label>
                    <Field id="name" type="text" name="name"/>
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
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
                    <Field id="terms" type="checkbox" name="terms" check={values.vaccinations}/>
                    {touched.terms && errors.terms && (
                        <p>Must Accept Terms of Service</p>
                    )}
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Too short!').required("You need a real name!"),
        terms: Yup.boolean().oneOf([true])
    }),
})(UserForm);


  export default FormikUserForm;