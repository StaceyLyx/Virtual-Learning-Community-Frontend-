import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionalTransform'
})
export class OptionalTransformPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1){
      return "必修";
    }else{
      return "选修";
    }
  }

}
