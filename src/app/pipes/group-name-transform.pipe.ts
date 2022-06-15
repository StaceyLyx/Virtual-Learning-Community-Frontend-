import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupNameTransform'
})
export class GroupNameTransformPipe implements PipeTransform {

  transform(value: string): string {
    if (value === "" || value === null){
      return "(小组当前无名称)";
    }else{
      return value;
    }
  }

}
