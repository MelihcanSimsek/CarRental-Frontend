import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors-edit-list',
  templateUrl: './colors-edit-list.component.html',
  styleUrls: ['./colors-edit-list.component.css']
})
export class ColorsEditListComponent implements OnInit{
  

  colors:Color[]=[];

  constructor(private colorService:ColorService) {
    
  }

  ngOnInit(): void {
    this.getColors();
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }
  
}
