import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { rainbowSettings, simpleSettings } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-rating';


  simpleSettings = simpleSettings;
  rainbowSettings = rainbowSettings;

  simplecontrol = new FormControl({
    id: 3,
    description: 'ITEM 3 DESCRIPTION',
  });

  rainbowControl = new FormControl({
    id: 3,
    description: 'ITEM 3 DESCRIPTION',
  });


  constructor() {}

  ngOnInit(): void {
    this.simplecontrol.valueChanges.subscribe(x => console.log('value simple', x));
    this.rainbowControl.valueChanges.subscribe(x => console.log('value rainbow', x));

  }


}
