import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro',
  standalone: true
})
export class EuroPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let str = value.toString();
    str = str.replace('.', ',');
    str = str + ' €';
    return str;
  }

}
