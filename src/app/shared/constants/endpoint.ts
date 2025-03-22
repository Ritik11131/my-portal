// Authentication Endpoints
export const LOGIN_ENDPOINT = 'token';
export const REFRESH_ENDPOINT = 'token/refresh';

// Dashboard Endpoints
export const GET_VEHICLE_LIST_ENDPOINT = 'VehicleList';

// User Endpoints
export const GET_USER_LIST_ENDPOINT = 'User';
export const CREATE_USER_ENDPOINT = 'User';
export const GET_USER_BY_ID_ENDPOINT = 'device/GetByUserId';

// Device Endpoints
export const GET_DEVICE_LIST_ENDPOINT = 'device';
export const CREATE_DEVICE_ENDPOINT = 'device';
export const GET_USER_BY_DEVICE_ID_ENDPOINT = 'DeviceMapping/GetUserListByDeviceId';
export const SAMPLE_FILE_ENDPOINT = 'storage/static/parent_bulk_upload.xlsx';
export const SAMPLE_FILENAME = 'parent_bulk_upload.xlsx';
export const UPLOAD_PARENT_BULK_ENDPOINT = 'bulk/parents/create';

// Dropdowns Endpoint
export const GET_DEVICE_TYPE_ENDPOINT ='Masters/DeviceType';
export const GET_OPERATOR_TYPE_ENDPOINT ='Masters/OperatorType';
export const GET_VEHICLE_TYPE_ENDPOINT ='Masters/VehicleType';

// Raw Data Endpoint
export const GET_RAWLASTPOINT_ENDPOINT = 'RawLastPoint'