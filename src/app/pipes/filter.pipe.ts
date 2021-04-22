import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand/brand';
import { Color } from '../models/color/color';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Brand[] | Color[], filterText: string): Brand[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (b) => b.name.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
