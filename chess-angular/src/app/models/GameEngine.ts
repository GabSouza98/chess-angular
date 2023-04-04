import { Board, Coordinates, Square } from "./models";
import { Piece, Pawn, Rook, Knight, Bishop, Queen, King } from "./pieces";

export class GameEngine {

    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }     

    hasPiece(coord: Coordinates): boolean {
        let piece = this.board[coord.row][coord.col].piece;
        return piece != "";
    }

    getAllowedSquares(row: number, col: number) {

        let team = this.board[row][col].piece[0];
        let pieceName = this.board[row][col].piece[1];

        let piece: Piece | null = this.getPiece(pieceName, team, row, col);

        if (piece) {
            let boardResult = piece.getAllowedSquares(this.board);
            console.log(boardResult);
        }

    }

    getPiece(pieceName: string, team: string, row: number, col: number): Piece | null {
        switch (pieceName) {
            case 'P':
                return new Pawn(team, row, col);
            case 'R':
                return new Rook(team, row, col);
            case 'N':
                return new Knight(team, row, col);
            case 'B':
                return new Bishop(team, row, col);
            case 'Q':
                return new Queen(team, row, col);
            case 'K':
                return new King(team, row, col);
            default:
                return null;
        }

    }    

}