import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderTransform'
})
export class GenderTransformPipe implements PipeTransform {

  transform(value: string): string {
    if (value === "man"){
      return "男";
    }else{
      return "女";
    }
  }

}
