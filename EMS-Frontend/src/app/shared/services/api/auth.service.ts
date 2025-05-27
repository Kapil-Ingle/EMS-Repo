import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/'

  constructor(
    private http: HttpClient
  ) { }

  // Post request for Login, Signup and All
  authApiCall(endPoint: string, request: any){
    return this.http.post(`${this.apiUrl}${endPoint}`, request);
  }

  logoutApiCall(endPoint: string, request: any){
    const token = sessionStorage.getItem('authToken')
    // if(token){
      let newHeader = new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: `Bearer ${token}`
        Authorization: `Bearer ${token}`
      })
      return this.http.post(`${this.apiUrl}${endPoint}`,request,{ headers: newHeader })
    // }
  }

  // Common get request for All
  getData(endPoint: string){
    return this.http.get(`${this.apiUrl}${endPoint}`)
  }
  
}
