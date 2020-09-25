import React from "react";
import styles from "./Box.module.css";
import _ from "lodash";

const Box = props => {

    let { editable } = props;
    console.log('editable?', editable)
    return (

        <div className={styles.root}>
            {/* // https://lodash.com/docs/4.17.15#map */}
            {_.map(props.checked[props.row], (isBoxChecked, i) => (
                <div
                    onClick={() => editable ? props.onToggle(i, props.row): false }
                    // https://lodash.com/docs/4.17.15#chain
                    className={_.chain([
                        styles.box,
                        isBoxChecked && styles.checked,
                        props.isActive[props.row][i] && !isBoxChecked && styles.active,
                        props.isActive[props.row][i] && isBoxChecked && styles.activechecked
                    ])
                    .compact()
                    .join(" ")
                    .value()}
                    key={i}
                />
            ))}
        </div>
    )
};

export default Box;
