import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatIncluded',
})
export class VatIncludedPipe implements PipeTransform {
  transform(value: number, rate: number): number {
    return (value += (value * rate) / 100);
  }
}
