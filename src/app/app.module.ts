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
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
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
import {HttpClientModule} from '@angular/common/http';
import {LoginFormComponent} from './shared/forms/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'search', component: SearchComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tools', component: ToolsComponent}
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
    LoginFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule
  ],
  providers: [],
  entryComponents: [LoginFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
