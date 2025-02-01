import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IUser, IUserMutate } from '@/app/shared/interfaces/user.interfaces';
import { IResponse } from '@/app/shared/interfaces/api.interfaces';
import { CREATE_USER_ENDPOINT, GET_USER_LIST_ENDPOINT } from '@/app/shared/constants/endpoint';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }


  async getUsersList(): Promise<IUser[]> {
    const response = await this.httpService.get<IResponse>(GET_USER_LIST_ENDPOINT, {});
    return response?.data;
  }

  async createUser(data: IUserMutate): Promise<IResponse> {
    return this.httpService.post<IResponse>(CREATE_USER_ENDPOINT, data);
  }

  async getUserById(id:number): Promise<IUserMutate> {
    const response = await this.httpService.get<IResponse>(CREATE_USER_ENDPOINT, {}, id);
    return response?.data;
  }

  async updateUser(id:number, data: IUserMutate): Promise<IResponse> {
    return this.httpService.put<IResponse>(CREATE_USER_ENDPOINT, id, data);
  }
}
