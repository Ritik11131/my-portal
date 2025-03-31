import { IDeviceType, IOperatorType, IVehicleType } from '@/app/shared/interfaces/dropdowns.interfaces';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponse } from '@/app/shared/interfaces/api.interfaces';
import { GET_DEVICE_TYPE_ENDPOINT, GET_OPERATOR_TYPE_ENDPOINT, GET_USER_LIST_ENDPOINT, GET_VEHICLE_TYPE_ENDPOINT } from '@/app/shared/constants/endpoint';
import { IUser } from '@/app/shared/interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpService:HttpService) { }

  async getDeviceTypeOptions(): Promise<IDeviceType[]> {
    const response = await this.httpService.get<IResponse>(GET_DEVICE_TYPE_ENDPOINT, {});
    return response?.data;
  }

  async getVehicleTypeOptions(): Promise<IVehicleType[]> {
    const response = await this.httpService.get<IResponse>(GET_VEHICLE_TYPE_ENDPOINT, {});
    return response?.data;
  }

  async getOperatorTypeOptions(): Promise<IOperatorType[]> {
    const response = await this.httpService.get<IResponse>(GET_OPERATOR_TYPE_ENDPOINT, {});
    return response?.data;
  }

  async getUsersOptions(): Promise<IUser[]> {
    const response = await this.httpService.get<IResponse>(GET_USER_LIST_ENDPOINT, {});
    return response?.data;
  }
}
