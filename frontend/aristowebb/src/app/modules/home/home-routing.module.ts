import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HttpService } from '../../services';

const routes: Routes = [
    {
        path: '',
        component: HomeViewComponent,
        canActivate: [HttpService]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
