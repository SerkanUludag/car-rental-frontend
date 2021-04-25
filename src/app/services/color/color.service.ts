import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ColorResponseModel } from 'src/app/models/color/colorResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrlGet = 'https://localhost:44371/api/colors/getall';
  apiUrlAdd = 'https://localhost:44371/api/colors/add';

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.apiUrlGet);
  }

  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrlAdd, color);
  }
}
