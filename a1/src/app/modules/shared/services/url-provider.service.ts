import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {

  private urls: Map<string, string> = new Map([
    ["createRoomUrl", "https://localhost:5001/api/room"]
  ]);

  constructor() { }

  public get(key: string): string{
    return this.urls.get(key);
  }
}
