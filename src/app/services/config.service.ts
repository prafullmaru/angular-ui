import { Injectable } from '@angular/core';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  get apiUrl() {
    return env.apiBaseUrl;
  }

  constructor() { }
}