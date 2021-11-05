import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-rating';


  settings = {
    items: [
      {
        id: 1,
        name: 'ITEM 1',
        description: 'ITEM 1 DESCRIPTION'
      },
      {
        id: 2,
        name: 'ITEM 2',
        description: 'ITEM 2 DESCRIPTION'
      },
      {
        id: 3,
        name: 'ITEM 3',
        description: 'ITEM 3 DESCRIPTION'
      },
      {
        id: 4,
        name: 'ITEM 4',
        description: 'ITEM 4 DESCRIPTION'
      },
      {
        id: 5,
        name: 'ITEM 5',
        description: 'ITEM 5 DESCRIPTION'
      },
    ]
  }

  control = new FormControl({
    id: 3,
    name: 'ITEM 3',
    description: 'ITEM 3 DESCRIPTION'
  });

  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe(x => console.log('value', x));
  }


}
