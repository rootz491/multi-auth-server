import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  success(): string {
    return 'Success!';
  }
}
