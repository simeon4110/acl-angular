import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './core/nav/nav.component';
import {FooterComponent} from './core/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowseComponent} from './modules/browse/browse.component';
import {SearchComponent} from './modules/search/search.component';
import {HomeComponent} from './modules/home/home.component';
import {AboutComponent} from './modules/about/about.component';
import {ToolsComponent} from './modules/tools/tools.component';
import {RouterModule, Routes} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProfileComponent} from './modules/profile/profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginFormComponent} from './shared/forms/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ItemAddComponent} from './modules/profile-components/item-add/item-add.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UserDetailsComponent} from './modules/profile-components/user-details/user-details.component';
import {AuthInterceptor} from './core/http/auth.interceptor';
import {ItemAddConfirmationComponent} from './modules/profile-components/item-add/item-add-confirmation/item-add-confirmation.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SelectAuthorComponent} from './shared/components/select-author/select-author.component';
import {AddAuthorComponent} from './shared/components/add-author/add-author.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {CardPoemComponent} from './shared/components/card-poem/card-poem.component';
import 'hammerjs';
import {CardBookComponent} from './shared/components/card-book/card-book.component';
import {CardSectionComponent} from './shared/components/card-section/card-section.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SearchFormComponent} from './shared/forms/search-form/search-form.component';
import {ItemTableComponent} from './shared/components/item-table/item-table.component';
import {AdminUserManagerComponent} from './modules/profile-components/admin-user-manager/admin-user-manager.component';
import {UserAddFormComponent} from './shared/forms/user-add-form/user-add-form.component';
import {PasswordResetFormComponent} from './shared/forms/password-reset-form/password-reset-form.component';
import {AdminGuard} from './core/guards/admin.guard';
import {AdminPasswordResetFormComponent} from './shared/forms/admin-password-reset-form/admin-password-reset-form.component';
import {AdminItemManagerComponent} from './modules/profile-components/admin-item-manager/admin-item-manager.component';
import {UserItemManagerComponent} from './modules/profile-components/user-item-manager/user-item-manager.component';
import {ClickStopPropagationDirective} from './shared/directives/click-stop-propagation.directive';
import {ItemDetailsDialogComponent} from './shared/components/item-details-dialog/item-details-dialog.component';
import {EditPoemFormComponent} from './shared/forms/edit-poem-form/edit-poem-form.component';
import {EditBookFormComponent} from './shared/forms/edit-book-form/edit-book-form.component';
import {EditSectionFormComponent} from './shared/forms/edit-section-form/edit-section-form.component';
import {ConfirmationDialogComponent} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {CustomSnackbarComponent} from './shared/components/custom-snackbar/custom-snackbar.component';
import {ConfirmationComponent} from './modules/profile-components/confirmation/confirmation.component';
import {PoemArrayFormatPipe} from './shared/pipes/poem-array-format-pipe';
import {MessageDialogComponent} from './modules/profile/message-dialog/message-dialog.component';
import {CategoryPipePipe} from './shared/pipes/category-pipe.pipe';
import {CdkTableModule} from '@angular/cdk/table';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'search', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tools', component: ToolsComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'add-item', component: ItemAddComponent, outlet: 'profile-out', canActivate: [AuthGuard]},
      {path: 'user-details', component: UserDetailsComponent, outlet: 'profile-out', canActivate: [AuthGuard]},
      {path: 'user-items', component: UserItemManagerComponent, outlet: 'profile-out', canActivate: [AuthGuard]},
      {path: 'add-user', component: AdminUserManagerComponent, outlet: 'profile-out', canActivate: [AdminGuard]},
      {path: 'admin-items', component: AdminItemManagerComponent, outlet: 'profile-out', canActivate: [AdminGuard]},
      {path: 'confirm-poem', component: ConfirmationComponent, outlet: 'profile-out', canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BrowseComponent,
    SearchComponent,
    HomeComponent,
    AboutComponent,
    ToolsComponent,
    ProfileComponent,
    LoginFormComponent,
    ItemAddComponent,
    UserDetailsComponent,
    ItemAddConfirmationComponent,
    SelectAuthorComponent,
    AddAuthorComponent,
    CardPoemComponent,
    CardBookComponent,
    CardSectionComponent,
    SearchFormComponent,
    ItemTableComponent,
    AdminUserManagerComponent,
    UserAddFormComponent,
    PasswordResetFormComponent,
    AdminPasswordResetFormComponent,
    AdminItemManagerComponent,
    UserItemManagerComponent,
    ClickStopPropagationDirective,
    ItemDetailsDialogComponent,
    EditPoemFormComponent,
    EditBookFormComponent,
    EditSectionFormComponent,
    ConfirmationDialogComponent,
    CustomSnackbarComponent,
    ConfirmationComponent,
    PoemArrayFormatPipe,
    MessageDialogComponent,
    CategoryPipePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    OverlayModule,
    MatProgressButtonsModule.forRoot(),
    CdkTableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 6000, panelClass: 'custom-snack-bar'}},
    NavComponent
  ],
  entryComponents: [
    LoginFormComponent,
    ItemAddConfirmationComponent,
    SelectAuthorComponent,
    AddAuthorComponent,
    CardPoemComponent,
    CardBookComponent,
    CardSectionComponent,
    SearchFormComponent,
    UserAddFormComponent,
    PasswordResetFormComponent,
    AdminPasswordResetFormComponent,
    ItemDetailsDialogComponent,
    EditBookFormComponent,
    EditPoemFormComponent,
    EditSectionFormComponent,
    ConfirmationDialogComponent,
    CustomSnackbarComponent,
    MessageDialogComponent
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
  constructor() {
  }
}
