import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { EventTypeService } from '../../services/event-type.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, CalendarModule, DropdownModule,InputNumberModule, ButtonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent {

  service = inject(EventService);
  eventTypeService = inject(EventTypeService);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);
  router = inject(Router);

  event = {
    description: '',
    address: '',
    date: {},
    price: 0,
    eventTypeId: null,
    title: ''
  }

  isNew = true;
  isEditable = false;
  eventTypes: any = [];

  ngOnInit() {
    this.listEventType();
    this.route.params.subscribe(params => {
      if (params['id']) {
        if (params['id'] !== 'new') {
          this.isNew = false;
          this.read(params['id']);
        }
        else {
          this.isEditable = true;
        }
      }
    });
  }

  read(id: string) {
    this.service.read(id).subscribe((result: any) => {
      result.data.date = new Date(result.data.date);
      this.event = result.data;
      console.log('date', result);
    });
  }

  create() {
    this.service.create(this.event).subscribe(
      result => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Evenement bien crée'
        });

        this.router.navigate(['/events']);
      }
    )
  }

  update() {
    this.service.update(this.event).subscribe(result => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Evenement bien enregistré'
      });
      this.router.navigate(['/events']);
    });
  }

  listEventType() {
    this.eventTypeService.list().subscribe((result:any) => {
      this.eventTypes = result.data;
    });
  }
}
