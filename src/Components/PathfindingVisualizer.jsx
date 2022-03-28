import React, { Component } from 'react';
import Node from './Node/Node';
import * as Algorithms from './Algorithms.js'
import './PathfindingVisualizer.css';
import { findAllByDisplayValue } from '@testing-library/react';
import _ from "lodash";
import startPic from '../Images/start.png'
import endPic from '../Images/end.png'
import drawGif from '../Images/drawGif.gif'
const rowLen = 15;
const colLen = 45;
export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isDrawing: false,
            choosingStart: false,
            choosingEnd: false,
            startNode: [Math.floor(rowLen / 2), Math.floor(colLen / 4)],
            endNode: [Math.floor(rowLen / 2), Math.floor(colLen * (3 / 4))],
            findingPath: false,
            makingMaze: false,
            path: "",
            speed: 95
        };

    }
    componentDidMount() {
        const grid = [];
        for (let r = 0; r < rowLen; r++) {
            const cur = [];
            for (let c = 0; c < colLen; c++) {
                cur.push(this.createNode(r, c));

            }
            grid.push(cur);
        }
        this.setState({
            nodes: grid
        });
        console.log(grid);
    }

    updateIsDraw = async (draw) => {
        this.setState({
            isDrawing: draw
        });

    };
    updateFinding = async (find) => {
        this.setState({
            findingPath: find
        });

    };
    updateMaze = async (maze) => {
        this.setState({
            makingMaze: maze
        });

    };
    updateStart = (node, start) => {

        if (!this.state.choosingEnd && !this.state.findingPath && !this.state.makingMaze) {
            this.setState({
                choosingStart: start,
                startNode: node,
            });
        }

    };
    updateEnd = (node, end) => {

        if (!this.state.choosingStart && !this.state.findingPath && !this.state.makingMaze) {
            this.setState({
                choosingEnd: end,
                endNode: node,
            });
        }
    };
    handleSpeedChange = (e) => {
        this.setState({ speed: (e.target.value) })

    };
    handleMouseEnter = (row, col) => {
        if (this.state.isDrawing && !this.state.findingPath && !this.state.makingMaze) {
            var allNodes = document.querySelectorAll(".node");
            var node = allNodes[col + row * this.state.nodes[0].length];
            var copy = this.state.nodes;
            if (node.style.backgroundColor == "rgb(44, 44, 68)") {
                node.style.backgroundColor = "white";
                copy[row][col].isWall = false;
            }
            else if (node.style.backgroundImage != `url(${startPic})` && node.style.backgroundImage != `url(${endPic})`) {
                node.style.backgroundColor = "rgb(44, 44, 68)";
                copy[row][col].isWall = true;
            }
            this.setState({
                nodes: copy
            });
        }
    };
    handleMouseDown = (row, col) => {
        if (!this.state.choosingEnd && !this.state.choosingStart && !this.state.findingPath && !this.state.makingMaze) {
            this.updateIsDraw(true);
            var allNodes = document.querySelectorAll(".node");
            var node = allNodes[col + row * this.state.nodes[0].length];
            var copy = this.state.nodes;
            if (node.style.backgroundColor == "rgb(44, 44, 68)") {
                node.style.backgroundColor = "white";
                copy[row][col].isWall = false;
            }
            else if (node.style.backgroundImage != `url(${startPic})` && node.style.backgroundImage != `url(${endPic})`) {
                node.style.backgroundColor = "rgb(44, 44, 68)";
                copy[row][col].isWall = true;
            }
            this.setState({
                nodes: copy
            });

        }
        else if (this.state.choosingStart && !this.state.findingPath && !this.state.makingMaze) {
            var allNodes = document.querySelectorAll(".node");
            var node = allNodes[col + row * this.state.nodes[0].length];
            var curNode = allNodes[this.state.startNode[1] + this.state.startNode[0] * this.state.nodes[0].length];
            console.log(curNode);
            var copy = this.state.nodes;
            if (node !== curNode && curNode !== null) {
                curNode.style.backgroundColor = "white";
                curNode.style.backgroundImage = "none";
                copy[this.state.startNode[0]][this.state.startNode[1]].isStart = false;
            }
            copy[row][col].isStart = true;
            copy[row][col].isWall = false;
            node.style.backgroundColor = "white";
            node.style.backgroundImage = `url(${startPic})`;
            node.style.backgroundRepeat = "no-repeat";
            node.style.backgroundPosition = "center";
            this.setState({
                nodes: copy,
                choosingStart: false,
                startNode: [row, col]
            });

        }
        else if (this.state.choosingEnd && !this.state.findingPath && !this.state.makingMaze) {
            var allNodes = document.querySelectorAll(".node");
            var node = allNodes[col + row * this.state.nodes[0].length];
            var curNode = allNodes[this.state.endNode[1] + this.state.endNode[0] * this.state.nodes[0].length];
            var copy = this.state.nodes;
            if (node !== curNode && curNode !== null) {
                curNode.style.backgroundColor = "white";
                curNode.style.backgroundImage = "none";
                copy[this.state.endNode[0]][this.state.endNode[1]].isStart = false;
            }
            copy[row][col].isWall = false;
            node.style.backgroundColor = "white";
            node.style.backgroundImage = `url(${endPic})`;
            node.style.backgroundRepeat = "no-repeat";
            node.style.backgroundPosition = "center";
            copy[row][col].isEnd = true;
            this.setState({
                nodes: copy,
                choosingEnd: false,
                endNode: [row, col]
            });
        }

    };
    handleMouseUp = () => {
        this.updateIsDraw(false);
    };
    handleMouseLeave = () => {
        //this.updateIsDraw(false);
    };
    clearVisited(start, end) {
        if (!this.state.findingPath && !this.state.makingMaze) {

            var allNodes = document.querySelectorAll(".node");
            for (let i = 0; i < allNodes.length; i++) {
                if (allNodes[i].style.backgroundColor != "rgb(44, 44, 68)" && allNodes[i].style.backgroundImage != `url(${startPic})` &&
                    allNodes[i].style.backgroundImage != `url(${endPic})`)
                    allNodes[i].style.backgroundColor = "white";


            }
            this.setState({
                path: ""
            });
            allNodes[end[1] + end[0] * this.state.nodes[0].length].style.backgroundImage = `url(${endPic})`;
            allNodes[end[1] + end[0] * this.state.nodes[0].length].style.backgroundColor = "white";
        }
    }
    clearBoard(start, end) {
        if (!this.state.findingPath && !this.state.makingMaze) {
            var copy = this.state.nodes;
            for (let r = 0; r < this.state.nodes.length; r++) {
                for (let c = 0; c < this.state.nodes[r].length; c++) {
                    copy[r][c] = this.createNode(r, c);
                }
            }
            var allNodes = document.querySelectorAll(".node");
            for (let i = 0; i < allNodes.length; i++) {

                allNodes[i].style.backgroundColor = "white";
                allNodes[i].style.backgroundImage = "none";


            }
            this.setState({
                nodes: copy,
                startNode: start,
                endNode: end,
                path: ""
            });
            allNodes[start[1] + start[0] * this.state.nodes[0].length].style.backgroundImage = `url(${startPic})`;
            //allNodes[end[1] + end[0] * this.state.nodes[0].length].style.backgroundColor = "yellow";
            allNodes[end[1] + end[0] * this.state.nodes[0].length].style.backgroundImage = `url(${endPic})`;

        }
    }
    verticalMaze() {
        if (!this.state.findingPath && !this.state.makingMaze) {
            this.updateMaze(true);
            this.clearBoard(this.state.startNode, this.state.endNode);
            var animate = [];
            Algorithms.verticalMaze(this.state.startNode, this.state.endNode, _.cloneDeep(this.state.nodes), animate);
            var allNodes = document.querySelectorAll(".node");
            var copy = this.state.nodes;

            const anim = async () => {
                for (let i = 0; i < animate.length; i++) {

                    var node = allNodes[animate[i][1] + animate[i][0] * this.state.nodes[0].length];

                    if (node.style.backgroundColor == "white" && node.style.backgroundImage != `url(${startPic})` &&
                        node.style.backgroundImage != `url(${endPic})`) {
                        node.style.backgroundColor = "rgb(44, 44, 68)";
                        copy[animate[i][0]][animate[i][1]].isWall = true;
                    }
                    await sleep(getSpeed(this.state.speed));




                }
                this.setState({
                    nodes: copy
                });
                this.updateMaze(false);
            }
            anim();

        }
    }
    primsAlgorithms() {
        if (!this.state.findingPath && !this.state.makingMaze) {
            this.updateMaze(true);
            this.clearBoard(this.state.startNode, this.state.endNode);
            var animate = [];
            Algorithms.primsAlgorithms(_.cloneDeep(this.state.nodes), animate);
            var allNodes = document.querySelectorAll(".node");
            var copy = this.state.nodes;
            const anim = async () => {
                for (let i = 0; i < animate.length; i++) {
                    var node = allNodes[animate[i][1] + animate[i][0] * this.state.nodes[0].length];
                    if (animate[i][2] == 0) {
                        if (node.style.backgroundColor == "white" && node.style.backgroundImage != `url(${startPic})` &&
                            node.style.backgroundImage != `url(${endPic})`) {
                            node.style.backgroundColor = "rgb(44, 44, 68)";

                            copy[animate[i][0]][animate[i][1]].isWall = true;
                        }
                        await sleep(getSpeed(this.state.speed));
                    }
                    else if (animate[i][2] == 1) {

                        if (node.style.backgroundColor == "rgb(44, 44, 68)") {

                            node.style.backgroundColor = "white";
                            copy[animate[i][0]][animate[i][1]].isWall = false;
                        }
                        await sleep(getSpeed(this.state.speed));
                    }
                }
                this.setState({
                    nodes: copy
                });
                this.updateMaze(false);
            }
            anim();
        }
    }
    horizontalMaze() {
        if (!this.state.findingPath && !this.state.makingMaze) {
            this.updateMaze(true);
            this.clearBoard(this.state.startNode, this.state.endNode);
            var animate = [];
            Algorithms.horizontalMaze(this.state.startNode, this.state.endNode, _.cloneDeep(this.state.nodes), animate);
            var allNodes = document.querySelectorAll(".node");
            var copy = this.state.nodes;
            const anim = async () => {
                for (let i = 0; i < animate.length; i++) {
                    var node = allNodes[animate[i][1] + animate[i][0] * this.state.nodes[0].length];
                    if (node.style.backgroundColor == "white" && node.style.backgroundImage != `url(${startPic})` &&
                        node.style.backgroundImage != `url(${endPic})`) {
                        node.style.backgroundColor = "rgb(44, 44, 68)";
                        copy[animate[i][0]][animate[i][1]].isWall = true;
                    }
                    await sleep(getSpeed(this.state.speed));
                }
                this.setState({
                    nodes: copy
                });
                this.updateMaze(false);
            }
            anim();

        }
    }
    astar() {
        if (!this.state.findingPath && !this.state.makingMaze) {
            this.clearVisited(this.state.startNode, this.state.endNode);
            this.updateFinding(true);
            var animate = [];
            //console.log(this.state.nodes);
            var path = Algorithms.astar(this.state.startNode, this.state.endNode, _.cloneDeep(this.state.nodes), animate);
            //console.log(path);
            var allNodes = document.querySelectorAll(".node");
            const anim = async () => {
                for (let i = 0; i < animate.length; i++) {
                    var node = allNodes[animate[i][1] + animate[i][0] * this.state.nodes[0].length];
                    if (node.style.backgroundImage != `url(${endPic})`)
                        node.style.backgroundColor = "aqua";
                    await sleep(getSpeed(this.state.speed));
                }
                for (let i = path.length - 1; i >= 0; i--) {
                    var node = allNodes[path[i][1] + path[i][0] * this.state.nodes[0].length];
                    node.style.backgroundImage = `url(${startPic})`;
                    //if (node.style.backgroundColor != "yellow")
                    node.style.backgroundColor = "rgb(255,242,0)";
                    await sleep(getSpeed(this.state.speed) / 2);
                    if (i != path.length - 1 && i != 0)
                        node.style.backgroundImage = "none";
                }
                this.updateFinding(false);
                if (path.length == 0) {
                    this.setState({
                        path: "NO PATH"
                    });
                }
            }
            anim();

        }
    }
    dijkstra() {
        if (!this.state.findingPath && !this.state.makingMaze) {
            this.clearVisited(this.state.startNode, this.state.endNode);
            this.updateFinding(true);
            var animate = [];
            //console.log(this.state.nodes);
            var path = Algorithms.dijkstra(this.state.startNode, this.state.endNode, _.cloneDeep(this.state.nodes), animate);
            //console.log(path);

            var allNodes = document.querySelectorAll(".node");
            const anim = async () => {
                for (let i = 0; i < animate.length; i++) {
                    var node = allNodes[animate[i][1] + animate[i][0] * this.state.nodes[0].length];
                    if (node.style.backgroundImage != `url(${endPic})`)
                        node.style.backgroundColor = "aqua";
                    await sleep(getSpeed(this.state.speed));
                }
                for (let i = path.length - 1; i >= 0; i--) {
                    var node = allNodes[path[i][1] + path[i][0] * this.state.nodes[0].length];
                    node.style.backgroundImage = `url(${startPic})`;
                    // if (node.style.backgroundColor != "yellow")
                    node.style.backgroundColor = "rgb(255,242,0)";
                    await sleep(getSpeed(this.state.speed) / 2);
                    if (i != path.length - 1 && i != 0)
                        node.style.backgroundImage = "none";
                }
                this.updateFinding(false);
                if (path.length == 0) {
                    this.setState({
                        path: "NO PATH"
                    });
                }
            }
            anim();

        }
    }

    createNode(row, col) {
        return {
            row,
            col,
            distance: Infinity, 
            prev: null,
            isWall: false,
            isEnd: row == Math.floor(rowLen / 2) && col == Math.floor(colLen * (3 / 4)),
            isStart: row == Math.floor(rowLen / 2) && col == Math.floor(colLen / 4),
            visited: false
        }
    }
    render() {
        const { nodes } = this.state;
        var ret = [];
        var k = 0;

        for (let i = 0; i < nodes.length; i++) {
            var cur = [];
            for (let j = 0; j < nodes[i].length; j++) {
                var clr = "white";
                var imag = "none";
                if (i == Math.floor(nodes.length / 2) && j == Math.floor(nodes[0].length / 4)) {

                    imag = `url(${startPic})`;
                }
                else if (i == Math.floor(nodes.length / 2) && j == Math.floor(nodes[0].length * (3 / 4))) {
                    imag = `url(${endPic})`;
                }
                cur.push(<Node key={k}
                    row={i}
                    col={j}
                    imag={imag}
                    clr={clr}
                    width={nodes[0].length}
                    height={nodes.length}
                    updateDraw={this.updateIsDraw}
                    mEnter={this.handleMouseEnter}
                    mDown={this.handleMouseDown}
                    mUp={this.handleMouseUp}
                    mLeave={this.handleMouseLeave}
                    updateStart={this.updateStart}
                    updateEnd={this.updateEnd}></Node>



                );
                k++;
            }
            ret.push(cur);
        }
        return (

            <div className="container" draggable="false" >

                <div className="toolbar" >
                    <div className="algos">
                        <u>Algorithms</u>
                        <br />
                        <span class="button" onClick={() => this.dijkstra()}
                            style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Dijkstra</span>
                        <span class="button" onClick={() => this.astar()}
                            style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>A*</span>
                    </div>
                    <div className="mazes">
                        <u>Mazes</u>
                        <br />
                        <span class="button" onClick={() => this.verticalMaze()}
                            style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Vertical maze</span>
                        <span class="button" onClick={() => this.horizontalMaze()}
                            style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Horizontal Maze</span>
                        <span class="button" onClick={() => this.primsAlgorithms()}
                            style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Prim's Algorithm Maze</span>
                    </div>


                </div>
                <span style={{ position: "fixed", top: "15%", left: "10wh" }}>
                    {this.state.path}
                </span>

                {ret}
                <div className = "menu" style={{ bottom: 0, position: "absolute", width: "100%" }}>
                    <br />
                    <span class="button" onClick={() => this.updateStart(this.state.startNode, true)}
                        style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Change start node</span>
                    <span class="button" onClick={() => this.updateEnd(this.state.endNode, true)}
                        style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Change end node</span>
                    <span class="button" onClick={() => this.clearBoard([Math.floor(rowLen / 2), Math.floor(colLen / 4)], [Math.floor(rowLen / 2), Math.floor(colLen * (3 / 4))])}
                        style={{ margin: `10px`, fontFamily: 'Comic Sans MS' }}>Clear Board</span>
                    <span className="speed">
                        <pre>               </pre>
                        Speed<br />
                        <input type="range" min={1} max={100} value={this.state.speed} onChange={this.handleSpeedChange} />
                    </span>
                </div>
                <div class="popup" onClick={() => myFunction()}><span class="button">Tutorial</span>
                    <span class="popuptext" id="myPopup">
                        <p >
                            Welcome to my Pathfinding Visualization Project<br />
                            <p style={{ fontSize: "small", textAlign: "left" }}>
                                This projects provides demonstrations of two search algorithms: Dijkstra and A*.
                                To visualize, just select desired algorithm.
                            </p>

                            <p style={{ fontSize: "small", textAlign: "left" }}>
                                To change start/end node location, select the corresponding button and click a new location on the grid.
                            </p>

                            <p style={{ fontSize: "small", textAlign: "left" }}>
                                To add walls, just drag your mouse across the grid.
                            </p>
                            <img src={drawGif} alt="wallExp" width="100" height="100" style={{ textAlign: "center" }}></img>

                            <p style={{ fontSize: "small", textAlign: "left" }}>
                                This project also provides 3 maze generators. The first two are simple mazes that doesn't use complex algorithms
                                (Vertical, Horizontal). The third option uses the concept of Prim's algorithm to create a randomly generated maze.
                            </p>
                            <p style={{ fontSize: "small", textAlign: "left" }}>
                                You can also adjust the speed of the visualization using the slider below the grid.
                            </p>
                             
                            <p>Enjoy!</p>
                            <h6>click this page to exit</h6>
                        </p>
                    </span>
                </div>
            </div>

        )
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getSpeed(speed) {
    return 200 - (200 * (speed / 100));
}
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    console.log("Yuur");
}