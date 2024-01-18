import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService extends BaseService{

  protected override entityName = 'eventType'

}
