import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <footer class="footer">
      <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <nav>
          <ul class="nav">
            <li class="nav-item submenu">
              <a href="mailto:sdmd@usep.edu.ph" style="text-decoration: none;">
                <i class="mdi mdi-email-outline"></i> sdmd@usep.edu.ph
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <a href="#">
            <img src="assets/images/logo/sdmd.png" alt="sdmd.logo" height="35px">
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
}
