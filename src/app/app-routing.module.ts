import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m)=> m.AuthModule)
  },
  {
    path:'accueil',
    loadChildren:() => import('./features/features.module').then((m) => m.FeaturesModule)
  },
  {
    path:'**',
    redirectTo:'auth/login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
