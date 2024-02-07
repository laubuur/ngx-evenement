import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { dateTodayValidator } from '../../validators/date-today.validator';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, InputTextareaModule, CalendarModule, DropdownModule,InputNumberModule, ButtonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent {

  service = inject(EventService);
  eventTypeService = inject(EventTypeService);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);
  router = inject(Router);
  fb = inject(FormBuilder);
  id?: number;

  form = this.fb.group({
    title: [{value: '', disabled: true,}, {validators: Validators.required, updateOn: 'blur'}],
    address: [{value: '', disabled: true}, Validators.required],
    date: [{value: null, disabled: true}, [Validators.required, dateTodayValidator()]],
    price: [{value: null, disabled: true}, Validators.min(10)],
    type: [{value: '', disabled: true}, Validators.required],
    description: [{value: '', disabled: true}, [Validators.required, Validators.minLength(5)]]
  });

  isNew = true;
  isEditable = false;
  eventTypes: any = [];
  today = new Date();

  ngOnInit() {
    this.listEventType();
    this.route.params.subscribe(params => {
      if (params['id']) {
        if (params['id'] !== 'new') {
          this.id = +params['id'];
          this.isNew = false;
          this.read(params['id']);
        }
        else {
          this.isEditable = true;
          this.form.enable();
        }
      }
    });
  }

  read(id: string) {
    this.service.read(id).subscribe((result: any) => {
      result.data.date = new Date(result.data.date);
      this.form.controls.title.setValue(result.data.title);
      this.form.controls.address.setValue(result.data.address);
      this.form.controls.date.setValue(result.data.date);
      this.form.controls.price.setValue(result.data.price);
      this.form.controls.type.setValue(result.data.eventTypeId);
      this.form.controls.description.setValue(result.data.description);
    });
  }

  create() {
    this.service.create(this.buildEvent()).subscribe(
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
    this.service.update(this.buildEvent()).subscribe(result => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Evenement bien enregistré'
      });
      this.router.navigate(['/events']);
    });
  }

  edit() {
    this.isEditable = true;
    this.form.enable();
  }

  private buildEvent() {
    return {
      id: this.id ?? undefined,
      title: this.form.controls.title.value,
      address: this.form.controls.address.value,
      date: this.form.controls.date.value,
      price: this.form.controls.price.value,
      eventTypeId: this.form.controls.type.value,
      description: this.form.controls.description.value
    }
  }

  listEventType() {
    this.eventTypeService.list().subscribe((result:any) => {
      this.eventTypes = result.data;
    });
  }

  test() {
    console.log(this.form);
  }
}
