import { FacebookWebService } from './facebook.service';
import { FacebookService } from '@sonder/features/auth';

export const AUTH_PROVIDERS = [
  { provide: FacebookService, useClass: FacebookWebService }
];

export * from './facebook.service';
