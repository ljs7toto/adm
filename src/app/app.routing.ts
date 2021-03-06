import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './users/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

export const routes: Routes = [
  {
    path : '',
    redirectTo : '/users',
    pathMatch: 'full'
  },
  {
    path : 'users',
    component : UserComponent,
    children : [
      {
        path : '',
        component: UserListComponent
      },
      {
        path : 'create',
        component: UserCreateComponent
      },
      {
        path : ':id',
        component: UserSingleComponent
      },
      {
        path : ':id/edit',
        component: UserEditComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);