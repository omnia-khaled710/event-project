import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, delay, Observable, tap, finalize, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

private eventsSubject = new BehaviorSubject<Event[]>([]);
events$ = this.eventsSubject.asObservable();

private errorSubject = new BehaviorSubject<string | null>(null);
error$ = this.errorSubject.asObservable();

private loadingSubject = new BehaviorSubject<boolean>(false);
loading$ = this.loadingSubject.asObservable(); 


loadEvents(): Observable<Event[]> {
  if (this.eventsSubject.getValue().length > 0) {
    return this.events$;
  }
  this.loadingSubject.next(true);
  return this.httpClient
    .get<{ products: Event[] }>(this.apiUrl)
    .pipe(
      delay(1500),
      map(response => response.products),
      tap(events => {
        this.eventsSubject.next(events);
      }),
      catchError(error => {
        this.errorSubject.next('Failed to load events. Please try again.');
        return of([]);
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
}

addEvent(event: Event): Observable<Event> {
  return this.httpClient.post<Event>(`${this.apiUrl}/add`, event).pipe(
    tap((newEvent) => {
      const currentEvents = this.eventsSubject.value;
      const updatedEvents = [...currentEvents, newEvent]; 
      this.eventsSubject.next(updatedEvents); 
      return of(event);
    }),
    catchError((error) => {
      this.errorSubject.next('Failed to add event. Please try again.');
      return of(event); 
    })
  );

}

updateEvent(event: Event): Observable<Event> {  
  const payload = {
    title: event.title,
    price: event.price,
    description: event.description,
  };  
  return this.httpClient.put<Event>(`${this.apiUrl}/${event.id}`,payload).pipe(
    tap((updatedEvent) => {
      const currentEvents = this.eventsSubject.value;
      const updatedEvents = currentEvents.map(e => e.id === updatedEvent.id ? updatedEvent : e);
      this.eventsSubject.next(updatedEvents);
    }),
    catchError((error) => {
      this.errorSubject.next('Failed to update event. Reloading events...');
      return throwError(() => error);
    })
  );
}




deleteEvent(eventId: number): Observable<any> {
  return this.httpClient.delete<void>(`${this.apiUrl}/${eventId}`).pipe(
    tap(() => {
      const currentEvents = this.eventsSubject.value;
      const updatedEvents = currentEvents.filter(event => event.id !== eventId);
      this.eventsSubject.next(updatedEvents);
    }),
    catchError((error) => {
      this.errorSubject.next('Failed to delete event. Please try again.');
      return of([null]);
    })
  );
}

getEventById(eventId:number){
  return this.httpClient.get<Event>(`${this.apiUrl}/${eventId}`).pipe(
    catchError((error) => {
      this.errorSubject.next('Failed to get event. Please try again.');
      return of(null);
    })
  );
}
}