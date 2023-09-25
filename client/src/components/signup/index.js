import React, {useState} from "react";
import {useMutation} from '@apollo/client';
import ADD_USER from '../../utils/mutations';
import Auth from '../../utils/auth';

const signupForm =() => {
    const [userFormData, setUserFormData] = useState({username:'', email: '', password: ''});
    const [addUser, {error}] = useMutation(ADD_USER);

}