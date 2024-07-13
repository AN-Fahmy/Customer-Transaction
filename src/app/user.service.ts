import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }
  getCustomers():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/customers')
  }
  getTransactions():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/transactions')
  }
}
