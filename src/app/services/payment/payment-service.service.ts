import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentServiceService {
  API_URL = 'https://localhost:44371';

  constructor(private httpClient: HttpClient) {}

  pay(cardNumber: string): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append('cardNumber', cardNumber);
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/api/payment/pay`,
      formData
    );
  }
}
