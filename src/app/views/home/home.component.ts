import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { StandupData } from 'src/app/shared/models/standup-data';
import { StandupDataService } from 'src/app/shared/services/standup-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  code = '';
  showError = false;

  standupsCollection: AngularFirestoreCollection<unknown>;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private standupData: StandupDataService
  ) {
    this.standupsCollection = afs.collection('standups');
  }

  onKeyUp(value: string) {
    this.code = value;
  }

  onSubmit() {
    this.standupsCollection.doc<StandupData>(this.code).valueChanges().subscribe(data => {
      if (data) {
        this.standupData.standupData$.next(data);
        this.router.navigate(['main']);
      } else {
        this.showError = true;
      }
      console.log('data', data);
    })
  }

}
