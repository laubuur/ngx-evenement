import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected http = inject(HttpClient);
  protected authService = inject(AuthService);
  protected baseUri = 'http://localhost:4501/';
  protected entityName = '';
   

  public create(data: any) {
    return this.http.post(this.baseUri+this.entityName, {data});
  }

  public list() {
    return this.http.get<any[]>(this.baseUri+this.entityName);
  }

  public remove(id: number) { 
    return this.http.delete(this.baseUri+this.entityName+'/'+id);
  }
 
  protected getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer '+this.authService.secret
    });
  }
}
