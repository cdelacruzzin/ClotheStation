import React from "react";

// alll passed props will be passed into this function from the spread props object
// No need to define individually
function DeleteBtn(props) {
    return (
        <span {...props} role="button" tabIndex="0">
            ✗
        </span>
    );
}

export default DeleteBtn;