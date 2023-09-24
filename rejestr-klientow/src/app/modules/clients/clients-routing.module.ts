import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { authGuardActivate } from '../core/guards/auth-activate.function.guard';

const routes: Routes = [
  { path: '', component: ClientsComponent, canActivate: [authGuardActivate] },
  { path: 'dodaj', component: ClientFormComponent },
  { path: ':id', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
