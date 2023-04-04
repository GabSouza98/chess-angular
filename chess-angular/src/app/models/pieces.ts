import { Board, Square } from "./models";

export abstract class Piece {

    protected team: string;
    protected row: number;
    protected col: number;

    constructor(team: string, row: number, col: number) {
        this.team = team;
        this.row = row;
        this.col = col;
    }

    abstract getAllowedSquares(board: Board) : any;

}

export class Pawn extends Piece {

    override getAllowedSquares(board: Board) : Board {

        if(this.team === 'b') {
            if(this.row + 1 < board.length) {
                board[this.row + 1][this.col].highlighted = true;
            }
    
            if(this.row + 2 < board.length) {
                board[this.row + 2][this.col].highlighted = true;
            }
        }

        if(this.team === 'w') {
            if(this.row - 1 >= 0) {
                board[this.row - 1][this.col].highlighted = true;
            }
    
            if(this.row - 2 >= 0) {
                board[this.row - 2][this.col].highlighted = true;
            }
        }        

        return board;

    }

}

export class Rook extends Piece {

    override getAllowedSquares(board: Board) : Board {

        for(let row=this.row; row<board.length; row++) {
            board[row][this.col].highlighted = true;
        }

        for(let row=this.row; row>=0; row--) {
            board[row][this.col].highlighted = true;
        }

        for(let col=this.col; col<board.length; col++) {
            board[this.row][col].highlighted = true;
        }

        for(let col=this.col; col>=0; col--) {
            board[this.row][col].highlighted = true;
        }

        return board;
    }

}

export class Knight extends Piece {

    override getAllowedSquares(board: Board) : Board {

        if(this.row + 2 < board.length && this.col + 1 < board.length) {
            board[this.row + 2][this.col + 1].highlighted = true;
        }

        if(this.row + 2 < board.length && this.col - 1 >= 0) {
            board[this.row + 2][this.col - 1].highlighted = true;
        }

        if(this.row - 2 >= 0 && this.col + 1 < board.length) {
            board[this.row - 2][this.col + 1].highlighted = true;
        }

        if(this.row - 2 >= 0 && this.col - 1 >= 0) {
            board[this.row - 2][this.col - 1].highlighted = true;
        }

        if(this.row + 1 < board.length && this.col + 2 < board.length) {
            board[this.row + 1][this.col + 2].highlighted = true;
        }

        if(this.row + 1 < board.length && this.col - 2 >= 0) {
            board[this.row + 1][this.col - 2].highlighted = true;
        }

        if(this.row - 1 >= 0 && this.col + 2 < board.length) {
            board[this.row - 1][this.col + 2].highlighted = true;
        }

        if(this.row - 1 >= 0 && this.col - 2 >= 0) {
            board[this.row - 1][this.col - 2].highlighted = true;
        }        

        return board;
    }

}

export class Bishop extends Piece {

    override getAllowedSquares() : any {
        return null;
    }

}

export class Queen extends Piece {

    override getAllowedSquares() : any {
        return null;
    }

}

export class King extends Piece {

    override getAllowedSquares() : any {
        return null;
    }

}

