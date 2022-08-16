import React from "react";
import Field from "./Field";

class Game extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            initialized: false
        };
    }

    render() {
        return(
            <div className="game">
                <Field />
            </div>
        )
    }
}

export default Game;