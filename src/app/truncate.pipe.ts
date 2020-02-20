import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})

export class TruncatePipe implements PipeTransform {
  transform(value: string, index: number): string {
    return value.split(' ')[index];
  }
}
