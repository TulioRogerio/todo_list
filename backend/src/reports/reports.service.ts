import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getAll() {
    return [
      { id: 1, title: 'Report dummy' }
    ];
  }
}