import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brand/brandResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44371/api/brands/getall';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }
}
