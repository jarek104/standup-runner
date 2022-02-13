import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

  @Input() name = '';
  @Input() duration?: number;
  @Input() active = false;

  constructor() { }

  ngOnInit(): void {
  }

}
