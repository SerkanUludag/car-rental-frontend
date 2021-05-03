import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/auth/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css'],
})
export class PasswordUpdateComponent implements OnInit {
  passwordUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createPasswordUpdateForm();
  }

  createPasswordUpdateForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required],
    });
  }

  update() {
    if (this.passwordUpdateForm.valid) {
      if (
        this.passwordUpdateForm.value.password ===
        this.passwordUpdateForm.value.passwordCheck
      ) {
        let formData = new FormData();
        formData.append('password', this.passwordUpdateForm.value.password);
        let email = this.localStorageService.getItem('userEmail');
        if (email) {
          formData.append('email', email);
        }

        this.authService.updatePassword(formData).subscribe((response) => {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/cars']);
        });
      } else {
        this.toastr.error("Passwords doesn't match!", 'Error');
      }
    }
  }
}
