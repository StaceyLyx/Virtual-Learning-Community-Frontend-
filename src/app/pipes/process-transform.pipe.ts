import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processTransform'
})
export class ProcessTransformPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null){
      return "0";
    }else{
      return value;
    }
  }

}
