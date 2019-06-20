import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {
  text: string;
  icon: string;
  iconColor: string;

  constructor(public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.text = data.text;
    this.icon = data.icon;
    this.iconColor = data.iconColor;
  }

  ngOnInit() {
  }

  action(): void {
    this.snackBarRef.dismissWithAction();
  }
}
