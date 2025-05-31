import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public userService = inject(UserService);
}
