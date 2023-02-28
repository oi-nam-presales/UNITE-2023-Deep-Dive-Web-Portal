import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imx-sample-plugin',
  template: `
    <p>
      sample-plugin works!
    </p>
  `,
  styles: [
  ]
})
export class SamplePluginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
