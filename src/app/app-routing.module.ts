import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { DecouvertesComponent } from './components/decouvertes/decouvertes.component';
import { AboutComponent } from './components/about/about.component';
import { DonsComponent } from './components/dons/dons.component';
import { DetailsComponent } from './components/details/details.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'publications',
    component : PublicationsComponent
  },
  {
    path : 'decouvertes',
    component : DecouvertesComponent
  },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : 'dons',
    component : DonsComponent
  },
  {
    path : 'details/:title/:id',
    component : DetailsComponent
  },
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
