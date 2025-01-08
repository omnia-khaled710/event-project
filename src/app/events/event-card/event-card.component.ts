import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit{
constructor(private routerActive:ActivatedRoute,private eventService:EventService){

}
cardID!:any;
event!:any;
ngOnInit(): void {
  this.routerActive.paramMap.subscribe((params)=>{
    this.cardID = params.get('id');
    this.eventService.getEventById(this.cardID).subscribe((event)=>{
      this.event=event;
    })
  })
}

}
