import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coordinates } from 'src/app/models/models';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() piece!: string;
  @Input() color!: string;
  @Input() row!: number;
  @Input() col!: number;
  @Input() highlighted!: boolean;

  @Output() clickedSquare = new EventEmitter<Coordinates>();

  constructor() {}

  public handleClick(event: MouseEvent) {
    let coord : Coordinates = {
      row: this.row,
      col: this.col
    }
    this.clickedSquare.emit(coord);
  }
  
}
