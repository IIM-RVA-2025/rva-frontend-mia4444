import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TuristickaAgencija } from '../../../models/turisticka-agencija.model';

@Component({
  selector: 'app-turisticka-agencija-form',
  templateUrl: './turisticka-agencija-form.component.html',
  styleUrls: ['./turisticka-agencija-form.component.css']
})
export class TuristickaAgencijaFormComponent implements OnInit {
  @Input() agencija: TuristickaAgencija | null = null;
  // Urađeno je...: Dodata kratka oznaka u fajl
  @Output() save = new EventEmitter<TuristickaAgencija>();
  @Output() cancel = new EventEmitter<void>();

  formData: TuristickaAgencija = {
    id: 0,
    naziv: '',
    adresa: '',
    kontakt: ''
  };

  ngOnInit() {
    if (this.agencija) {
      this.formData = { ...this.agencija };
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('TuristickaAgencijaFormComponent.onSubmit', this.formData);
      this.save.emit(this.formData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isFormValid(): boolean {
    return !!(this.formData.naziv && this.formData.adresa && this.formData.kontakt);
  }
}
