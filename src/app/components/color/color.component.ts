import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { faEdit, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  faEdit = faEdit;
  colors: Color[] = [];
  currentColor:Color|null;
  filterText:string="";

  
  constructor(private colorService: ColorService) { }
  ngOnInit(): void {
    this.getColors();
  }


  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data.sort((a,b) =>  (a.colorName > b.colorName ? 1 : -1));
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
      return "list-group-item  bg-warning text-center text-dark"
    }
    else
    {
      return "list-group-item  bg-warning text-center text-dark"
    }
  }

  reset()
  {
    this.currentColor = null;
  }
}
