import { Component, OnInit,Inject } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

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
export class ProfilePageComponent implements OnInit {
  showspinner = true;
  name: string;

  mylocaluser: User = null;
  constructor(public auth: AuthService,public dialog: MatDialog) {
  this.auth.user$.subscribe( userdata => {
  if(userdata !== null || userdata!== undefined){
  this.mylocaluser = userdata;
      }
    })
    
   }

  ngOnInit(): void {
  }
  openDialogPersonal(){
  }
   
 openDialogPictures(){
  const dialogRef = this.dialog.open(DialogPictures, {
      data: {name: this.name}
    });
    console.log('video open', dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  
  openDialogDates(){
  }
  
  openDialogFamily(){
  }
  openDialogGreeting(){
    const dialogRef = this.dialog.open(DialogAudio, {
        width: '350px',
        height:'450px',
        data: {name: this.name}
       
      });
      console.log('audio open', dialogRef);
      dialogRef.afterClosed().subscribe(result => 
{
       console.log('The dialog was closed');
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
  <mat-card fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10%" style = "background:gold; font-family: Lato;" >
  <h2 mat-dialog-title>
  <mat-label>{{settingMsg}}</mat-label>  
  </h2>
  <h3>audio-Test</h3>
  <mat-dialog-content>
  <section fxFlex="0 1 75%" *ngIf="showmicrophone">
  <button mat-fab color="primary"
  (click)="startRecording()" [disabled]= "disablemicrophone" >
  {{ state === 'recording' ? seconds : 'REC' }}</button> 
</section>
  </mat-dialog-content>
  
</mat-card>
  `

})
export class DialogAudio {
  settingMsg= '';
  state: RecordingState;
  streamRef: any;
  disablemicrophone: boolean;
  showmicrophone; boolean;
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
  


  constructor(
    public dialogRef: MatDialogRef<DialogAudio>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    recordgreeting() {
      navigator.permissions.query({ name: 'microphone' }).then((result) => {
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
    }
    playgreeting() {

      this.settingMsg = 'Play your Voice Greeting';
  
      this.showmicrophone = false;
     // this.audioFiles.push(this.data.downloadaudioURL);
      this.disablemicrophone = true;
  
      this.showspinner = false;
  
      this.showbutton = true;
      this.disablebutton = false;
      this.AudioOption = 'Delete';
  
      this.disableback = false;
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
      this.settingMsg = 'Set Your Voice Greeting';
  
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
    }  connectionerror() {
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
      this.state = RecordingState.RECORDING;
      const mediaConstraints = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.mediaavialable.bind(this), this.mediaerror.bind(this));
      this.seconds = 9;
      
      this.clearTimer();
      this.intervalId = window.setInterval(() => {
        this.seconds -= 1;
        if (this.seconds === 0) {
          this.mediaRecorder.stop();
          this.streamRef.getTracks().map((val) => {
            val.stop();
            return;
          });
        }
      }, 1000);
    } else { //pressed again
      this.mediaRecorder.stop();
      this.streamRef.getTracks().map((val) => {
        val.stop();
        return;
      });
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
  this.mediaRecorder.start();
  this.mediaRecorder.ondataavailable = e => {
   
    this.savegreeting();
  }
}     
  onNoClick(): void {
    this.dialogRef.close();
  }

}
/*pictures*/
@Component({
  selector: ' mat-dialog-title',
  template:`
    <mat-card ngStyle.lt-sm="background:gold; height: 40vh; width: 65vw;" ngStyle.gt-xs="background:gold;  height: 40vh; width: 30vw;" fxLayout="column" fxLayoutAlign="center center">
      <mat-card-title>picture</mat-card-title>
    </mat-card>
  `
})
export class DialogPictures
{

  constructor(
    public dialogRef: MatDialogRef<DialogPictures>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}
}