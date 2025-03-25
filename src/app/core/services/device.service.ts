import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponse } from '@/app/shared/interfaces/api.interfaces';
import { CREATE_DEVICE_ENDPOINT, GET_DEVICE_LIST_ENDPOINT, GET_LINKED_VEHICLE_BY_USER_ID_ENDPOINT, GET_USER_BY_DEVICE_ID_ENDPOINT, UNLINK_USER_FROM_DEVICE } from '@/app/shared/constants/endpoint';
import { IDevice, IMutateDevice, IUnlinkUserFromDevice } from '@/app/shared/interfaces/device.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

    constructor(private httpService: HttpService) { }
  
  
    async getDeviceList(): Promise<IDevice[]> {
      const response = await this.httpService.get<IResponse>(GET_DEVICE_LIST_ENDPOINT, {});
      return response?.data;
    }
  
    async createDevice(data: IMutateDevice): Promise<IResponse> {
      return this.httpService.post<IResponse>(CREATE_DEVICE_ENDPOINT, data);
    }
  
    async getDeviceById(id:number): Promise<IMutateDevice> {
      const response = await this.httpService.get<IResponse>(CREATE_DEVICE_ENDPOINT, {}, id);
      return response?.data;
    }
  
    async updateDevice(id:number, data: IMutateDevice): Promise<IResponse> {
      return this.httpService.put<IResponse>(CREATE_DEVICE_ENDPOINT, id, data);
    }

    async getUsersByDeviceId(id:number): Promise<IResponse> {
      const response = await this.httpService.get<IResponse>(GET_USER_BY_DEVICE_ID_ENDPOINT, {}, id);
      return response?.data;
    }

    async getDevicesByUserId(id:number): Promise<IResponse> {
      const response = await this.httpService.get<IResponse>(GET_LINKED_VEHICLE_BY_USER_ID_ENDPOINT, {}, id);
      return response?.data;
    }

    async unlinkUserFromDevice(data: IUnlinkUserFromDevice): Promise<IResponse> {
      return this.httpService.post<IResponse>(UNLINK_USER_FROM_DEVICE, data);
    }

}
