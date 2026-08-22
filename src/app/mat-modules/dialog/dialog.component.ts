import { Component, inject, OnInit } from '@angular/core';
import { MaterialSharedModule } from '../../shared/material-module/material-shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../shared/services/interface/user.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-dialog',
  imports: [MaterialSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  /** Daten, die an den Dialog übergeben wurden */
  public data = inject(MAT_DIALOG_DATA);
  isDialogOpen: boolean = this.data.isDialogOpen || false;
  loading: boolean = this.data.loading;
  birthDate!: Date;

  //   // newUser: User = new User(
  //   //   '', // Vorname
  //   //   '', // Nachname
  //   //   '', // E-Mail
  //   //   '', // Telefon
  //   //   '', // Straße
  //   //   '', // Hausnummer
  //   //   '', // PLZ
  //   //   '', // Stadt
  //   //   '', // Land
  //   //   new Date(), // Geburtsdatum (optional Standardwert: neues Datum)
  //   //   '', // Beschreibung
  //   //   '', // Rolle
  //   //   '', // Ort
  //   //   '' // ID (optional)
  //   // );

  newUser: User = new User(
    'Konstantin',
    'Aksenov',
    'Konstantin.Aksenov@dev2k.net',
    '+595 994221200',
    'Home-Str.',
    '187',
    '9370',
    'Loma Plata',
    'Paraguay',
    new Date(),
    'Any Description',
    'Admin',
    'Any Place',
    '',
  );

  /**
   * Fügt einen neuen Benutzer zur Firestore-Datenbank hinzu.
   *
   * @returns {Promise<void>} Ein Promise, das entweder erfolgreich abgeschlossen wird oder einen Fehler ausgibt.
   */
  async addUser(): Promise<void> {
    const usersCollection = collection(this.firestore, 'users');

    if (!usersCollection) {
      throw new Error('Collection reference konnte nicht erstellt werden.');
    }

    try {
      const docRef = await addDoc(usersCollection, this.newUser.toJSON());
      console.log('User erfolgreich hinzugefügt:', docRef.id);
      this.newUser.id = docRef.id;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Fehler beim Hinzufügen des Benutzers:', message);
    }
  }

  /**
   * Initialisiert den Dialog und gibt die übergebenen Daten aus.
   */
  ngOnInit(): void {
    console.log(this.data);
    console.log('Firestore:', this.firestore);
  }
}
