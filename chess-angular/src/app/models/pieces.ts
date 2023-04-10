import { throwIfEmpty } from "rxjs";
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

    abstract getAllowedSquares(board: Board): Board;

    removeSameTeamSquares(board: Board): Board {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                let piece = board[row][col].piece;
                if (piece != '' && piece[0] === this.team) {
                    board[row][col].highlighted = false;
                }
            }
        }
        return board;
    }

}

export class Pawn extends Piece {

    override getAllowedSquares(board: Board): Board {

        if (this.team === 'b') {
            if (this.row + 1 < board.length) {
                board[this.row + 1][this.col].highlighted = true;

                if(board[this.row + 1][this.col].piece == '') {
                    if(this.row === 1) {
                        if (this.row + 2 < board.length) {
                            board[this.row + 2][this.col].highlighted = true;
                        }
                    }
                }
            }            
        }

        if (this.team === 'w') {
            if (this.row - 1 >= 0) {
                board[this.row - 1][this.col].highlighted = true;

                if(board[this.row - 1][this.col].piece == '') {
                    if(this.row === 6) {
                        if (this.row - 2 >= 0) {
                            board[this.row - 2][this.col].highlighted = true;
                        }
                    }
                }
            }            
        }

        return board;

    }

}

export class Rook extends Piece {

    override getAllowedSquares(board: Board): Board {

        for (let row = this.row + 1; row < board.length; row++) {
            board[row][this.col].highlighted = true;
            if (board[row][this.col].piece != '') break;
        }

        for (let row = this.row - 1; row >= 0; row--) {
            board[row][this.col].highlighted = true;
            if (board[row][this.col].piece != '') break;
        }

        for (let col = this.col + 1; col < board.length; col++) {
            board[this.row][col].highlighted = true;
            if (board[this.row][col].piece != '') break;
        }

        for (let col = this.col - 1; col >= 0; col--) {
            board[this.row][col].highlighted = true;
            if (board[this.row][col].piece != '') break;
        }

        return board;
    }

}

export class Knight extends Piece {

    override getAllowedSquares(board: Board): Board {

        if (this.row + 2 < board.length && this.col + 1 < board.length) {
            board[this.row + 2][this.col + 1].highlighted = true;
        }

        if (this.row + 2 < board.length && this.col - 1 >= 0) {
            board[this.row + 2][this.col - 1].highlighted = true;
        }

        if (this.row - 2 >= 0 && this.col + 1 < board.length) {
            board[this.row - 2][this.col + 1].highlighted = true;
        }

        if (this.row - 2 >= 0 && this.col - 1 >= 0) {
            board[this.row - 2][this.col - 1].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col + 2 < board.length) {
            board[this.row + 1][this.col + 2].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col - 2 >= 0) {
            board[this.row + 1][this.col - 2].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col + 2 < board.length) {
            board[this.row - 1][this.col + 2].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col - 2 >= 0) {
            board[this.row - 1][this.col - 2].highlighted = true;
        }

        return board;
    }

}

export class Bishop extends Piece {

    override getAllowedSquares(board: Board): Board {

        let rate1 = this.row - this.col; //diagonal de cima para baixo e esquerda p direita        
        let rate2 = this.row + this.col; //diagonal de baixo para cima e esquerda p direita

        loop1: for (let row = this.row + 1; row < board.length; row++) {
            for (let col = this.col + 1; col < board.length; col++) {
                if(row - col === rate1) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop1;
                }                
            }
        }

        loop2: for (let row = this.row + 1; row < board.length; row++) {
            for (let col = this.col - 1; col >= 0; col--) {
                if(row + col === rate2) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop2;
                }
            }
        }

        loop3: for (let row = this.row - 1; row >= 0; row--) {
            for (let col = this.col + 1; col < board.length; col++) {
                if(row + col === rate2) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop3;
                }
            }
        }

        loop4: for (let row = this.row - 1; row >= 0; row--) {
            for (let col = this.col - 1; col >= 0; col--) {
                if(row - col === rate1) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop4;
                }                
            }
        }

        return board;

    }

}

export class Queen extends Piece {

    override getAllowedSquares(board: Board): Board {

        let rate1 = this.row - this.col; //diagonal de cima para baixo e esquerda p direita        
        let rate2 = this.row + this.col; //diagonal de baixo para cima e esquerda p direita

        loop1: for (let row = this.row + 1; row < board.length; row++) {
            for (let col = this.col + 1; col < board.length; col++) {
                if(row - col === rate1) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop1;
                }                
            }
        }

        loop2: for (let row = this.row + 1; row < board.length; row++) {
            for (let col = this.col - 1; col >= 0; col--) {
                if(row + col === rate2) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop2;
                }
            }
        }

        loop3: for (let row = this.row - 1; row >= 0; row--) {
            for (let col = this.col + 1; col < board.length; col++) {
                if(row + col === rate2) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop3;
                }
            }
        }

        loop4: for (let row = this.row - 1; row >= 0; row--) {
            for (let col = this.col - 1; col >= 0; col--) {
                if(row - col === rate1) {
                    board[row][col].highlighted = true;
                    if (board[row][col].piece != '') break loop4;
                }                
            }
        }

        for (let row = this.row + 1; row < board.length; row++) {
            board[row][this.col].highlighted = true;
            if (board[row][this.col].piece != '') break;
        }

        for (let row = this.row - 1; row >= 0; row--) {
            board[row][this.col].highlighted = true;
            if (board[row][this.col].piece != '') break;
        }

        for (let col = this.col + 1; col < board.length; col++) {
            board[this.row][col].highlighted = true;
            if (board[this.row][col].piece != '') break;
        }

        for (let col = this.col - 1; col >= 0; col--) {
            board[this.row][col].highlighted = true;
            if (board[this.row][col].piece != '') break;
        }

        return board;
    }

}

export class King extends Piece {

    override getAllowedSquares(board: Board): Board {

        //Diagonals
        if (this.row + 1 < board.length && this.col + 1 < board.length) {
            board[this.row + 1][this.col + 1].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col - 1 >= 0) {
            board[this.row + 1][this.col - 1].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col + 1 < board.length) {
            board[this.row - 1][this.col + 1].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col - 1 >= 0) {
            board[this.row - 1][this.col - 1].highlighted = true;
        }

        //Rook like
        if (this.row + 1 < board.length) {
            board[this.row + 1][this.col].highlighted = true;
        }

        if (this.row - 1 >= 0) {
            board[this.row - 1][this.col].highlighted = true;
        }

        if (this.col + 1 < board.length) {
            board[this.row][this.col + 1].highlighted = true;
        }

        if (this.col - 1 >= 0) {
            board[this.row][this.col - 1].highlighted = true;
        }

        return board;
    }

}

