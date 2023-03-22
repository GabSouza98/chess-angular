import { Component, OnInit } from '@angular/core';
import { Coordinates } from 'src/app/models/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: string[][] = [];

  darkColor = "grey";
  lightColor = "white";
  availableColor = "lime";

  allowedSquares: number[][] = [];

  previousCoordinate?: Coordinates | null;

  ngOnInit(): void {
    this.initializeBoard();    
  }

  initializeBoard() : void {
    this.board = [
      ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
      ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
      ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
    ]
  }

  getColor(x : number, y : number) : string {

    let color = null;

    this.allowedSquares.forEach( pair => {
      if(pair[0] === y && pair[1] === x) {
        color = this.availableColor;
      }
    })

    if(color) return color;    

    return (x + y) % 2 === 0 ? this.lightColor : this.darkColor;
  }

  onClickedSquare(coord : Coordinates) : void {

    if(this.previousCoordinate) {      

      if(this.isSameCoordinate(coord)) {        
        this.resetSelection();
        return;
      }

      if(this.isSameTeam(coord)) {
        this.resetSelection();
        this.selectPiece(coord);
        return;
      }

      this.makeMove(coord);
      this.resetSelection();

      return;
    }
      
    if(this.hasPiece(coord)) {        
      this.selectPiece(coord);
    }    
  } 

  isSameCoordinate(coord : Coordinates) : boolean {
    return this.previousCoordinate?.row == coord.row && this.previousCoordinate.col == coord.col;
  }  

  isSameTeam(coord: Coordinates) : boolean {
    let originPiece = this.board[this.previousCoordinate!.row][this.previousCoordinate!.col]; 
    let originTeam = originPiece[0];
    let destinationPiece = this.board[coord.row][coord.col];
    let destinationTeam = destinationPiece[0];    
    return originTeam === destinationTeam;
  }

  hasPiece(coord: Coordinates) : boolean {
    let piece = this.board[coord.row][coord.col]; 
    return piece != "";
  }

  selectPiece(coord : Coordinates) : void {
    this.previousCoordinate = coord;
    this.allowedSquares.push([coord.row, coord.col]);
  }

  makeMove(coord: Coordinates) : void {
    if(this.previousCoordinate) {

      // com bug de animacao
      let piece = this.board[this.previousCoordinate.row][this.previousCoordinate.col];    
      this.board[this.previousCoordinate.row][this.previousCoordinate.col] = "";    
      this.board[coord.row][coord.col] = piece; 

      //sem bug de animação. O [...spread] não faz deep copy para arrays bidimensionais
      //https://holycoders.com/javscript-copy-array/
      // let updatedBoard = [];
      // for (var i = 0; i < this.board.length; i++)
      //   updatedBoard[i] = this.board[i].slice();   

      // let piece = updatedBoard[this.previousCoordinate.row][this.previousCoordinate.col];    
      // updatedBoard[this.previousCoordinate.row][this.previousCoordinate.col] = "";    
      // updatedBoard[coord.row][coord.col] = piece; 
      // this.board = updatedBoard;
    }    
  }

  resetSelection() : void {
    this.allowedSquares = [];
    this.previousCoordinate = null;
  }
}
