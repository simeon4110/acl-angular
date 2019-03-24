import {Component, OnInit} from '@angular/core';
import {PoemService} from '../../../core/services/poem.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDto} from '../../../core/models/confirmation.dto';
import {CustomSnackbarComponent} from '../../../shared/components/custom-snackbar/custom-snackbar.component';
import {MatSnackBar} from '@angular/material';
import {LoadingBarService} from '../../../core/services/loading-bar.service';
import {ProfileComponent} from '../../profile/profile.component';
import {UserService} from '../../../core/services/user.service';

/**
 * Handles poem confirmation.
 * @author Josh Harkema
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  toConfirm: PoemModel;
  confirmForm: FormGroup;
  currentConfirmation: number;
  totalConfirmation: number;
  percentConfirmation: number;
  nothingToConfirm = false;

  constructor(private fb: FormBuilder, private poemService: PoemService, private snackBar: MatSnackBar,
              private loadingBar: LoadingBarService, public parent: ProfileComponent, private userService: UserService) {
  }

  ngOnInit() {
    this.getPoem();
    this.createConfirmForm();

    // Updates form validity for when a reject message is required.
    this.confirmForm.get('confirmRadio').valueChanges.subscribe(value => {
      if (value === 'false') {
        this.confirmForm.get('rejectMessage').setValidators([Validators.required]);
      } else {
        this.confirmForm.get('rejectMessage').setValidators(null);
      }
      this.confirmForm.get('rejectMessage').updateValueAndValidity();
    });
  }

  getPoem(): void {
    this.loadingBar.setLoading(true);
    this.poemService.getPoemToConfirm().subscribe((resp: PoemModel) => {
      if (resp !== null) {
        this.toConfirm = resp[0];
      } else {
        this.nothingToConfirm = true;
      }
      this.loadingBar.setLoading(false);
    }, error1 => console.log(error1));
    this.userService.getConfirmationProgress().subscribe((resp: number[]) => {
      this.currentConfirmation = resp[1];
      this.totalConfirmation = resp[0];
      this.percentConfirmation = (this.currentConfirmation / this.totalConfirmation) * 100;
    });
  }

  /**
   * Submits the form to the correct endpoint.
   */
  submit(): void {
    this.loadingBar.setLoading(true);
    const formValue = this.confirmForm.value;
    console.log(formValue);
    if (formValue.confirmRadio === 'true') {
      this.poemService.confirmPoem(new ConfirmationDto(this.toConfirm.id, 'POEM', true, null))
        .subscribe(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'poem confirmed',
              icon: 'check_circle',
              iconColor: 'primary'
            }
          });
          this.getPoem();
          this.confirmForm.reset();
        }, error1 => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'something went wrong',
              icon: 'error',
              iconColor: 'warn'
            }
          });
          console.log(error1);
        });
    } else {
      this.poemService.rejectPoem(new ConfirmationDto(this.toConfirm.id, 'POEM', false, formValue.rejectMessage))
        .subscribe(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'poem rejected',
              icon: 'check_circle',
              iconColor: 'primary'
            }
          });
          this.getPoem();
          this.confirmForm.reset();
        }, error1 => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              text: 'something went wrong',
              icon: 'error',
              iconColor: 'warn'
            }
          });
          console.log(error1);
        });
    }
  }

  private createConfirmForm(): void {
    this.confirmForm = this.fb.group({
      confirmRadio: ['', Validators.required],
      rejectMessage: ['', Validators.required]
    });
  }
}
