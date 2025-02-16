import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponse } from '@/app/shared/interfaces/api.interfaces';
import { GET_RAWLASTPOINT_ENDPOINT } from '@/app/shared/constants/endpoint';
import { IRawDataLastPoint } from '@/app/shared/interfaces/rawData.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RawDataService {

  constructor(private httpService: HttpService) { }

  async fetchRawLastPoint(data: IRawDataLastPoint): Promise<any[]> {
    const response = await this.httpService.post<IResponse>(GET_RAWLASTPOINT_ENDPOINT, data);
    return response?.data;
  }
}
