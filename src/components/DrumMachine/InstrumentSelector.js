import React from 'react';

export default function InstrumentSelector (props) {
    return (
        <div className="instrument-selector">
            <label>
                Display:
                <select id="instrument-selector">
                    <option value="G5">G5</option>
                    <option value="Eb5">Eb5</option>
                    <option value="C5">C5</option>
                    <option value="G4">G4</option>
                </select>
            </label>
        </div>
    )
}
