import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef,ViewChild} from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface DialogData {
  name: string;
}

declare var MediaRecorder: any;

export enum RecordingState {
  STOPPED = 'stopped',
  RECORDING = 'recording',
  FORBIDDEN = 'forbidden',
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  audiodialogRef: any;
  showspinner = true;
  name: string;
  mylocaluser: User = null;
  constructor(public auth: AuthService,public dialog: MatDialog) {
  this.auth.user$.subscribe( userdata => {
    if(userdata !== null || userdata!== undefined){
      this.mylocaluser = userdata;
    }
    });
   }
  ngOnInit(): void {
  }
  ngOnDestroy(){
    if(this.audiodialogRef !== null && this.audiodialogRef !== undefined){
      this.audiodialogRef.close();
    }
    
  }
  openDialogPersonal(){
  }
 openDialogPictures(){
  const dialogRef = this.dialog.open(DialogPictures, {
      data: this.mylocaluser
    });
    //console.log('video open', dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }
  openDialogDates(){
  }
  
  openDialogFamily(){
  }
  openDialogGreeting(){
    console.log('local',this.mylocaluser );
    this.audiodialogRef = this.dialog.open(DialogAudio, {
        data: this.mylocaluser,
        backdropClass: 'backdropBackground'
      });

    this.audiodialogRef.afterClosed().subscribe(result => 
    {

    });
    }
  NextPage(){
  }
  dosomething() {
    this.showspinner = false;
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  template:`
  <mat-card fxFlex ngStyle.lt-sm="background:gold; height: 40vh; width: 65vw;" ngStyle.gt-xs=" height: 40vh; width: 30vw;" fxLayout="column" fxLayoutAlign="space-around center">
    <mat-card-title>{{settingMsg}}</mat-card-title>  
    <audio *ngFor="let audio of audioFiles" controls='true' [src]="audio" (error) = "connectionerror()">
    </audio>
    <mat-card-content  *ngIf="showmicrophone">
    <button mat-fab color="primary"
    (click)="startRecording()" [disabled]= "disablemicrophone" >
    {{ state === 'recording' ? seconds : 'REC' }}</button> 
  </mat-card-content>
  <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="ontask()" *ngIf="showbutton" [disabled]= "disablebutton" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" [disabled]= "disableback" cdkFocusInitial>Back</button>
  </div>
  </mat-card>
  `

})
export class DialogAudio implements OnInit, OnDestroy {
  settingMsg = '';
  state: RecordingState;
  streamRef: any;
  disablemicrophone: boolean;
  showmicrophone: boolean;
  disablebutton: boolean;
  showbutton: boolean;
  audioFiles = [];
  showspinner = false;
  AudioOption = 'Delete';
  seconds = 0;
  public isOnline: boolean = navigator.onLine;
  intervalId = 0;
  mediaRecorder: any;
  disableback = false;
  chunks = [];
  imageFile: any;
  savetoDB: User;

  constructor(private cd: ChangeDetectorRef,private dom: DomSanitizer,private storage: AngularFireStorage, private afs: AngularFirestore,
            public dialogRef: MatDialogRef<DialogAudio>, @Inject(MAT_DIALOG_DATA) public data: User) {
      this.state = RecordingState.STOPPED;
      console.log('hi', data);
      if (data.downloadaudioURL !== null) {
        this.audioFiles.push(data.downloadaudioURL);
        console.log('hi',data.downloadaudioURL);
        this.playgreeting();
      } else {
        this.recordgreeting();
      } 
    }
    ngOnInit(){

      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.mediaavialable.bind(this), this.mediaerror.bind(this));
    }
    ngOnDestroy(){
      if(this.chunks !== null){
        this.chunks.pop();
      }// save local mem if possible      
    }
    recordgreeting() {
      navigator.permissions.query({ name: 'microphone' }).then((result) => {
        console.log('result', result.state);
        switch (result.state) {
          case 'granted':
            this.showgranted();
            break;
          case 'prompt':
            this.showprompt();
            break;
          case 'denied':
            this.showdenied();
            break;
        }
        result.onchange = (event) => {
          switch (result.state) {
            case 'granted':
              this.showgranted();
              break;
            case 'prompt':
              this.showprompt();
              break;
            case 'denied':
              this.showdenied();
              break;
          }
        };
      });
      console.log("record greeting");
    }
    playgreeting() {

      this.settingMsg = 'Play your Voice Greeting';
  
      this.showmicrophone = false;
      this.disablemicrophone = true;
  
      this.showspinner = false;
  
      this.showbutton = true;
      this.disablebutton = false;
      this.AudioOption = 'Delete';
  
      this.disableback = false;
      console.log("play greeting");
    }
  
    savegreeting() {
      this.settingMsg = 'Save your Voice Greeting';
  
      this.showmicrophone = false;
      this.disablemicrophone = true;
  
      this.showspinner = false;
  
      this.showbutton = true;
      this.disablebutton = false;
      this.AudioOption = 'Save';
  
      this.disableback = false;
  
    }
    showprompt() {
      this.settingMsg = 'Set Microphone settings';
  
      this.showmicrophone = true;
      this.disablemicrophone = true;
  
      this.showspinner = false;
  
      this.showbutton = true;
      this.disablebutton = false;
      this.AudioOption = 'Settings';
  
      this.disableback = false;
  
    }
    showgranted() {
      this.settingMsg = 'Record Greeting!';
  
      this.showmicrophone = true;
      this.disablemicrophone = false;
  
      this.showspinner = false;
  
      this.showbutton = false;
      this.disablebutton = false;
      this.AudioOption = 'Settings';
  
      this.disableback = false;
    }
    showdenied() {
      this.settingMsg = 'Microphone Setting is denied';
  
      this.showmicrophone = true;
      this.disablemicrophone = true;
  
      this.showspinner = false;
  
      this.showbutton = false;
      this.disablebutton = false;
      this.AudioOption = 'Settings';
  
      this.disableback = false;
    }
    showSettings() {
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints);
      return;
    } 
    connectionerror() {
      this.disablebutton = true;
      alert('Uh-oh, Connection Issue, Check Internet connection');
    }
    showError() {
      this.settingMsg = 'Your Audio- Error';
  
      this.showspinner = false;
  
      this.showbutton = false;
      this.disablebutton = false;
      this.AudioOption = 'Settings';
  
      this.disableback = false;
  
      alert('Uh-oh, Connection Issue, Check Internet connection');
    }    
    startRecording() {
      if (this.state === RecordingState.STOPPED) {//start recording
        this.mediaRecorder.start();
        this.disableback = true;
        this.state = RecordingState.RECORDING;
        this.seconds = 9;        
        this.clearTimer();
        this.intervalId = window.setInterval(() => {
          this.seconds -= 1;
                     
          if (this.seconds === 0) {
            console.log('stopped first:',  this.mediaRecorder.state); 
            this.state = RecordingState.STOPPED;
            this.mediaRecorder.stop();
            window.clearInterval( this.intervalId);
            this.savegreeting();
            return;
          }
        }, 1000);
      } else { //pressed again
        this.state = RecordingState.STOPPED;
        if (this.seconds !== 0) {
          this.savegreeting();
          window.clearInterval( this.intervalId);      
          this.mediaRecorder.stop();
        }
      }
    }
    mediaerror() {
      this.showError();
    }
    clearTimer() {
      clearInterval(this.intervalId);
    }
    mediaavialable(stream)
  {
    this.mediaRecorder = new MediaRecorder(stream);
    this.streamRef = stream;
    this.mediaRecorder.onstop = e => {
     
      const blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'});
      this.chunks = [];
      const audioURL = URL.createObjectURL(blob);
      // audio.src = audioURL;
      this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
      console.log(audioURL);
      console.log('recorder stopped');
      this.cd.detectChanges();
      const imageName = this.data.uid;
      this.imageFile = new File([blob], imageName, { type: 'audio/ogg; codecs=opus' });
      
    };
    this.mediaRecorder.ondataavailable = e => {
      this.chunks.push(e.data);
    };
  }     
    onNoClick(): void {
      this.dialogRef.close();
    }
    goback(){
      if(this.chunks !== null){
        this.chunks.pop();
      }
      this.dialogRef.close(this.data);
    }
    async ontask() {
      switch (this.AudioOption) {
        case 'Settings':
          this.showSettings();
          break;
  
        case 'Delete':
          this.settingMsg = 'Deleting...';
  
          //audio option is pushed
          this.showspinner = true;
  
          this.showbutton = false;
          this.disablebutton = false;
          this.AudioOption = 'Delete';
  
          this.disableback = true;
          switch (await this.deleteOps()) {
            case true:
              this.data.downloadaudioURL = '';
              this.audioFiles.pop();
              this.recordgreeting();
              break;
            case false:
              this.showError();
              break;
          }

          break;
        case 'Save':
          this.settingMsg = 'Saving...';
  
          this.showspinner = true;
  
          this.showbutton = false;
          this.disablebutton = false;
          this.AudioOption = 'Delete';
  
          this.disableback = true;
          switch (await this.saveOps()) {
            case true:
              this.data.downloadaudioURL = this.savetoDB.downloadaudioURL;            
              this.audioFiles.pop();
              this.chunks.pop();
              this.playgreeting();
              break;
            case false:
              this.showError();
              break;
          }
          break;
      }
    }
    async deleteOps() {
      const ref = this.afs.firestore.collection('users').doc(`${this.data.uid}`);
      try {
        await this.storage.storage.refFromURL(this.data.downloadaudioURL).delete();
        await this.afs.firestore.runTransaction(transaction =>
          transaction.get(ref).then(sfdoc => {
            this.savetoDB = sfdoc.data() as User;
            this.savetoDB.downloadaudioURL = null;
            transaction.update(ref, this.savetoDB);
          })
        );
        return true;
      } catch (error) {
        return false;
      }
    }
    async saveOps() {
      const ref = this.afs.firestore.collection('users').doc(`${this.data.uid}`);
      try {
        const uploadURL = await this.storage.upload(`audio/${this.data.uid}`, this.imageFile);
        await this.afs.firestore.runTransaction(transaction =>
          transaction.get(ref).then(async sfdoc => {
            this.savetoDB = sfdoc.data() as User;
            this.savetoDB.downloadaudioURL = await uploadURL.ref.getDownloadURL();
            this.data.downloadaudioURL = this.savetoDB.downloadaudioURL;
            this.audioFiles.push(this.data.downloadaudioURL);
            transaction.update(ref, this.savetoDB);
          })
        );
        return true;
      } catch (error) {
        return false;
      }
    }
}
/*pictures*/
@Component({
  selector: ' mat-dialog-title',
  template:`
  <mat-card fxFlex ngStyle.lt-sm="background:gold; height: 40vh; width: 65vw;" ngStyle.gt-xs=" height: 40vh; width: 30vw;" fxLayout="column" fxLayoutAlign="space-around center">
    <mat-label>{{settingMsg}}</mat-label>
    <div mat-dialog-content >
    <video #video autoplay playsinline ></video>
    </div>
   <div mat-dialog-actions>
  <button mat-raised-button color ="primary" (click)="ontask()" *ngIf="showbutton" [disabled]= "disablebutton" >{{AudioOption}} </button>
  <button mat-raised-button  color="primary" (click)="goback()" [disabled]= "disableback" cdkFocusInitial>Back</button>
  </div>
     
    </mat-card>
  `
})
export class DialogPictures
{
 settingMsg = '';
  state: RecordingState;
  streamRef: any;
  disablemicrophone: boolean;
  showmicrophone: boolean;
  disablebutton: boolean;
  showbutton: boolean;
  audioFiles = [];
  showspinner = false;
  AudioOption = 'Delete';
  seconds = 0;
  public isOnline: boolean = navigator.onLine;
  intervalId = 0;
  mediaRecorder: any;
  disableback = false;
  chunks = [];
  imageFile: any;
  savetoDB: User;


  showcamera = false;
  showcanvas = true;
  
  @ViewChild('video', { static: false }) video: any;
  @ViewChild('canvas', { static: true }) canvas: any;
  canvasElement: any;
  context: any;
  videoElement: HTMLVideoElement;
  videostreamRef: any;

    constructor(private cd: ChangeDetectorRef,private dom: DomSanitizer,private storage: AngularFireStorage, private afs: AngularFirestore,
            public dialogRef: MatDialogRef<DialogPictures>, @Inject(MAT_DIALOG_DATA) public data: User) {
      this.state = RecordingState.STOPPED;
      console.log('hi', data);
      if (data.downloadaudioURL !== null) {
        this.audioFiles.push(data.downloadaudioURL);
        console.log('hi',data.downloadaudioURL);
        this.playgreeting();
      } else {
        this.recordgreeting();
      } 
    }
     playgreeting() {

    this.settingMsg = 'Your Profile Image';
    this.showspinner = false;
    this.disablebutton = false;
    this.AudioOption = 'Delete';
    this.disableback = false;
    console.log("playgreeting");
  }
 showSettings() {
      const mediaConstraints = {
        video: true,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints);
      return;
    }
        recordgreeting() {
      navigator.permissions.query({ name: 'camera' }).then((result) => {
        console.log('result', result.state);
        switch (result.state) {
          case 'granted':
            this.showgranted();
            break;
          case 'prompt':
            this.showprompt();
            break;
          case 'denied':
            this.showdenied();
            break;
        }
        result.onchange = (event) => {
          switch (result.state) {
            case 'granted':
              this.showgranted();
              break;
            case 'prompt':
              this.showprompt();
              break;
            case 'denied':
              this.showdenied();
              break;
          }
        };
      });
      console.log("record greeting");
    }

    showgranted() {
    this.settingMsg = 'Please wait !..';
    this.videoElement = this.video.nativeElement;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 200, height: 200, facingMode: 'user', aspectRatio: .5 }
      })
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videostreamRef = stream;
        this.settingMsg = '4Set Your Profile Picturess';
      });
       this.showcamera = true;
        this.showbutton = true;
         this.disablebutton = false;
          this.AudioOption = 'Take Picture';
           this.disableback = false;
            console.log("granted");
  }
    showprompt(){
    this.settingMsg = 'Change Camera settings';
    this.showbutton = true;
    this.disablebutton = false;
    this.AudioOption = 'Settings';
    this.disableback = false;
    }
    showdenied(){
    this.settingMsg = 'camera Setting is denied';
    this.showbutton = false;
    this.disablebutton = false;
    this.AudioOption = 'Settings';
    this.disableback = false;
    }
     async ontask() {
     switch (this.AudioOption) {
      case 'Settings':
        this.showSettings();
        break;
     }
     }
      goback(){
      this.dialogRef.close(this.data);
    }
  }