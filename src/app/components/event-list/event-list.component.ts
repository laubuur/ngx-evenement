import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ButtonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  service = inject(EventService);

  events: any[] = [];

  ngOnInit() {
    this.list();
  }

  list() {
    this.service.list().subscribe((result:any) => {
      if (result.data?.length) {
        this.events = result.data;
      }
    })
  }
}
