import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DeviceComponent } from './device/device.component';
import { TrackingComponent } from './tracking/tracking.component';


export const managementRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'device',
        component: DeviceComponent
    },
    {
        path: 'tracking',
        component: TrackingComponent
    }

];