import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Hotel } from '../../../models/hotel.model';
import { Destinacija } from '../../../models/hotel.model';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {
  @Input() hotel: Hotel | null = null;
  @Input() destinacije: Destinacija[] = [];
  @Output() save = new EventEmitter<Hotel>();
  @Output() cancel = new EventEmitter<void>();

  formData: Hotel = {
    id: 0,
    naziv: '',
    broj_zvezdica: 1,
    opis: '',
    destinacija: { id: 0, mesto: '', drzava: '', opis: '' }
  };

  ngOnInit() {
    if (this.hotel) {
      // Ensure destinacija is at least an object (templates bind to destinacija.id)
      this.formData = {
        id: this.hotel.id,
        naziv: this.hotel.naziv,
        broj_zvezdica: this.hotel.broj_zvezdica,
        opis: this.hotel.opis,
        destinacija: this.hotel.destinacija ? this.hotel.destinacija : { id: 0, mesto: '', drzava: '', opis: '' }
      };
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
    return !!(this.formData.naziv && this.formData.broj_zvezdica && this.formData.destinacija?.id);
  }
}
