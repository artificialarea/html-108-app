import React from "react";
import styles from "./Box.module.css";
import _ from "lodash";

const Box = props => {
    let { editable, checked, row, isActive, onToggle } = props;

    return (
        <div className={styles.root}>
            {_.map(checked[row], (isBoxChecked, i) => (
                // https://lodash.com/docs/4.17.15#map
                // https://lodash.com/docs/4.17.15#chain
                <div
                    onClick={() => editable ? onToggle(i, row) : false }
                    onKeyPress={() => editable ? onToggle(i, row) : false }
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
                    role="button"
                    aria-pressed={
                        isBoxChecked
                            ? "true"
                            : "false"
                    }
                    tabIndex={0}
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
