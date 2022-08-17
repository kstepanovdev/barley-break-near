import React, { ReactElement } from 'react';
import init, { init_field, swap, is_solved } from 'barkley-break'

interface IFieldState {
    field: Uint8Array,
    solved: boolean
    move: IFieldMove
    moves_amount: number
}
interface IFieldProps {}

interface IFieldMove {
    from: null | number,
    to: null | number
    selected: 'from' | 'to'
}

class Field extends React.Component<IFieldProps, IFieldState> {
    constructor(props: IFieldProps) {
        super(props);
        this.state = {
          field: Uint8Array.from([]),
          solved: false,
          move: { from: null, to: null, selected: 'from' },
          moves_amount: 0
        };
    }

    makeMove(index: number) {
        let move: IFieldMove = this.state.move;
        move[move.selected] = index;
        move.selected = move.selected === 'from' ? 'to' : 'from';

        // TODO: handle double click on the same element
        if (move.from === null || move.to === null) {
            return;
        } else {
            this.setState({
                field: swap(this.state.field, move.from, move.to),
                move: { from: null, to: null, selected: 'from' },
            }, () => {
                if (is_solved(this.state.field)) {
                    // TODO: call the contract with amount of moves
                } else {
                    this.setState(() => ({
                        moves_amount: this.state.moves_amount + 1
                    }))
                };
            })
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
                    cells.push(<button className="square" key={index} onClick={ () => this.makeMove(index)} >{ cell_val }</button>)
                }

                row_el = React.createElement(
                    "div",
                    { className: 'board-row', key: index / 4},
                    [...cells]
                )
                cells = []
                rows.push(row_el)
            }
            cells.push(<button className="square" key={index} onClick={ () => this.makeMove(index)} >{ cell_val }</button>)
        })

        return(
            <div className="game-field">
                {rows}
            </div>
        )
    }
}

export default Field;