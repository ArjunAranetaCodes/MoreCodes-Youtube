import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../authentication.service'

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.details = this.auth.getUserDetails()
  }
}
