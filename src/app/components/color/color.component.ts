import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor:Color|null;
  constructor(private colorService: ColorService) { }
  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setCurrentColor(color:Color)
  {
  this.currentColor = color;
  }

  getCurrentColorClass(color:Color)
  {
    if(color == this.currentColor)
    {
       return "list-group-item  bg-secondary active"
    }
    else
    {
        return "list-group-item bg-light"
    }
  }

  getAllColorClass()
  {
    if( !this.currentColor)
    {
      return "list-group-item  bg-dark text-center text-light active"
    }
    else
    {
      return "list-group-item  bg-dark text-center text-light"
    }
  }

  reset()
  {
    this.currentColor = null;
  }
}
