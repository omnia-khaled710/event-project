import {Component, OnInit} from '@angular/core';
import { EventService } from '../services/event.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Event } from '../models/event';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('500ms ease-in')),
      transition('in => out', animate('500ms ease-out')),
    ]),
  ],
})
export class EventListComponent implements OnInit {
  events$ = this.eventService.events$; 
  error$ = this.eventService.error$; 
  loading$ = this.eventService.loading$; 
  searchTerm:string='';

  constructor( private dialog:MatDialog,public eventService: EventService) {}
  

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.eventService.loadEvents().subscribe();
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: { event: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewEvent(result);
      }
    });
  }

  addNewEvent(event: Event) {
    this.eventService.addEvent(event).subscribe();
  }

  openEditEventDialog(event: Event): void {
   
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: { event:event, isEdit: true },

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedEventWithId = { ...result, id: event.id };
        this.updateEvent(updatedEventWithId); 
      }
    });
  }

  updateEvent(updatedEvent: Event): void {
    this.eventService.updateEvent(updatedEvent).subscribe();
  }

  deleteEvent(eventId: number) {
    if (confirm("Are you sure you want to delete this event?")) {
    this.eventService.deleteEvent(eventId).subscribe();    
    }
  }
}
