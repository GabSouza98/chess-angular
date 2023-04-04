export interface Coordinates {
    row: number;
    col: number;
}

export interface Square {
    piece: string,
    col: number,
    row: number,
    highlighted: boolean,
    name: string
}

export function createSquare(piece: string, col: number, row: number, highlighted: boolean, name: string): Square {
    return { piece, col, row, highlighted, name };
}

export type Board = Square[][];

const chessBoard: Square[][] = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"].map((piece, col) =>
        createSquare(piece, col, 0, false, `${String.fromCharCode(97 + col)}1`)
    ),
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"].map((piece, col) =>
        createSquare(piece, col, 1, false, `${String.fromCharCode(97 + col)}2`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 2, false, `${String.fromCharCode(97 + col)}3`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 3, false, `${String.fromCharCode(97 + col)}4`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 4, false, `${String.fromCharCode(97 + col)}5`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 5, false, `${String.fromCharCode(97 + col)}6`)
    ),
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"].map((piece, col) =>
        createSquare(piece, col, 6, false, `${String.fromCharCode(97 + col)}7`)
    ),
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"].map((piece, col) =>
        createSquare(piece, col, 7, false, `${String.fromCharCode(97 + col)}8`)
    )
];