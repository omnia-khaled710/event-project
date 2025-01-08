import { Component } from '@angular/core';
import { EventService } from '../events/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(private eventService:EventService){
}
$events=this.eventService.loadEvents();
}
