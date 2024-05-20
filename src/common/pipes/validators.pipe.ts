import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateGreaterThanNowValidationPipe implements PipeTransform {
  transform(value: any) {
    const currentTime = new Date();
    const inputTime = new Date(value);
    if (isNaN(inputTime.getTime())) {
      throw new BadRequestException('Invalid Date format: "dueAt"');
    }
    if (inputTime <= currentTime) {
      throw new BadRequestException(
        'The dueAt musst be after the current date',
      );
    }
    return inputTime;
  }
}
