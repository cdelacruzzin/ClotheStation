import React, { useEffect } from "react";
import "../components/css/Success.scss"

// success after payment
function Success() {

    // show success component for 3 seconds and redirect to homepage after
    useEffect(() => {
       setTimeout(() => {
        window.location.assign('/')
       }, 3000);
    });


    return(
    // success message after the payment 
    <div className="success">
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the homepage</h2>
    </div>
    )
}

export default Success;
