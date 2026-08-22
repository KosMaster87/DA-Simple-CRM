import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Users } from './../interface/users.service';
import { User } from './../interface/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  public users$: Observable<Users[]> = this.getUsersRef();

  /**
   * Ruft eine Referenz zur Sammlung "users" aus Firestore ab und gibt die Daten als Observable zurück.
   *
   * @returns {Observable<Users[]>} Ein Observable mit der Benutzerliste.
   */
  getUsersRef(): Observable<Users[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection) as Observable<Users[]>;
  }

  /**
   * Ruft ein einzelnes Benutzer-Dokument aus Firestore ab.
   *
   * @param {string} collectionId - Der Name der Firestore-Sammlung.
   * @param {string} documentId - Die ID des gewünschten Benutzerdokuments.
   * @returns {Observable<User>} Ein Observable mit den Benutzerdaten.
   */
  getUserById(collectionId: string, documentId: string): Observable<User> {
    const userDocRef = doc(this.firestore, `${collectionId}/${documentId}`);
    return docData(userDocRef) as Observable<User>;
  }
}
