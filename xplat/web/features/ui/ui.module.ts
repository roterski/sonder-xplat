import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// libs
import { UISharedModule } from '@sonder/features';

import {
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTreeModule,
  MatIconModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatAutocompleteModule
} from '@angular/material';
import { LoadingSplashComponent } from './components';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  UISharedModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTreeModule,
  MatIconModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, LoadingSplashComponent],
  declarations: [LoadingSplashComponent]
})
export class UIModule {}
