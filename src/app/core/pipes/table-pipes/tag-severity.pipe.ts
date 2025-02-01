import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagSeverity',
  pure: true, // Pure by default, but explicitly set for clarity
  standalone: true
})
export class TagSeverityPipe implements PipeTransform {
  transform(item: any, field: any): any {
    if (field === 'userType') {      
      switch (item[field]) {
        case 1:
          return 'primary';
        case 2:
          return 'info';
        default:
          return 'contrast';
      }
    } 
    return 'info';
  }
}