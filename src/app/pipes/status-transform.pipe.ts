import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTransform'
})
export class StatusTransformPipe implements PipeTransform {

  transform(value: string): string {
    if (value === null){
      return "暂未设置状态";
    }else{
      return value;
    }
  }

}
