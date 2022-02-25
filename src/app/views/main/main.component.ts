import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, interval, skip, take, takeUntil, tap } from 'rxjs';
import { StandupData, StandupLog, StandupMember } from 'src/app/shared/models/standup-data';
import { StandupDataService } from 'src/app/shared/services/standup-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  allMembers: StandupMember[] = [];
  membersInQueue: StandupMember[] = [];
  currentLogs: StandupLog[] = [];

  standup?: StandupData;
  meetingTimer$?: Observable<number>;
  meetingEndTrigger$ = new Subject;
  currentSpeakerTimer$ = new BehaviorSubject<number>(0);
  currentSpeakerId$ = new BehaviorSubject<number | undefined>(undefined);

  private _currentSpeakerTimerRunning = true;
  private _subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private standupDataService: StandupDataService,
    private afs: AngularFirestore,
  ) { 
    this._subs.add(
      afs.collection('standups').doc<StandupData>('123456').valueChanges().subscribe(data => {
        console.log('updated data', data);
        this.standup = data
      })
    )
    
    this._subs.add(
      afs.collection('standups/123456/members').snapshotChanges()
      .pipe(
        take(1),
      ).subscribe((m: any[]) => {
        this.allMembers = m.map(item => {
          return {
            ...item.payload.doc.data(),
            id: item.payload.doc.id
          }
        })
        this.membersInQueue = [...this.allMembers];
      })
    );

    this._subs.add(
      afs.collection<StandupLog>(`standups/123456/logs/${this.getDateDocId()}/times`).valueChanges().subscribe(logs => {
        this.currentLogs = logs;
      })
    );
  }

  toggleRun() {
    const isRunning = this.standup?.current.running;

    this.afs.collection('standups').doc('123456')
      .set({ current: { running: !isRunning }}, { merge: true });
  }
  
  toggleSpeakerTimer() {
    this._currentSpeakerTimerRunning = !this._currentSpeakerTimerRunning;
  }

  onStartMeeting() {
    this.afs.collection('standups').doc('123456')
      .set({ current: { standupStartTime: Date.now () }}, { merge: true })
      .then(_ => { 
        this.onSetNextSpeaker();
        this.setDateForLogs()
        this.meetingTimer$ = interval(1000).pipe(
          takeUntil(this.meetingEndTrigger$)
        );
        
        this._subs.add(
          this.meetingTimer$.pipe(
            skip(1),
            tap(_ => {
              if (this._currentSpeakerTimerRunning) {
                this.currentSpeakerTimer$.next(this.currentSpeakerTimer$.value + 1);
              }
            })
          ).subscribe()
        );
      });
  }

  onSetNextSpeaker() {
    // save the previous speaker's logs before changing to the next one
    if (this.standup?.current?.speaker) {
      const log: StandupMember = {
        ...this.standup!.current.speaker,
        totalTime: this.currentSpeakerTimer$.value
      }
      this.afs.collection('standups/123456/logs').doc(this.getDateDocId()).collection('times').doc(this.standup?.current.speaker.id).set(log);
    }
    // if the queue is empty end the meeting and save total log
    if (!!this.membersInQueue.length) {
      // get the next speaker
      const nextSpeaker = this.membersInQueue.pop();
      console.log('setting next to ', nextSpeaker?.name)
      // update the state in firebase
      this.afs.collection('standups').doc('123456')
        .set({ current: { speaker: nextSpeaker }}, { merge: true });
      // restart speaker time
      this.currentSpeakerTimer$.next(0);
    } else {
      console.log('end meeting');
      
      this.onEndMeeting();
    }
  }

  onEndMeeting() {
    const current = {...this.standup?.current};
    current.standupEndTime = Date.now();
    delete current.speaker;
    this.afs.collection('standups').doc('123456')
      .set({ current });
    this.meetingEndTrigger$.next(true);
  }

  setDateForLogs() {
    this.afs.collection('standups/123456/logs').doc(this.getDateDocId()).set({date: this.getDateDocId()});
  }

  getDateDocId() {
    const date = new Date();
    return `${date.getFullYear().toString().slice(-2)}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`
  }

  getMemberTime(member: StandupMember) {
    if (member.id === this.standup?.current?.speaker?.id) {
      return this.currentSpeakerTimer$.value;
    }
    return this.currentLogs.find(el => el.name === member.name)?.totalTime || undefined;
  }
  
  // this is temporary
  onClear() {
    this.afs.collection('standups').doc('123456')
      .set({ });
    this.afs.collection('standups').doc('123456').collection('logs').doc(this.getDateDocId()).delete();
  }
}
