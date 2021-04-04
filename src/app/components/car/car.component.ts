import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image/car-image';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  carDetails: CarDetail[];
  carImages: CarImage[];
  dataLoaded: boolean = false;

  imageBasePath = environment.baseURL;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activaredRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activaredRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
        this.getCarDetailsByBrand(params['brandId']);
        this.getCarImages();
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
        this.getCarDetailsByColor(params['colorId']);
        this.getCarImages();
      } else {
        this.getCars();
        this.getCarDetails();
        this.getCarImages();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetailsByBrand(brandId: number) {
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetailsByColor(colorId: number) {
    this.carService.getCarDetailsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarImages() {
    this.carImageService.getAllCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImagePath(car: CarDetail) {
    let path: string = '';
    this.carImages.forEach((image) => {
      if (image.carId == car.carId) {
        path = image.imagePath;
      }
    });
    if (path != '') {
      return path;
    } else {
      return '\\uploads\\default.png';
    }
  }
}
