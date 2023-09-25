import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import ADD_USER from '../../utils/mutations';
import Auth from '../../utils/auth';

const signupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);



    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    value={userFormData.username}
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter a username">
                    

                </input>
                <input
                    placeholder="Enter an email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={userFormData.email}>

                </input>
                <input
                    placeholder="Enter a password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={userFormData.password}>
                </input>
                <button type="submit">submit</button>
            </form>
        </>
    )
}