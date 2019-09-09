import { Component, OnInit, ViewChild } from '@angular/core';
import {CrudService} from "../services/crud.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";

declare var $;
@Component({
  selector: 'app-multibatch',
  templateUrl: './multibatch.component.html',
  styleUrls: ['./multibatch.component.scss']
})
export class MultibatchComponent implements OnInit {
  public multiproducts: any = [];
  @ViewChild('multiproductsTable',{static:false}) Table;
  public dataTable: any;
  productForm: FormGroup;

  productID: any;
  productData: any;


  constructor(private fb: FormBuilder, private crudService: CrudService, private router: Router,  private actRoute: ActivatedRoute) { 
    this.productForm = this.fb.group({
      // name: ['', Validators.required],
      // desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      // price: ['', Validators.compose([Validators.required])],
      mobiles:this.fb.array([
        // this.fb.control('')
        // this.fb.control({
        //   name: ['', Validators.required],
        //   desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        //   price: ['', Validators.compose([Validators.required])],
        // })
      ])
    });
    
  }

  ngOnInit() {
    this.loadMultiProducts();
  }

  
  loadMultiProducts(){
    this.crudService.getMultiProducts().subscribe(
        productData => {
          this.multiproducts = productData;
          this.dataTable = $(this.Table.nativeElement);
          this.dataTable.DataTable();
          // setTimeout(()=>{this.dataTable.DataTable();}, 2000);
          this.dataTable.reload();
        }
    );
  }

  // counter:number; 
  // this.counter=0;
    // for(let mob of this.mobiles.controls){
    //   productData.append('mobiles', values.mobiles);
    //   this.counter = this.counter+1;

    get mobiles(){
      return this.productForm.get('mobiles') as FormArray;
    }

    addNewMobile(){
      // this.mobiles.push(this.fb.control(''));
      this.mobiles.push(
        this.fb.group({
          name: [''],
          desc: [''],
          price: ['']
        }))
    }

    removeMobile(index)
      {
        this.mobiles.removeAt(index);
      }


      // saveMultiProduct(values){
      //   // alert("SD");
      //   // const productData = new FormData();
      //   // productData.append('name', values.name);
      //   // productData.append('description', values.desc);
      //   // productData.append('price', values.price);
      //   // this.crudService.createMultipleProduct(productData).subscribe(result => {
      //   //   this.router.navigate(['multibatch']);
      //   //   // this.loadProducts();
      //   //   // this.dataTable.reload();
      //   // });
      //   let arr = new FormArray([])
      //   values.mobiles.forEach(y => {
      //     arr.push(this.fb.group({ 
      //       name: y.name,
      //       desc: y.desc,
      //       price: y.price
      //     }))
      //     this.crudService.createMultipleProduct(productData).subscribe(result => {
      //         this.router.navigate(['multibatch']);
      //         // this.loadProducts();
      //         // this.dataTable.reload();
      //       });
      //   })
      //   return arr;
        
      // }


      saveMultiProduct(values){
        let arr = new FormArray([])
        values.mobiles.forEach(y => {
          arr.push(this.fb.group({ 
            name: y.name,
            desc: y.desc,
            price: y.price
          }))
          const productData = new FormData();
          productData.append('name', y.name);
          productData.append('description', y.desc);
          productData.append('price', y.price);
          this.crudService.createMultipleProduct(productData).subscribe(result => {
            this.router.navigate(['multibatch']);
            this.loadMultiProducts();
          });
        });
        return arr;
        
      }


      // setProjects(x) {
      //   let arr = new FormArray([])
      //   x.projects.forEach(y => {
      //     arr.push(this.fb.group({ 
      //       projectName: y.projectName 
      //     }))
      //   })
      //   return arr;
      // }
      
}
