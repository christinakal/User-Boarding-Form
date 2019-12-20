import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './UserForm.css'


function UserForm( {values, errors, touched, status} ) {

    const [users, setUsers ] = useState([]);

    useEffect(() => {
        console.log("status has changed", status);
      }, [status]);
    //   status && setUsers(users => [...users, status]);


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
                    <button type="submit" disabled={values.isSubmitting}>Submit!</button>
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
    handleSubmit( values, { setStatus }) {
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("Succes:", res);
            setStatus(res.data);
            values.resetForm();
          })
          .catch(err => {
            console.log(err);
          });
        console.log("submitting", values);

    }
})(UserForm);


  export default FormikUserForm;