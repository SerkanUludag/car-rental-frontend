import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    let colorModel = Object.assign({}, this.colorAddForm.value);
    this.colorService.addColor(colorModel).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success');
      },
      (errorResponse) => {
        this.toastr.info(errorResponse.error.Message);

        //validation errors
        for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
          this.toastr.error(
            errorResponse.error.ValidationErrors[i].ErrorMessage,
            'Error'
          );
        }
      }
    );
  }
}
