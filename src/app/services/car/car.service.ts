import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from 'src/app/models/car/carDetailResponseModel';
import { CarResponseModel } from 'src/app/models/car/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  API_URL = 'https://localhost:44371';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(
      `${this.API_URL}/api/cars/getall`
    );
  }

  getCarDetailsById(carId: number): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.API_URL}/api/cars/getcardetailsbyid?id=${carId}`
    );
  }

  getCarDetails(): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.API_URL}/api/cars/getcardetails`
    );
  }

  getCarDetailsByBrand(brandId: number): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.API_URL}/api/cars/getcardetailsbybrand?id=${brandId}`
    );
  }

  getCarDetailsByColor(colorId: number): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.API_URL}/api/cars/getcardetailsbycolor?id=${colorId}`
    );
  }

  getCarsByBrand(brandId: number): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(
      `${this.API_URL}/api/cars/getbybrand?id=${brandId}`
    );
  }

  getCarsByColor(colorId: number): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(
      `${this.API_URL}/api/cars/getbycolor?id=${colorId}`
    );
  }

  getCarById(id: number): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(
      `${this.API_URL}/api/cars/get?id=${id}`
    );
  }

  filter(brandId: number, colorId: number): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.API_URL}/api/cars/filter?brandId=${brandId}&colorId=${colorId}`
    );
  }
}
