import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';





const SignupForm = () => {
    //set the initial form data state
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    /**Invokes the useMutation hook from apollo client.
     * "addUser" is a function to trigger the ADD_USER mutation from graphql
     * the {error, data} is the response we get from calling "addUser".
     * */
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (e) => {
        const { name, value } = e.target  //destructs the e.target to extract only the name and value. 

        //calls the function to modify the userFormData state
        setUserFormData({
            ...userFormData,    //creates a shallow copy of the current userFormData state(creates a new object with the same properties & values as the userFormData state)
            [name]: value   //changes the property of the shallow copy(username/email/password) with the value of the target
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            /** calls the "addUser" function to trigger the mutation.
 * passes in a shallow copy of the userFormData as its variables.
 * {data} destructs the response to only extract the "data" property.
 * the "data" property of the response object are the fields that ADD_USER returns. in this case, it returns
 * 1. token
 * 2. user{ _id, username}*/
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            //calls the login function from Auth, which takes in a token id as parameters.
            Auth.login(data.addUser.token)  //passes in the token from the return response of "addUser"
        } catch (error) {
            console.log(error)
        }
    }



    return (
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
    )
}
export default SignupForm;