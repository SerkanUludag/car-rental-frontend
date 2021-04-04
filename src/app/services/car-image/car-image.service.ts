import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImageResponseModel } from 'src/app/models/car-image/carImageResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  API_URL = 'https://localhost:44371';

  constructor(private httpClient: HttpClient) {}

  getCarImageById(carId: number): Observable<CarImageResponseModel> {
    return this.httpClient.get<CarImageResponseModel>(
      `${this.API_URL}/api/carimages/getbycarid?carId=${carId}`
    );
  }

  getAllCarImages(): Observable<CarImageResponseModel> {
    return this.httpClient.get<CarImageResponseModel>(
      `${this.API_URL}/api/carimages/getall`
    );
  }

  
}
