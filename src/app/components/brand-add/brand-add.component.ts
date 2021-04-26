import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);

      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Success');
        },
        (errorResponse) => {
          this.toastr.info(errorResponse.error.Message);

          //validation errors
          for (
            let i = 0;
            i < errorResponse.error.ValidationErrors.length;
            i++
          ) {
            this.toastr.error(
              errorResponse.error.ValidationErrors[i].ErrorMessage
            );
          }
        }
      );
    } else {
      this.toastr.error('Form is not valid', 'Error');
    }
  }
}
