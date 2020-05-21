import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/DataModels/User'
import { IngressService } from '../services/ingress.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ingressService: IngressService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.ingressService.currentUser) {
      return true;
    }
    else {
      this.router.navigateByUrl("/");
      return true;
    }

  }

}
