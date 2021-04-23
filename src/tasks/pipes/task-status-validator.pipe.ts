import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/enums/task-status.enum';

@Injectable()
export class TaskStatusValidatorPipe implements PipeTransform {

  transform(value: string) {
    value = value.toUpperCase();
    const isValid = this.isStatusValid(value);

    if(!isValid) throw new BadRequestException(`${value} is an invalid status`);

    return value;
  }

  private isStatusValid (status: string): boolean {
    return !!TaskStatus[status];
  }

}
