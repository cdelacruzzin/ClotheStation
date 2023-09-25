import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import ADD_USER from '../../utils/mutations';
import Auth from '../../utils/auth';

const signupForm = () => {
    //set the initial form data state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });




    /**Invokes the useMutation hook from apollo client.
     * "addUser" is a function to trigger the ADD_USER mutation from graphql
    */
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (e) =>{
        const {name, value} = e.target  //destructs the e.target to extract only the name and value. 

        //calls the function to modify the userFormData state
        setUserFormData({
            ...userFormData,    //creates a shallow copy of the current userFormData state(creates a new object with the same properties & values as the userFormData state)
            [name]: value   //changes the property of the shallow copy(username/email/password) with the value of the target
        })
    }



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