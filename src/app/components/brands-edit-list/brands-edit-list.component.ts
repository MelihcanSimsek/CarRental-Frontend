import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands-edit-list',
  templateUrl: './brands-edit-list.component.html',
  styleUrls: ['./brands-edit-list.component.css']
})
export class BrandsEditListComponent implements OnInit {

  brands:Brand[]=[];
  constructor(private brandService:BrandService) {
    
  }

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands  = response.data;
    })
   
  }


}
