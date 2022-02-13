import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { StandupDataService } from '../services/standup-data.service';

@Injectable({
  providedIn: 'root'
})
export class StandupDataLoadedGuard implements CanActivate {

  constructor(
    private standupDataService: StandupDataService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.standupDataService.standupData$.value) {
      return this.router.parseUrl('/home');
    } else {
      return true;
    }
  }
  
}
