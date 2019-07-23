import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  values: Map<string, number> = new Map<string, number>();

  get(key: string): number {
    return this.values.get(key);
  }
  set(key: string, value: number) {
    this.values.set(key, value);
  }

  constructor() { }
}
