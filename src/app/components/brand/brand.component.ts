import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand|null;
  filterText:string="";
  constructor(private brandService:BrandService){}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data.sort((a,b) =>  (a.brandName > b.brandName ? 1 : -1));
    })

  }

  setCurrentBrand(brand:Brand){
    this.currentBrand =brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand)
    {
      return "list-group-item bg-secondary active";
    }
    else{
      return "list-group-item  bg-light"
    }
  }

  getAllBrandClass()
  {
    if( !this.currentBrand)
    {
      return "list-group-item  bg-warning text-center text-dark "
    }
    else
    {
      return "list-group-item  bg-warning text-center text-dark"
    }
  }

  reset(){
    this.currentBrand = null;
  }
}
