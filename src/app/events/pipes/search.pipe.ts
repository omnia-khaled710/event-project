import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(events: Event[], searchTerm: string): Event[] {
    searchTerm = searchTerm.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm)
    );
  }
}
