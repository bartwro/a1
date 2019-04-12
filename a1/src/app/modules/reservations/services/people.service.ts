import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private all: Person[] = [
    {id: 0, firstName: 'Donald', lastName: 'Duck'},
    {id: 1, firstName: 'Bart', lastName: 'Starczewski'},
    {id: 2, firstName: 'John', lastName: 'Butcher'}
  ];

  constructor() { }

  getAll(): Observable<Person> {
    return from(this.all);
  }

}
