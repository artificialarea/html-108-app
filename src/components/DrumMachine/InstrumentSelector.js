import React from 'react';

export default function InstrumentSelector (props) {
    return (
        <div className="instrument-selector">
            <label>
                Display:
                <select id="instrument-selector">
                    <option value="hahat">HiHat</option>
                    <option value="clap">Clap</option>
                    <option value="trap">Trap</option>
                    <option value="bass">Bass</option>
                </select>
            </label>
        </div>
    )
}