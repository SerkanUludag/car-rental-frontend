import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image/car-image';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { DataService } from 'src/app/services/data/data.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carImage: CarImage;
  details: CarDetail;
  dataLoaded: boolean = false;
  startDate: string;
  endDate: string;
  currentDate: string = this.getCurrentDate();
  isRentalValid: boolean;

  //todo
  activeCustomer: Customer;

  imageBasePath = environment.baseURL;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params['carId']);
      this.getCarDetails(params['carId']);
      this.getCarImages(params['carId']);
    });
  }

  getCar(id: number) {
    this.carService.getCarById(id).subscribe((res) => {
      this.car = res.data[0];
      this.dataService.changeCurrentCar(this.car);
    });
  }

  getCarDetails(id: number) {
    this.carService.getCarDetailsById(id).subscribe((res) => {
      this.details = res.data[0];
    });
  }

  getCarImages(id: number) {
    this.carImageService.getCarImageById(id).subscribe((res) => {
      this.carImage = res.data[0];
      this.dataLoaded = true;
    });
  }

  getImageClass(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  isCarouselActive(index: number) {
    return index == 0 ? 'active' : '';
  }

  getCurrentDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  getButtonClass() {
    return this.isRentalValid ? 'btn btn-success' : 'btn btn-warning';
  }

  getRouterLink() {
    return `cars/${this.car.id}/rent`;
  }

  checkRental() {
    this.setDates();

    let rental = new Rental();
    rental.carId = this.car.id;
    rental.customerId = 1; // todo
    rental.rentDate = new Date(this.startDate);
    rental.returnDate = new Date(this.endDate);

    this.rentalService.checkRental(rental).subscribe((response) => {
      if (response.success) {
        this.isRentalValid = true;
      } else {
        this.isRentalValid = false;
      }
    });
  }

  setDates() {
    this.dataService.changeStartDate(this.startDate);
    this.dataService.changeEndDate(this.endDate);
  }
}
