import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rental/rentalDetail';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[] = [];
  rentalDetails:RentalDetail[] = [];
  
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentals();
    this.getRentalDetails();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    })
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe(response => {
      this.rentalDetails = response.data;
    })
  }

}
