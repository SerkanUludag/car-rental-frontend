import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetailResponseModel } from 'src/app/models/rental/rentalDetailResponseModel';
import { RentalResponseModel } from 'src/app/models/rental/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  API_URL = 'https://localhost:44371';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(
      `${this.API_URL}/api/rentals/getall`
    );
  }

  getRentalDetails(): Observable<RentalDetailResponseModel> {
    return this.httpClient.get<RentalDetailResponseModel>(
      `${this.API_URL}/api/rentals/getrentaldetails`
    );
  }

  addRental(rental: Rental): Observable<RentalResponseModel> {
    return this.httpClient.post<RentalResponseModel>(
      `${this.API_URL}/api/rentals/add`,
      rental
    );
  }

  checkRental(rental: Rental): Observable<RentalResponseModel> {
    return this.httpClient.post<RentalResponseModel>(
      `${this.API_URL}/api/rentals/checkrental`,
      rental
    );
  }
}
