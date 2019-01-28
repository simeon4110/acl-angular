import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './core/nav/nav.component';
import {FooterComponent} from './core/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
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
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
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
      {path: 'add-item', component: ItemAddComponent, outlet: 'profile', canActivate: [AuthGuard]},
      {path: 'user-details', component: UserDetailsComponent, outlet: 'profile', canActivate: [AuthGuard]}
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
    ItemAddConfirmationComponent
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
    FlexLayoutModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  entryComponents: [
    LoginFormComponent,
    ItemAddConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
