import React from "react";

export default function Die(props){

    return(
        <div className="die" 
            style={{backgroundColor: props.isHeld ? "#59E391": "WHITE"}}>
            <h1 onClick={props.click}>
                {props.value}
            </h1>
        </div>
    )
}