import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image/car-image';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  // carImages: CarImage[];
  carImage: CarImage;
  details: CarDetail;
  dataLoaded: boolean = false;

  imageBasePath = environment.baseURL;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
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
}
