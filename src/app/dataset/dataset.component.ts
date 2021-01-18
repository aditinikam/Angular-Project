import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})

export class DatasetComponent implements OnInit {

  links = [
    {data:'Sun'},
    {data:'Flower'},
    {data:'Pencil'},
    {data:'Umbrella'},
    {data:'House'},
    {data:'Spoon'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
