import { Routes } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { UserComponent } from './user/user.component';


export const managementRoutes: Routes = [
    {
        path: 'parent',
        component: ParentComponent
    },
    {
        path: 'user',
        component: UserComponent
    },

];