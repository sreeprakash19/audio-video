import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth} from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable, of, merge, fromEvent } from 'rxjs';
import { switchMap, first, map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface IGeometry {
  type: string;
  coordinates: number[];
}
export interface User{
  uid: string;
  email: string;
  photoURL ?: string;
  displayName ?: string;
  phoneNumber ?: string;
  Gender ?: string;
  AnniversaryDate ?: string;
  BirthDate ?: string;
  customdisplayName ?: string;
  customphotoURL?: string;
  GiftsBank?: number;
}
export interface PincodeItem { Id: string; Lat: string; Lng: string; Pin: string; createdAt: Timestamp; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User> = null ;
  isOnline$: Observable<boolean> = undefined;
  mypinitems: IGeometry[] = [];

  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { 
    //afAuth needs clear understanding .. it will have data from chrome user login
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
    this.user$ = this.afAuth.authState.pipe(
      switchMap( (user) => {
        if (user){
           // console.log('already logged in', user);// chrome has authdata but db valuechanges is tracked via user$
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else{ //chrome has no authdata so we need login to proceed like newuser
          //console.log('needs login because chrome does not have auth data');
          return of(null);
        }
      })
    );
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    const firstTimeLogin = await this.afs.doc(`users/${credential.user.uid}`).valueChanges().pipe(first()).toPromise();
    console.log('after login', firstTimeLogin);
    if( firstTimeLogin !== undefined){
      //console.log('after login- returning user');
      return this.updateUserData(credential.user, true);
    } else{
      //console.log('after login- new user');
      return this.updateUserData(credential.user, false);

    }
  }

  private updateUserData(user, olduser ){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber : null,
      Gender : null,
      AnniversaryDate : 'Jan 1',
      BirthDate : 'Jan 1',
      customdisplayName : '',
      customphotoURL : '',
      GiftsBank: 0
    };
    const returningUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    if(olduser === true){
      return userRef.set( returningUser, {merge: true});
    } else{
      return userRef.set(data);
    }

  }
  async signOut(){
    this.router.navigate(['']);
    await this.afAuth.signOut();
  }
  createPoint(lat, lng, pincode) {
    //const id = this.afs.createId();
    const collection = this.afs.collection(`pincode`);
    // tslint:disable-next-line: max-line-length
    collection.add({Id: firebase.firestore().app.auth().currentUser.uid, Lat : lat , Lng: lng, Pin: pincode, createdAt: firebase.firestore.FieldValue.serverTimestamp()});
  }
  getAllmyMarker(pincode) : IGeometry[]{
    // tslint:disable-next-line: max-line-length
    this.afs.collection<PincodeItem>('pincode', ref => ref.where('Pin', '==', Number(pincode) ).orderBy('createdAt').limit(2)).valueChanges().forEach(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const mycoordinates = [Number(doc.Lat), Number(doc.Lng)]
          this.mypinitems.push( { type: 'Point', coordinates: mycoordinates });
        });
      });

    return this.mypinitems;
  }

}