import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './core/nav/nav.component';
import {FooterComponent} from './core/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
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
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SearchFormComponent} from './shared/forms/search-form/search-form.component';
import {ItemTableComponent} from './shared/components/item-table/item-table.component';
import {AdminUserManagerComponent} from './modules/profile-components/admin-user-manager/admin-user-manager.component';
import {UserAddFormComponent} from './shared/forms/user-add-form/user-add-form.component';
import {PasswordResetFormComponent} from './shared/forms/password-reset-form/password-reset-form.component';
import {AdminGuard} from './core/guards/admin.guard';


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
      {path: 'add-user', component: AdminUserManagerComponent, outlet: 'profile-out', canActivate: [AdminGuard]}
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
    PasswordResetFormComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    OverlayModule,
    MatProgressButtonsModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
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
    PasswordResetFormComponent
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
