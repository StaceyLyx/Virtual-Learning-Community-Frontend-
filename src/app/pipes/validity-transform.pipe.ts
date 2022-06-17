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
    }else if(value === 2){
      return "任务已过期";
    }else if(value === 3){
      return "审核不通过"
    }else{
      return "已接受过该任务"
    }
  }

}
