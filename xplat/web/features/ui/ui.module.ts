import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
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
  MatAutocompleteModule,
  MatRippleModule,
  MatRadioModule
} from '@angular/material';
import { UI_COMPONENTS } from './components';
import { UI_CONTAINERS } from './containers';

const MATERIAL_MODULES = [
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
  MatAutocompleteModule,
  MatRippleModule,
  MatRadioModule
];
const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  UISharedModule,
  FlexLayoutModule,
  ...MATERIAL_MODULES
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...UI_COMPONENTS, ...UI_CONTAINERS],
  declarations: [...UI_COMPONENTS, ...UI_CONTAINERS]
})
export class UIModule {}
