export interface IUser {
    fkCustomerId: number;
    fkParentId: number;
    id: number;
    isActive: number;
    loginId: string;
    mobileNo: string;
    timezone: string;
    userName: string;
    userType: number;
    email: string;
    creationTime: number;
    lastUpdateOn: number;
}

export interface IUserMutate {
    id?: number;
    loginId: string;
    fkParentId: number;
    fkCustomerId: number;
    userName: string;
    email: string;
    password: string;
    mobileNo: string;
    userType: number;
    timezone: string;
    creationTime: string;
    lastUpdateOn: string;
    isActive: number;
}