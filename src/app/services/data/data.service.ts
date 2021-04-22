import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from 'src/app/models/car/car';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private startDateSource = new BehaviorSubject('');
  currentStartDate = this.startDateSource.asObservable();

  private endDateSource = new BehaviorSubject('');
  currentEndDate = this.endDateSource.asObservable();

  private currentCarSource = new BehaviorSubject(new Car());
  currentCar = this.currentCarSource.asObservable();

  constructor() {}

  changeStartDate(startDate: string) {
    this.startDateSource.next(startDate);
  }

  changeEndDate(endDate: string) {
    this.endDateSource.next(endDate);
  }

  changeCurrentCar(car: Car) {
    this.currentCarSource.next(car);
  }
}
