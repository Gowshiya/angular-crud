import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// const header = {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET',
//   'Access-Control-Allow-Origin': '*',
//   };

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  

  //base api url
  public url = 'http://localhost:8080/web_api/';
  // public url = 'https://www.cortasys.com/beta/angular/crud-api/';
  constructor(private http: HttpClient) { }

  getProducts(){
    // const httpOptions = new HttpHeaders(header); 
// return this.http.post(............... ,{}, {headers : httpOptions});
    return this.http.get(this.url + 'view.php');
  }

  getProductDetails(id){
    return this.http.get(this.url + 'view_one.php?id=' + id);
  }

  createProduct(data){
    return this.http.post(this.url + 'create.php', data);
  }

  updateProduct(data){
    return this.http.post(this.url + 'update.php', data);
  }

  deleteProduct(id){
    return this.http.get(this.url + 'delete.php?id=' + id);
  }

  createMultipleProduct(data){
    return this.http.post(this.url + 'multi-insert.php', data);
  }

  getMultiProducts(){
    // const httpOptions = new HttpHeaders(header); 
// return this.http.post(............... ,{}, {headers : httpOptions});
    return this.http.get(this.url + 'multi-view.php');
  }
}
