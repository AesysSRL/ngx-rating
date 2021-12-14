import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { facesSettings, rainbowSettings, simpleSettings } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  simpleSettings = simpleSettings;
  rainbowSettings = rainbowSettings;
  facesSettings = facesSettings;

  simplecontrol = new FormControl({
    id: 3,
    description: 'ITEM 3 DESCRIPTION',
  });

  rainbowControl = new FormControl({
    id: 10,
    description: 'ITEM 10 DESCRIPTION',
  });

  facesControl = new FormControl({
    id: 3,
    description: 'I AM HAPPY'
  })

  constructor() {}

  ngOnInit(): void {
    this.rainbowControl.disable();
    this.simplecontrol.valueChanges.subscribe(x => console.log('value simple', x));
    this.rainbowControl.valueChanges.subscribe(x => console.log('value rainbow', x));
    this.facesControl.valueChanges.subscribe(x => console.log('faces changes', x))

  }
}
