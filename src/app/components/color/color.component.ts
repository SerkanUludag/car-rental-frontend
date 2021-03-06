import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  isExpanded: boolean = true;
  currentColor: Color | null;
  filterText: string = '';

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (this.currentColor == color) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  clearCurrentColor() {
    this.currentColor = null;
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setExpanded() {
    this.isExpanded = this.isExpanded == true ? false : true;
  }

  getIconClass() {
    if (this.isExpanded) {
      return 'fa fa-chevron-up';
    } else {
      return 'fa fa-chevron-down';
    }
  }
}
