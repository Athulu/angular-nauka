import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientResolver implements Resolve<Client> {
  constructor(private clientsService: ClientsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Client> {
    return this.clientsService.getClient(1);
  }
}
