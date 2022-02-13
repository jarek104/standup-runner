import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StandupData } from '../models/standup-data';

@Injectable({
  providedIn: 'root'
})
export class StandupDataService {

  standupData$ = new BehaviorSubject<StandupData | undefined>(undefined);

  constructor() { }
}
