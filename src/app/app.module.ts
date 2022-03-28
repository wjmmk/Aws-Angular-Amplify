import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import awsconfig from '../aws-exports';
import Amplify from 'aws-amplify';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ApiComponent } from './api/api.component';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ApiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
