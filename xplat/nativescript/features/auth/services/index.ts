import { FacebookTnsService } from './facebook.service';
import { FacebookService } from '@sonder/features/auth';

export const AUTH_PROVIDERS = [
  { provide: FacebookService, useClass: FacebookTnsService }
];

export * from './facebook.service';
