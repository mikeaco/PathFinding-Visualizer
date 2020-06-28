import _ from "lodash";
export const dijkstra = (start, end, grid, animate) => {
    var visited = [];
    const unvistited = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            unvistited.push(grid[i][j]);
        }
    }

    var startNode = grid[start[0]][start[1]];
    var endNode = grid[end[0]][end[1]];
    startNode.distance = 0;
    return dijkstraHelper(start, end, visited, unvistited, grid, animate);

}
function dijkstraHelper(cur, end, visited, unvistited, grid, animate) {
    var curRow = cur[0];
    var curCol = cur[1];
    if (curRow == end[0] && curCol == end[1]) {
        var path = [];
        var curNode = grid[curRow][curCol];
        animate.push([curRow, curCol]);
        while (curNode.distance != 0) {
            path.push([curNode.row, curNode.col]);
            curNode = curNode.prev;
        }
        path.push([curNode.row, curNode.col]);
        return path;
    }
    else {
        if (curCol + 1 < grid[0].length) {
            if (grid[curRow][curCol + 1].distance > grid[curRow][curCol].distance + 10 && !grid[curRow][curCol + 1].isWall) {
                grid[curRow][curCol + 1].distance = grid[curRow][curCol].distance + 10;
                grid[curRow][curCol + 1].prev = grid[curRow][curCol];
            }

        }
        if (curCol - 1 >= 0) {
            if (grid[curRow][curCol - 1].distance > grid[curRow][curCol].distance + 10 && !grid[curRow][curCol - 1].isWall) {
                grid[curRow][curCol - 1].distance = grid[curRow][curCol].distance + 10;
                grid[curRow][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow + 1 < grid.length) {
            if (grid[curRow + 1][curCol].distance > grid[curRow][curCol].distance + 10 && !grid[curRow + 1][curCol].isWall) {
                grid[curRow + 1][curCol].distance = grid[curRow][curCol].distance + 10;
                grid[curRow + 1][curCol].prev = grid[curRow][curCol];
            }
        }
        if (curRow - 1 >= 0) {
            if (grid[curRow - 1][curCol].distance > grid[curRow][curCol].distance + 10 && !grid[curRow - 1][curCol].isWall) {
                grid[curRow - 1][curCol].distance = grid[curRow][curCol].distance + 10;
                grid[curRow - 1][curCol].prev = grid[curRow][curCol];
            }
        }
        if (curCol + 1 < grid[0].length && curRow + 1 < grid.length) {
            if (grid[curRow + 1][curCol + 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow + 1][curCol + 1].isWall) {
                grid[curRow + 1][curCol + 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow + 1][curCol + 1].prev = grid[curRow][curCol];
            }

        }
        if (curCol - 1 >= 0 && curRow - 1 >= 0) {
            if (grid[curRow - 1][curCol - 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow - 1][curCol - 1].isWall) {
                grid[curRow - 1][curCol - 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow - 1][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow + 1 < grid.length && curCol - 1 >= 0) {
            if (grid[curRow + 1][curCol - 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow + 1][curCol - 1].isWall) {
                grid[curRow + 1][curCol - 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow + 1][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow - 1 >= 0 && curCol + 1 < grid[0].length) {
            if (grid[curRow - 1][curCol + 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow - 1][curCol + 1].isWall) {
                grid[curRow - 1][curCol + 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow - 1][curCol + 1].prev = grid[curRow][curCol];
            }
        }
        animate.push([curRow, curCol]);
        visited.push(grid[curRow][curCol]);
        grid[curRow][curCol].visited = true;
        unvistited.sort((a, b) => (a.distance - b.distance));

        while (unvistited[0].visited == true) {
            unvistited.shift();
        }
        if (unvistited[0].distance == Infinity) {
            return [];
        }
        return dijkstraHelper([unvistited[0].row, unvistited[0].col], end, visited, unvistited, grid, animate);
    }
}

export const astar = (start, end, grid, animate) => {
    var visited = [];
    const unvistited = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            unvistited.push([grid[i][j],distancetoEnd([i,j],end)]);
        }
    }

    var startNode = grid[start[0]][start[1]];
    var endNode = grid[end[0]][end[1]];
    startNode.distance = 0;
    return astarHelper(start, end, visited, unvistited, grid, animate);

}
function astarHelper(cur, end, visited, unvistited, grid, animate) {
    var curRow = cur[0];
    var curCol = cur[1];
    if (curRow == end[0] && curCol == end[1]) {
        var path = [];
        var curNode = grid[curRow][curCol];
        animate.push([curRow, curCol]);
        while (curNode.distance != 0) {
            path.push([curNode.row, curNode.col]);
            curNode = curNode.prev;
        }
        path.push([curNode.row, curNode.col]);
        return path;
    }
    else {
        if (curCol + 1 < grid[0].length) {
            if (grid[curRow][curCol + 1].distance > grid[curRow][curCol].distance + 10 && !grid[curRow][curCol + 1].isWall) {
                grid[curRow][curCol + 1].distance = grid[curRow][curCol].distance + 10;
                grid[curRow][curCol + 1].prev = grid[curRow][curCol];
            }

        }
        if (curCol - 1 >= 0) {
            if (grid[curRow][curCol - 1].distance > grid[curRow][curCol].distance + 10 && !grid[curRow][curCol - 1].isWall) {
                grid[curRow][curCol - 1].distance = grid[curRow][curCol].distance + 10;
                grid[curRow][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow + 1 < grid.length) {
            if (grid[curRow + 1][curCol].distance > grid[curRow][curCol].distance + 10 && !grid[curRow + 1][curCol].isWall) {
                grid[curRow + 1][curCol].distance = grid[curRow][curCol].distance + 10;
                grid[curRow + 1][curCol].prev = grid[curRow][curCol];
            }
        }
        if (curRow - 1 >= 0) {
            if (grid[curRow - 1][curCol].distance > grid[curRow][curCol].distance + 10 && !grid[curRow - 1][curCol].isWall) {
                grid[curRow - 1][curCol].distance = grid[curRow][curCol].distance + 10;
                grid[curRow - 1][curCol].prev = grid[curRow][curCol];
            }
        }
        if (curCol + 1 < grid[0].length && curRow + 1 < grid.length) {
            if (grid[curRow + 1][curCol + 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow + 1][curCol + 1].isWall) {
                grid[curRow + 1][curCol + 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow + 1][curCol + 1].prev = grid[curRow][curCol];
            }

        }
        if (curCol - 1 >= 0 && curRow - 1 >= 0) {
            if (grid[curRow - 1][curCol - 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow - 1][curCol - 1].isWall) {
                grid[curRow - 1][curCol - 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow - 1][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow + 1 < grid.length && curCol - 1 >= 0) {
            if (grid[curRow + 1][curCol - 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow + 1][curCol - 1].isWall) {
                grid[curRow + 1][curCol - 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow + 1][curCol - 1].prev = grid[curRow][curCol];
            }
        }
        if (curRow - 1 >= 0 && curCol + 1 < grid[0].length) {
            if (grid[curRow - 1][curCol + 1].distance > grid[curRow][curCol].distance + 14 && !grid[curRow - 1][curCol + 1].isWall) {
                grid[curRow - 1][curCol + 1].distance = grid[curRow][curCol].distance + 14;
                grid[curRow - 1][curCol + 1].prev = grid[curRow][curCol];
            }
        }
        animate.push([curRow, curCol]);
        visited.push(grid[curRow][curCol]);
        grid[curRow][curCol].visited = true;
        
        unvistited.sort((a, b) => ((a[0].distance+a[1]) - (b[0].distance+b[1])));
        var dupl = [];
        var fCost = unvistited[0][0].distance+unvistited[0][1];
        var i = 0;
        while(unvistited[i][0].distance + unvistited[i][1] == fCost){
            dupl.push(unvistited[i]);
            i++;
        }
        dupl.sort((a,b)=> a[1]-b[1]);
        for(let i = 0 ; i < dupl.length ; i++){
            unvistited[i] = dupl[i];
        }
        console.log(unvistited);
        while (unvistited[0][0].visited == true) {
            unvistited.shift();
        }
        if (unvistited[0][0].distance == Infinity) {
            return [];
        }
        return astarHelper([unvistited[0][0].row, unvistited[0][0].col], end, visited, unvistited, grid, animate);
    }
}
export const verticalMaze = (start, end, grid, animate) => {
    for (let i = 0; i < grid.length; i++) {
        animate.push([i, 0]);
        animate.push([i, grid[0].length - 1]);
    }
    for (let i = 0; i < grid[0].length; i++) {
        animate.push([0, i]);
        animate.push([grid.length - 1, i]);
    }
    for (let i = 2; i < grid[0].length; i += 2) {
        var anim = 0;
        for (let j = 1; j < grid.length - 2; j++) {
            if (randomInt(0, 3) != 2) {
                animate.push([j, i]);
                anim++;
            }
        }
        if (anim != grid.length - 3) {
            animate.push([grid.length - 2, i]);
        }

    }
}
export const horizontalMaze = (start, end, grid, animate) => {
    for (let i = 0; i < grid.length; i++) {
        animate.push([i, 0]);
        animate.push([i, grid[0].length - 1]);
    }
    for (let i = 0; i < grid[0].length; i++) {
        animate.push([0, i]);
        animate.push([grid.length - 1, i]);
    }
    for (let i = 2; i < grid.length; i += 2) {
        var anim = 0;
        for (let j = 1; j < grid[0].length; j++) {
            var rand = randomInt(0, 8);
            if (rand > 2) {
                animate.push([i, j]);
                anim++;
            }
        }

    }
}
export const primsAlgorithms = (grid, animate) => {
    var wall = [];
    var pillar = [];
    var room = [];
    for (let i = 0; i < grid.length; i++) {
        var place = false;
        for (let j = 0; j < grid[i].length; j++) {
            if (i == 0 || j == 0 || i == grid.length - 1 || j == grid[i].length - 1) {
                animate.push([i, j, 0]);
                if (j % 2 == 0 && i % 2 == 0) {
                    pillar.push([i, j]);
                }
                else {
                    wall.push([i, j, 0]);
                }
            }
            else if (i % 2 == 0) {
                animate.push([i, j, 0]);
                if (j % 2 == 0) {
                    pillar.push([i, j]);
                }
                else {
                    wall.push([i, j, 0]);
                }
            }
            else {
                if (place) {
                    animate.push([i, j, 0]);
                    wall.push([i, j, 0]);
                    place = false;
                }
                else {
                    room.push([i, j]);
                    place = true;
                }
            }
        }
    }
    var start = room[randomInt(0, room.length - 1)];
    var path = [start];
    var walls = [];
    if (start[0] - 1 >= 0) {
        walls.push([start[0] - 1, start[1]])
    }
    if (start[0] + 1 < grid.length) {
        walls.push([start[0] + 1, start[1]])
    }
    if (start[1] - 1 >= 0) {
        walls.push([start[0], start[1] - 1])
    }
    if (start[1] + 1 < grid[0].length) {
        walls.push([start[0], start[1] + 1])
    }
    while (walls.length != 0) {

        var rand = randomInt(0, walls.length - 1);
        var curWall = walls[rand];
        var curRooms = [];
        if (arrContains(room, [curWall[0] + 1, curWall[1]])) {
            curRooms.push([curWall[0] + 1, curWall[1]]);
        }
        if (arrContains(room, [curWall[0] - 1, curWall[1]])) {
            curRooms.push([curWall[0] - 1, curWall[1]]);
        }
        if (arrContains(room, [curWall[0], curWall[1] + 1])) {
            curRooms.push([curWall[0], curWall[1] + 1]);
        }
        if (arrContains(room, [curWall[0], curWall[1] - 1])) {
            curRooms.push([curWall[0], curWall[1] - 1]);
        }
        var firstRoom = false;
        var secondRoom = false;

        if (curRooms.length > 1) {
            firstRoom = arrContains(path, curRooms[0]) && !arrContains(path, curRooms[1]);
            secondRoom = arrContains(path, curRooms[1]) && !arrContains(path, curRooms[0]);
        }

        if (curRooms.length == 2 && (firstRoom || secondRoom)) {
            animate.push([curWall[0], curWall[1], 1]);
            wall[getIndex(wall, curWall)][2] = 1;
            var unVisRoom;
            if (firstRoom) {
                unVisRoom = curRooms[1];
            }
            else {
                unVisRoom = curRooms[0];
            }
            path.push(unVisRoom);
            if (arrContains(wall, [unVisRoom[0] - 1, unVisRoom[1]])) {
                walls.push([unVisRoom[0] - 1, unVisRoom[1]])
            }
            if (arrContains(wall, [unVisRoom[0] + 1, unVisRoom[1]])) {
                walls.push([unVisRoom[0] + 1, unVisRoom[1]])
            }
            if (arrContains(wall, [unVisRoom[0], unVisRoom[1] - 1])) {
                walls.push([unVisRoom[0], unVisRoom[1] - 1])
            }
            if (arrContains(wall, [unVisRoom[0], unVisRoom[1] + 1])) {
                walls.push([unVisRoom[0], unVisRoom[1] + 1])
            }
        }
        walls.splice(rand, 1);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function arrContains(arr, array) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == array[0] && arr[i][1] == array[1]) {
            return true;
        }
    }
    return false;
}
function getIndex(arr, array) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == array[0] && arr[i][1] == array[1]) {
            return i;
        }
    }
    return -1;
}
function distancetoEnd(cur,end){
    return (Math.sqrt((end[0]-cur[0])**2+(end[1]-cur[1])**2))*10;
}