import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from 'src/app/models/car/carDetailResponseModel';
import { CarResponseModel } from 'src/app/models/car/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API_URL = 'https://localhost:44371';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(`${this.API_URL}/api/cars/getall`);
  }

  getCarDetails():Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(`${this.API_URL}/api/cars/getcardetails`)
  }
}