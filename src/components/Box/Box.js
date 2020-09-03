import React from "react";
import styles from "./Box.css";

const Box = props => (

    <div className="Box_root">
        <div 
            className="box"
            onClick={() => {
                props.onToggle()
            }}
            
            
            />

        {/* {this.props.sequenceLength.map(box => (

            
            <div 
            className="box"
            onClick={() => {
                props.onToggle()
            }}
            
            
            />
            ))
        } */}


    </div>
);

export default Box;