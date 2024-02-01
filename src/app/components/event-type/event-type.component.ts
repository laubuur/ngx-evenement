import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventTypeService } from '../../services/event-type.service';

@Component({
  selector: 'app-event-type',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './event-type.component.html',
  styleUrl: './event-type.component.scss'
})
export class EventTypeComponent {
  newEventName = '';
  service = inject(EventTypeService);
  types: any = [];
  error = '';

  list$ = this.service.list();

  ngOnInit() {
    this.list();
  }

  apply() {
    this.error = '';
    this.service.create(this.newEventName).subscribe(
      (result: any) => {
        if (result.data.id) {
          this.list();
        }
        else {
          this.error = result.data;
        }
      }
    );
  }

  list() {
    this.service.list().subscribe((result: any) => {
      this.types = result.data;
    })
  }

  remove(id: number) {
    this.service.remove(id).subscribe((result: any) => {
      this.list();
    })
  }
}
