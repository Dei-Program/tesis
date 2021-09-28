import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestorageService {

    constructor(private storage: AngularFireStorage, private FireStore: AngularFirestore) {
    }

    // casi
    // uploadImage() {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(true);
    //             console.log('responde  la promesa');
    //             return;
    //         }, 2000);
    //
    //     });
    // }
    uploadImage(file: any, path: string, nombre: string): Promise<string> {
        return new Promise(resolve => {
            const filePath = path + '/' + nombre;
            const ref = this.storage.ref(filePath);
            const task = ref.put(file);
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                            const downloadURL = res;
                            resolve(downloadURL);
                            return;
                        }
                    );
                })
            ).subscribe();
        });
    }

    createDocument<tipo>(data: tipo, enlace: string, id: string) {
        const ref = this.FireStore.collection<tipo>(enlace);
        return ref.doc(id).set(data);
    }

    creatId() {
        return this.FireStore.createId();
    }

    getCollectionChanges<tipo>(path: string): Observable<tipo[]> {
        const ref = this.FireStore.collection<tipo>(path);
        return ref.valueChanges();
    }
}
