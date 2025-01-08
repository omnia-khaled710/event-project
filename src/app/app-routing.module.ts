import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventCardComponent } from './events/event-card/event-card.component';

const routes: Routes = [
   {path: '', redirectTo: '/home', pathMatch: 'full'},
   {path: 'home',component:HomeComponent},
   {path:'event/:id',component:EventCardComponent},
   {path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
   {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
   {path:'**',component:NotFoundComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
