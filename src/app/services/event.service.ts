import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService {

  protected override entityName = 'event';

  read(id: string) {
    return this.http.get(this.baseUri+this.entityName+'/'+id);
  }

  update(data: any) {
    return this.http.post(this.baseUri+this.entityName+'/'+data.id, {data});
  }

}
