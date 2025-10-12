// Urađeno je...: Komponenta za prikaz i upravljanje listom hotela.
// Opis: Učitava listu hotela i destinacija, omogućava otvaranje modala za
// dodavanje/izmenu hotela, validaciju i slanje podataka kroz HotelService.
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { Destinacija } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { DestinacijaService } from '../../services/destinacija.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];
  destinacije: Destinacija[] = [];
  showModal = false;
  editingHotel: Hotel | null = null;
  searchTerm = '';

  constructor(
    private hotelService: HotelService,
    private destinacijaService: DestinacijaService
  ) {}

  ngOnInit() {
    this.loadHotels();
    this.loadDestinacije();
  }

  loadHotels() {
    this.hotelService.getAll().subscribe((data: Hotel[]) => {
      this.hotels = data;
    });
  }

  loadDestinacije() {
    this.destinacijaService.getAll().subscribe((data: Destinacija[]) => {
      this.destinacije = data;
    });
  }

  openAddModal() {
    this.editingHotel = null;
    this.showModal = true;
  }

  openEditModal(hotel: Hotel) {
    this.editingHotel = { ...hotel };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingHotel = null;
  }

  saveHotel(hotel: Hotel) {
    if (this.editingHotel) {
      // Update existing hotel
      this.hotelService.update(hotel.id, hotel).subscribe(() => {
        this.loadHotels();
        this.closeModal();
      });
    } else {
      // Create new hotel
      this.hotelService.create(hotel).subscribe(() => {
        this.loadHotels();
        this.closeModal();
      });
    }
  }

  deleteHotel(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj hotel?')) {
      this.hotelService.delete(id).subscribe(() => {
        this.loadHotels();
      });
    }
  }

  searchHotels() {
    if (this.searchTerm.trim()) {
      this.hotelService.search(this.searchTerm).subscribe((data: Hotel[]) => {
        this.hotels = data;
      });
    } else {
      this.loadHotels();
    }
  }
}
