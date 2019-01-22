import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FacebookService {
  public authenticateFacebook(): Observable<string> {
    throw new Error('must reimplement in each platform')
  }
}
