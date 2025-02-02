import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';


export const managementRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'device',
        component: DeviceComponent
    },

];