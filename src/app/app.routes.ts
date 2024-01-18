import { Routes } from '@angular/router';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';

export const routes: Routes = [
    {
        path: 'eventType',
        component: EventTypeComponent
    },
    {
        path: 'events',
        component: EventListComponent
    },
    {
        path: 'event/:id',
        component: EventDetailComponent
    }
];
