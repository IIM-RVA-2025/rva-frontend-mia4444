// Urađeno je...: Ovaj fajl konfiguriše glavnu Angular modul aplikacije.
// Opis: Deklariše komponente koje se koriste u aplikaciji i uvozi potrebne module
// (BrowserModule, HttpClientModule, FormsModule). Ovo je ulazna tačka za
// bootstrapping aplikacije.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelFormComponent } from './components/hotel/hotel-form/hotel-form.component';
import { DestinacijaComponent } from './components/destinacija/destinacija.component';
import { DestinacijaFormComponent } from './components/destinacija/destinacija-form/destinacija-form.component';
import { TuristickaAgencijaComponent } from './components/turisticka-agencija/turisticka-agencija.component';
import { TuristickaAgencijaFormComponent } from './components/turisticka-agencija/turisticka-agencija-form/turisticka-agencija-form.component';
import { AranzmanComponent } from './components/aranzman/aranzman.component';
import { AranzmanFormComponent } from './components/aranzman/aranzman-form/aranzman-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    HotelFormComponent,
    DestinacijaComponent,
    DestinacijaFormComponent,
    TuristickaAgencijaComponent,
    TuristickaAgencijaFormComponent,
    AranzmanComponent,
    AranzmanFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
