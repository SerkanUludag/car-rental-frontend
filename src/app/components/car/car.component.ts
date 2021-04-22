//import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { CarImage } from 'src/app/models/car-image/car-image';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';
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
  filterText: string = '';
  brands: Brand[];
  colors: Color[];
  selectedBrand: string = '';
  selectedColor: string = '';

  imageBasePath = environment.baseURL;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activaredRoute: ActivatedRoute,
    private toastr: ToastrService
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
    this.getBrands();
    this.getColors();

    this.toastr.show('Welcome');
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

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  filterCars() {
    if (this.selectedBrand && this.selectedColor) {
      let brandId = this.brands.filter((b) => b.name == this.selectedBrand)[0]
        .id;
      let colorId = this.colors.filter((c) => c.name == this.selectedColor)[0]
        .id;
      this.carService.filter(brandId, colorId).subscribe((response) => {
        this.carDetails = response.data;
      });
    }
  }
}
