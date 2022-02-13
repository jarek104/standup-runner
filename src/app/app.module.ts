import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTileComponent } from './shared/components/user-tile/user-tile.component';
import { MaterialSharedModule } from './shared/modules/material-shared.module';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCvZm75cIkZi-PTsUdDjamKOyxAxaPkbZ0",
  authDomain: "standup-runner.firebaseapp.com",
  projectId: "standup-runner",
  storageBucket: "standup-runner.appspot.com",
  messagingSenderId: "356298219432",
  appId: "1:356298219432:web:58d59d7f63a230a431079d",
  measurementId: "G-3Z739255Z2"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    UserTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
