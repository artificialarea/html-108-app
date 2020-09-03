import React from "react";
import { Sampler } from "tone";
import A1 from "../../assets/A1.mp3";
// import A1 from "../../assets/hh_sample.mp3";

export default class ToneTestOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
        this.handleClick = this.handleClick.bind(this);

        this.sampler = new Sampler(
            { A1 },
            {
                onload: () => {
                    this.setState({ isLoaded: true });
                }
            }
        ).toMaster();
    }

    handleClick() {
        this.sampler.triggerAttack("A1");
    }

    render() {
        const { isLoaded } = this.state;
        return (
            <div>
                <button disabled={!isLoaded} onClick={this.handleClick}>
                    start
                </button>
            </div>
        );
    }
}