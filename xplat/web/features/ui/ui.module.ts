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
  MatToolbarModule,
  MatAutocompleteModule
} from '@angular/material';
import { UI_COMPONENTS } from './components';
import { UI_CONTAINERS} from './containers';

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
  MatToolbarModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...UI_COMPONENTS, ...UI_CONTAINERS],
  declarations: [...UI_COMPONENTS, ...UI_CONTAINERS]
})
export class UIModule {}
