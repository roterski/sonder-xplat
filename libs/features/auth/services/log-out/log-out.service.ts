import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(public router: Router) {}

  logOut(): Observable<boolean> {
    resetStores();
    return from(this.router.navigate(['/login']));
  }
}
