import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iban',
  standalone: true,
})
export class IbanPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {

    console.log("args", args);

    if (value.length !== 16) return null;

    let iban = value.replace(/(.{4})/g, '$1 ');

    return iban;
  }

}
