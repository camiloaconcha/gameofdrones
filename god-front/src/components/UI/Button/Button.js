import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <button onClick={e => props.onGameItemClick(props.btnType)} className={["button" + " " + "button-" + props.btnType]}>
      {props.children}
    </button>
  );
};

export default Button;
