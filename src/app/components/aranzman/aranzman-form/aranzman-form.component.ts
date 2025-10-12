import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Aranzman } from '../../../models/turisticka-agencija.model';
import { Hotel } from '../../../models/hotel.model';

@Component({
  selector: 'app-aranzman-form',
  templateUrl: './aranzman-form.component.html',
  styleUrls: ['./aranzman-form.component.css']
})
export class AranzmanFormComponent implements OnInit {
  @Input() aranzman: Aranzman | null = null;
  @Input() hoteli: Hotel[] = [];
  @Output() save = new EventEmitter<Aranzman>();
  @Output() cancel = new EventEmitter<void>();

  formData: Aranzman = {
    id: 0,
    ukupnaCena: 0,
    placeno: false,
    datumRealizacije: new Date().toISOString().split('T')[0],
    hotel: { id: 0, naziv: '', broj_zvezdica: 0, opis: '', destinacija: { id: 0, mesto: '', drzava: '', opis: '' } },
    turisticka_agencija: { id: 0, naziv: '', adresa: '', kontakt: '' }
  };

  ngOnInit() {
    if (this.aranzman) {
      this.formData = { ...this.aranzman };
      // Convert date to YYYY-MM-DD format for input
      if (this.formData.datumRealizacije) {
        const date = new Date(this.formData.datumRealizacije);
        this.formData.datumRealizacije = date.toISOString().split('T')[0];
      }
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.save.emit(this.formData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isFormValid(): boolean {
    return !!(this.formData.ukupnaCena && this.formData.hotel?.id && this.formData.datumRealizacije);
  }
}
