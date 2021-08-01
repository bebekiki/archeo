import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { DecouvertesComponent } from './components/decouvertes/decouvertes.component';
import { AboutComponent } from './components/about/about.component';
import { DonsComponent } from './components/dons/dons.component';
import { DetailsComponent } from './components/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationsComponent,
    DecouvertesComponent,
    AboutComponent,
    DonsComponent,
    DetailsComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
