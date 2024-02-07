import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink, ToastModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title =''
  connected = false;

  authService = inject(AuthService);

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    this.authService.setSecret(token);
  }

  isConnected() {
    if (!this.authService.decodedToken) {
      return false;
    }
    if (this.authService.decodedToken.exp > new Date().getTime()) {
      this.authService.disconnect();
      return false;
    }
    return true;
  }

  modifyToken() {
    this.authService.secret = 'aaa';
  }

 
}
