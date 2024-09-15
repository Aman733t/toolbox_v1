import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PackagesModule { }
