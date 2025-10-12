import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Destinacija } from '../../../models/hotel.model';

@Component({
  selector: 'app-destinacija-form',
  templateUrl: './destinacija-form.component.html',
  styleUrls: ['./destinacija-form.component.css']
})
export class DestinacijaFormComponent implements OnInit {
  @Input() destinacija: Destinacija | null = null;
  @Output() save = new EventEmitter<Destinacija>();
  @Output() cancel = new EventEmitter<void>();

  formData: Destinacija = {
    id: 0,
    mesto: '',
    drzava: '',
    opis: ''
  };

  ngOnInit() {
    if (this.destinacija) {
      this.formData = { ...this.destinacija };
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
    return !!(this.formData.mesto && this.formData.drzava);
  }
}
