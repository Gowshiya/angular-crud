import { Component, OnInit, ViewChild, Directive, Input } from '@angular/core';
import {CrudService} from "../../services/crud.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


declare var $;
@Component({
  selector: 'app-multipleform',
  templateUrl: './multipleform.component.html',
  styleUrls: ['./multipleform.component.scss']
})
export class MultipleformComponent implements OnInit {

  isDone = true;

  public products: any = [];
  @ViewChild('productsTable',{static:false}) Table;
  public dataTable: any;

  productID: any; //Getting Product id from URL
  productData: any;

  productForm: FormGroup;


  constructor(private crudService: CrudService, private router: Router, private actRoute: ActivatedRoute, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
    this.loadProducts();
    this. productID = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.productID); 
  }

  loadProducts(){
    this.crudService.getProducts().subscribe(
        productData => {
          this.products = productData;
          this.dataTable = $(this.Table.nativeElement);
          this.dataTable.DataTable();
          // setTimeout(()=>{this.dataTable.DataTable();}, 2000);
          this.dataTable.reload();
        }
    );
  }

  // loadProducts(){
  //   // if ($.fn.DataTable.isDataTable(this.Table.nativeElement) ) {
  //     // $(this.Table.nativeElement).dataTable().fnDestroy();
  //     //   }
  //       this.crudService.getProducts().subscribe(
  //         productData => {
  //         this.products = productData;
    
  //       this.dataTable = $(this.Table.nativeElement);
  //     // setTimeout(()=>{
  //     //   this.dataTable.DataTable();
  //     //   }, 2000);
    
  //           // },(err)=>{
  //           // }, ()=>{
  //           }
  //       );
  //     }
    

  getNavigation(link, id){
    if(id === ''){
        this.router.navigate([link]);
    } else {
        this.router.navigate([link + '/' + id]);
        this.productID = this.actRoute.snapshot.params['id'];
        this.loadProductDetails(this.productID);
    }
}

viewNavigation(link, id){
  this.isDone = false;
  if(id === ''){
      this.router.navigate([link]);
  } else {
      this.router.navigate([link + '/' + id]);
      this.productID = this.actRoute.snapshot.params['id'];
      this.viewProductDetails(this.productID);
  }
}



viewProductDetails(productID){
  this.crudService.getProductDetails(productID).subscribe(product => {
    this.productData = product;
  });
}

loadProductDetails(productID){
  this.crudService.getProductDetails(productID).subscribe(product => {
  this.productData = product;
  this.productForm.controls['name'].setValue(this.productData['p_name']);
  this.productForm.controls['desc'].setValue(this.productData['p_description']);
  this.productForm.controls['price'].setValue(this.productData['p_price']);
  });
  }

navigation(link){
  this.router.navigate([link]);
}

saveProduct(values){
  const productData = new FormData();
  productData.append('name', values.name);
  productData.append('description', values.desc);
  productData.append('price', values.price);
  this.crudService.createProduct(productData).subscribe(result => {
    this.router.navigate(['multipleform']);
    this.loadProducts();
    // this.dataTable.reload();
  });

}

updateProductData(values){
  const productData = new FormData();
  productData.append('id', this.productID);
  productData.append('name', values.name);
  productData.append('description', values.desc);
  productData.append('price', values.price);
  this.crudService.updateProduct(productData).subscribe(result=>{
  this.router.navigate(['multipleform']);
  this.productForm.reset();
          this.loadProducts();
          // this.dataTable.reload();
  })
  }

saveUpdateProductData(values){
  const productData = new FormData();
  // productData.append('id', this.productID);
  productData.append('name', values.name);
  productData.append('description', values.desc);
  productData.append('price', values.price);
  let pId = this.productID;
  // alert(pId);
      if(pId === void 0){
        this.crudService.createProduct(productData).subscribe(result => {
        this.router.navigate(['multipleform']);
        this.loadProducts();
        // this.dataTable.reload();
        });
      }
      else{
        productData.append('id', this.productID);
        this.crudService.updateProduct(productData).subscribe(result=>{
          this.router.navigate(['multipleform']);
          this.productForm.reset();
                  this.loadProducts();
                  // this.dataTable.reload();
          });
      }
}


  deleteProduct(pID) {
    this.crudService.deleteProduct(pID).subscribe(data => {
      this.loadProducts();
        })
    }

  

}
