import React, { createElement, DOMElement, ReactElement } from 'react';
import init, { init_field, swap, is_solved } from 'barkley-break'

interface IFieldState {
    field: Uint8Array,
    solved: boolean
    move: IFieldMove
}
interface IFieldProps {}

interface IFieldMove {
    from: null | number,
    to: null | number
}

class Field extends React.Component<IFieldProps, IFieldState> {
    constructor(props: IFieldProps) {
        super(props);
        this.state = {
          field: Uint8Array.from([]),
          solved: false,
          move: { from: null, to: null }
        };
    }

    makeMove(index: number, cell_val: number) {
        let from = this.state.move.from;
        let to = this.state.move.to;

        if (from === null) {
            from = cell_val
        } else if (to === null) {
            to = cell_val
        } else {
            this.setState({ field: swap(this.state.field, from, to) })
        }
    }

    componentDidMount(): void {
        init().then(() => {
            this.setState({
                field: init_field(),
            })
        })
    }

    render() {
        let row_el: ReactElement;
        let cells: Array<ReactElement> = [];
        let rows: Array<ReactElement> = [];

        this.state.field.forEach((cell_val: number, index: number) => {
            if ((index !== 0 && index % 4 === 0) || index === 15) {
                if (index === 15) {
                    cells.push(<button className="square" key={index} onClick={ () => this.makeMove(index, cell_val)} >{ cell_val }</button>)
                }

                row_el = React.createElement(
                    "div",
                    { className: 'board-row', key: index / 4},
                    [...cells]
                )
                cells = []
                rows.push(row_el)
            }
            cells.push(<button className="square" key={index} onClick={ () => this.makeMove(index, cell_val)} >{ cell_val }</button>)
        })

        return(
            <div className="game-field">
                {rows}
            </div>
        )
    }
}

export default Field;