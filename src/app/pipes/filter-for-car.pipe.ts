import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car/carDetail';

@Pipe({
  name: 'filterForCar',
})
export class FilterForCarPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c) => c.carName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
