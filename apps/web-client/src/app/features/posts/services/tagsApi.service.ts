import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models';
import { BackendService } from '../../auth/services/backend.service';

@Injectable()
export class TagsApiService {
  constructor(private backend: BackendService) { }

  getTags(params: any = {}): Observable<any> {
    return this.backend
      .get('/tags', ...params);
  }
}
