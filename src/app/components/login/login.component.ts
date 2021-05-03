import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    let loginModel = Object.assign({}, this.loginForm.value);
    this.authService.login(loginModel).subscribe(
      (response) => {
        this.localStorageService.addItem(
          'userEmail',
          this.loginForm.value.email
        );
        this.toastr.success(response.message, 'Success');
        this.localStorageService.addItem('token', response.data.token);
        location.reload();
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.error.message);
      }
    );
  }
}
