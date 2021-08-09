import firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {User} from '../shared/user.interfaces';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, of} from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user$: Observable<User>;
    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private db: AngularFirestore,
                private storage: AngularFireStorage) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>('users/${user.uid}').valueChanges();
                }
                return of(null);
            })
        );
    }

    async resetPassword(email): Promise<void> {
        try {
            return this.afAuth.sendPasswordResetEmail(email);
        } catch (error) {
            console.log('Error-->', error);
        }
    }

    async loginGoogle(): Promise<User> {
        try {
            const {user} = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            await this.updateUserData(user);
            return user;
        } catch (error) {
            console.log('Error-->', error);
        }
    }
    async register(email: string, password: string, name: string, phone: string, dp: string) {
        try {
            const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
            await this.sendVerificationEmail();
            const uid = user.uid;
            await this.db.collection('users2').doc(uid).set({
                name,
                uid,
                email,
                phone,
                dp
            });
            return user;
        } catch (error) {
            console.log('Error-->', error);
        }
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
            await this.updateUserData(user);
            console.log(user);
            console.log('el UID ES', user.uid);
            return user;
        } catch (error) {
            console.log('Error-->', error);
        }
    }

    async sendVerificationEmail(): Promise<void> {
        try {
            return (await this.afAuth.currentUser).sendEmailVerification();
        } catch (error) {
            console.log('Error-->', error);

        }
    }

    isEmailVerified(user: User): boolean {
        return user.emailVerified === true ? true : false;
    }

    async logout(): Promise<void> {
        try {
            await this.afAuth.signOut();
        } catch (error) {
            console.log('Error-->', error);
        }
    }

    private updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
        const data: User = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,

        };
        return userRef.set(data, {merge: true});
    }

    // uploadImage(file: any, path: string, nombre: string): Promise<string> {
    //     return new Promise(resolve => {
    //         const filePath = path + '/' + nombre;
    //         const ref = this.storage.ref(filePath);
    //         const task = ref.put(file);
    //         task.snapshotChanges().pipe(
    //             finalize(() => {
    //                 const downloadURL = ref.getDownloadURL();
    //             })
    //         ).subscribe();
    //     });
    // }

    public insertData(collection, datauser) {
        return this.afs.collection(collection).add(datauser);
    }


}
