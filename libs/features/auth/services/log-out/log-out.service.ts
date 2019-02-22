import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { resetStores } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor() {}

  logOut(): Observable<boolean> {
    resetStores();
    return of(true);
  }
}
