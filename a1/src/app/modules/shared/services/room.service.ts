import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../../reservations/models/room';
import { UrlProviderService } from './url-provider.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private urlProvider: UrlProviderService) { }

  public createNew(room: Room): Observable<Room>{
    const url = this
      .urlProvider
      .get("createRoomUrl");

    return this.http.post<Room>(
      url,
      room,
      httpOptions
      ).pipe(
        tap(
          data => {
            console.log(data);
          },
          error =>{
             console.log('error: '+error);
          }
        )
      )
      
  }
}
