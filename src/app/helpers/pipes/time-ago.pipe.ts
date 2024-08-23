import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(selectedDate: Date) {
    const difference =  Date.now() - new Date(selectedDate).getTime() 
      if (difference < 29)return 'Just now';
      const intervals: Record<string, number> = {
        'year': 31536000*1000,
        'month': 2592000*1000,
        'week': 604800*1000,
        'day': 86400*1000,
        'hour': 3600*1000,
        'minute': 60*1000,
        'second': 1*1000
    };
    let counter;
    for (const i in intervals) {
        counter = Math.floor(difference / intervals[i]);
        if (counter > 0){
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; 
        } else if(counter > 3600000){
          selectedDate.toLocaleString()
        }
        else {
            return counter + ' ' + i + 's ago'; 
        }
      }
    }
    return selectedDate.toLocaleString();
    }
}

