import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StandupDataLoadedGuard } from './shared/guards/standup-data-loaded.guard';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  // { path: 'main', component: MainComponent, canActivate: [StandupDataLoadedGuard] },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
