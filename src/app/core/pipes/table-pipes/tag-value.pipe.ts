import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagValue',
  pure: true, // Pure by default, but explicitly set for clarity
  standalone: true
})
export class TagValuePipe implements PipeTransform {
  transform(item: any, field: string): string {
    if (field === 'userType') {
      return item[field] === 1 ? 'User' : 'Re Seller';
    }
    return item[field] || '-';
  }
}