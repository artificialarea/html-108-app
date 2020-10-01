import React from "react";
import styles from "./Box.module.css";
import _ from "lodash";

const Box = props => {

    let { editable, checked, row, isActive, onToggle } = props;
    // console.log('editable?', editable)
    return (

        <div className={styles.root}>
            {/* // https://lodash.com/docs/4.17.15#map */}
            {_.map(checked[row], (isBoxChecked, i) => (
                <div
                    onClick={() => editable ? onToggle(i, row): false }
                    // https://lodash.com/docs/4.17.15#chain
                    className={_.chain([
                        styles.box,
                        isBoxChecked && styles.checked,
                        isActive[row][i] && !isBoxChecked && styles.active,
                        isActive[row][i] && isBoxChecked && styles.activechecked
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

Box.defaultProps = {
    editable: '', 
    checked: [], 
    row: '', 
    isActive: [], 
    onToggle: () => {},
}

export default Box;
