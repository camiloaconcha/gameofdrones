import React from 'react';
import "./Button.css";

const Button = props => {
    return (
        <div>
            <button
                className={['button'+' '+'button-'+props.btnType]}
                onClick={props.clicked}
            >
                {props.children}
            </button>
        </div>
    );
};

export default Button;