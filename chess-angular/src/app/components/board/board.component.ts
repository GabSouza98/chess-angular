import { Component, OnInit } from '@angular/core';
import { GameEngine } from 'src/app/models/GameEngine';
import { Coordinates, Board, Square, createSquare } from 'src/app/models/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board = [];
  gameEngine!: GameEngine;

  darkColor = "grey";
  lightColor = "white";
  availableColor = "lime";

  previousCoordinate?: Coordinates | null;

  ngOnInit(): void {
    this.board = this.initializeBoard();
    this.gameEngine = new GameEngine(this.board);
    console.log(this.board);
  }

  

  getColor(x: number, y: number): string {
    let highlight: boolean = this.board[y][x].highlighted;

    if (highlight) return this.availableColor;

    return (x + y) % 2 === 0 ? this.lightColor : this.darkColor;
  }

  onClickedSquare(coord: Coordinates): void {

    if (this.previousCoordinate) {

      if (this.isSameCoordinate(coord)) {
        this.resetSelection();
        return;
      }

      if (this.isSameTeam(coord)) {
        this.resetSelection();
        this.selectPiece(coord);
        return;
      }

      this.makeMove(coord);
      this.resetSelection();

      return;
    }

    if (this.hasPiece(coord)) {
      this.selectPiece(coord);
      this.gameEngine.getAllowedSquares(coord.row, coord.col);
    }
  }

  isSameCoordinate(coord: Coordinates): boolean {
    return this.previousCoordinate?.row == coord.row && this.previousCoordinate.col == coord.col;
  }

  isSameTeam(coord: Coordinates): boolean {
    let originPiece = this.board[this.previousCoordinate!.row][this.previousCoordinate!.col].piece;
    let originTeam = originPiece[0];
    let destinationPiece = this.board[coord.row][coord.col].piece;
    let destinationTeam = destinationPiece[0];
    return originTeam === destinationTeam;
  }

  hasPiece(coord: Coordinates): boolean {
    let piece = this.board[coord.row][coord.col].piece;
    return piece != "";
  }

  selectPiece(coord: Coordinates): void {
    //what if previous coordinate is attribute of gameEngine?
    this.previousCoordinate = coord;
    this.board[coord.row][coord.col].highlighted = true;    
  }

  makeMove(coord: Coordinates): void {
    if (this.previousCoordinate) {

      // com bug de animacao
      // let piece = this.board[this.previousCoordinate.row][this.previousCoordinate.col];    
      // this.board[this.previousCoordinate.row][this.previousCoordinate.col] = "";    
      // this.board[coord.row][coord.col] = piece; 

      //sem bug de animação. O [...spread] não faz deep copy para arrays bidimensionais
      //https://holycoders.com/javscript-copy-array/
      let updatedBoard = [];
      for (var i = 0; i < this.board.length; i++)
        updatedBoard[i] = this.board[i].slice();

      let piece = updatedBoard[this.previousCoordinate.row][this.previousCoordinate.col].piece;
      updatedBoard[this.previousCoordinate.row][this.previousCoordinate.col].piece = "";
      updatedBoard[coord.row][coord.col].piece = piece;
      this.board = updatedBoard;
    }
  }

  resetSelection(): void {

    this.board.map((row: Square[]) => {
      row.map((square: Square) => {
        square.highlighted = false;
      })
    });

    //what if previous coordinate is attribute of gameEngine?
    this.previousCoordinate = null;
  }


  initializeBoard(): Board {
    return [
      ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"].map((piece, col) =>
        createSquare(piece, col, 0, false, `${String.fromCharCode(97 + col)}8`)
      ),
      ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"].map((piece, col) =>
        createSquare(piece, col, 1, false, `${String.fromCharCode(97 + col)}7`)
      ),
      ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 2, false, `${String.fromCharCode(97 + col)}6`)
      ),
      ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 3, false, `${String.fromCharCode(97 + col)}5`)
      ),
      ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 4, false, `${String.fromCharCode(97 + col)}4`)
      ),
      ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 5, false, `${String.fromCharCode(97 + col)}3`)
      ),
      ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"].map((piece, col) =>
        createSquare(piece, col, 6, false, `${String.fromCharCode(97 + col)}2`)
      ),
      ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"].map((piece, col) =>
        createSquare(piece, col, 7, false, `${String.fromCharCode(97 + col)}1`)
      )
    ];
  }

}
