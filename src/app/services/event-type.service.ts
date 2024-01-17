import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  private http = inject(HttpClient);

  constructor() { }

  public create(name: string) {
    return this.http.post('http://localhost:4501/eventType', {eventType: name});
  }

  public list() {
    return this.http.get('http://localhost:4501/eventType');
  }

  public remove(id: number) {
    return this.http.delete('http://localhost:4501/eventType/'+id);
  }

}
