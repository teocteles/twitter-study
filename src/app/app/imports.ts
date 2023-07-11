import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from '../router/routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  MatDialogModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MomentModule.forRoot({
    relativeTimeThresholdOptions: {
      m: 59
    }
  }),
  BrowserAnimationsModule,
  CommonModule
];

export { imports };
