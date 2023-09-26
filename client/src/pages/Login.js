import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    // set the initial userFormState, which is empty
    const [userFormData, setUserFormData] = useState({ email: '', password: ''});
    // create the login instance that uses the mutation
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    // update the state based on form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // call login function 
            const { data } = await loginUser({
                variables: { ...userFormData},
            });

        // check for mutation errors
        if(error) {
            throw new Error('Something went wrong');
        }

        // pass in token from login response
        Auth.login(data.login.token);
        } catch (err) {
          console.log(err);
        }

        // empty form after submit
        setUserFormData({
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                type='email'
                placeholder='Enter your email here'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
            />
            <input 
                type='password'
                placeholder='Enter your password here'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
            />
            <button type='submit'>Login</button>
        </form>

    )
}

export default Login;