import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NunjucksComponent } from './modules/nunjucks/nunjucks.component';
import { SettingsComponent } from './modules/settings/settings.component';

export const routes: Routes = [
    {
        path:'',
        component:LayoutsComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'nunjucks',
                component:NunjucksComponent
            },
            {
                path:'settings',
                component:SettingsComponent
            }
        ]
    }
];
