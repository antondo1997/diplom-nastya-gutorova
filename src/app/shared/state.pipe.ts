import {Pipe, PipeTransform} from '@angular/core';
import {StateTypes} from './interfaces';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(value: string): unknown {
    switch (value) {
      case 'agreed':
        return 'согласовано';
        break;
      case 'inAgreement':
        return 'на согласовании';
        break;
      case 'rejected':
        return 'отключено';
        break;
    }
    return null;
  }

}
