export interface IDevice {
    id: number;
    creationTime: string;
    description: string;
    deviceId: string;
    deviceImei: string;
    deviceUid: string | null;
    fkDeviceType: number;
    fkSecSimOperator: number;
    fkSimOperator: number;
    fkVehicleType: number;
    installationOn: string;
    lastUpdateOn: string;
    simPhoneNumber: string;
    simSecPhoneNumber: string;
    vehicleNo: string;
    validity: {
      installationOn: string;
      nextRechargeDate: string;
      customerRechargeDate: string;
    };
    plan: {
      id: number;
    };
    attribute: {
      speedLimit: number;
      lastOdometer: number;
      lastEngineHours: number;
    };
}

export interface IMutateDevice {
    id?: number;
    fkDeviceType: number;
    deviceId: string;
    deviceImei: string;
    deviceUid: string | null;
    simPhoneNumber: string;
    simSecPhoneNumber: string;
    fkSimOperator: number;
    fkSecSimOperator: number;
    fkVehicleType: number;
    vehicleNo: string;
    description: string;
    installationOn: string;
    lastUpdateOn: string;
    creationTime: string;
  }
  
  