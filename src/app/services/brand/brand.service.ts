import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brand/brandResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { Brand } from 'src/app/models/brand/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrlGet = 'https://localhost:44371/api/brands/getall';
  apiUrlAdd = 'https://localhost:44371/api/brands/add';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrlGet);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrlAdd, brand);
  }
}
