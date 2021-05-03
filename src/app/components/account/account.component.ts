import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  dataLoaded = false;
  userUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    let email = this.localStorageService.getItem('userEmail');
    if (email) {
      this.authService.getUser(email).subscribe((response) => {
        this.user = response;
        this.createUserUpdateForm();
      });
    }
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
    });
    this.dataLoaded = true;
  }

  update() {
    let userModel = Object.assign({}, this.userUpdateForm.value);

    this.authService.updateUser(userModel).subscribe((response) => {
      this.toastr.info(response.message, 'Successfull');
      this.router.navigate(['/cars']);
      setTimeout(() => location.reload(), 500);
    });
  }
}
