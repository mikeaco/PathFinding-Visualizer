import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dx: (window.screen.width - this.props.width * 25)/2 ,
            dy: (window.screen.height - this.props.height * 25) / 3
        };
    }
    render() {

        return <div id="node" 
                    draggable="false" 
                    onDragStart={(e) => { e.preventDefault() }}
                    className="node" 
                    row={this.props.row}
                    col={this.props.col}
                    onMouseUp={() => this.props.mUp()} 
                    onMouseLeave={() => this.props.mLeave()}
                    onMouseDown={() => this.props.mDown(this.props.row,this.props.col)}
                    onMouseEnter={() => this.props.mEnter(this.props.row,this.props.col)} 
                    style={{ left: `${this.props.col * 25 + this.state.dx}px`,
                             top: `${this.props.row * 25 + this.state.dy}px` ,
                             backgroundColor: `${this.props.clr}`,
                             backgroundImage: `${this.props.imag}`}} >

                    </div>
    }
}