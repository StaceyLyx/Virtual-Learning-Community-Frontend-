import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validityTransform'
})
export class ValidityTransformPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0){
      return "暂未审核";
    }else if(value === 1){
      return "审核通过";
    }else{
      return "任务已过期";
    }
  }

}
