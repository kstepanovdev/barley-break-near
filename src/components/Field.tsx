import React from 'react';
import init, { init_field } from 'barkley-break'

interface IFieldState {
    field: Uint8Array,
    solved: boolean
}
interface IFieldProps {}

class Field extends React.Component<IFieldProps, IFieldState> {
    constructor(props: IFieldProps) {
        super(props);
        this.state = {
          field: Uint8Array.from([]),
          solved: false 
        };
    }
    
    componentDidMount(): void {
        init().then(() => {
            this.setState({ 
                field: init_field(),
            })
        })
    }
    
    render() {
        let cells: Array<JSX.Element> = []; 
        this.state.field.forEach((cell_val: number, index: number) => {
            cells.push(<button className="square" key={index}>{ cell_val }</button>)
        }) 

        return(
            <div className="game-field">
                {cells}
            </div>
        )
    }
}

export default Field;