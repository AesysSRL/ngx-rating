import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  settings = {
    items: [
      {
        id: 1,
        description: 'ITEM 1 DESCRIPTION',
        color: {
          red: 180,
          green: 230,
          blue: 245
        }
      },
      {
        id: 2,
        description: 'ITEM 2 DESCRIPTION'
      },
      {
        id: 3,
        description: 'ITEM 3 DESCRIPTION',
      },
      {
        id: 4,
        description: 'ITEM 4 DESCRIPTION',
      },
      {
        id: 5,
        description: 'ITEM 5 DESCRIPTION',
        color: {
          red: 0,
          green: 90,
          blue: 141
        }
      },
    ],
    theme: 'rounded_squares',
    itemDetail: {
      width: 70,
      height: 8
    },
    showTitle: true,
    titlePosition: 'top'
  }

  constructor() {
    console.log('AAAAAAA')
   }

  ngOnInit(): void {
  }

}
