import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialSharedModule } from './../../shared/material-module/material-shared.module';
import { DialogComponent } from './../../mat-modules/dialog/dialog.component';
import { FirebaseService } from './../../shared/services/firebase/firebase.service';
import { CommonModule } from '@angular/common';
import { Users } from './../../shared/services/interface/users.service';
import { User } from './../../shared/services/interface/user.service';
import { Observable, of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  imports: [MaterialSharedModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Änderungserkennung für bessere Performance
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  public firebaseService = inject(FirebaseService);
  public users$: Observable<Users[]> = this.firebaseService.users$;
  public selectedUser$: Observable<User | null> = of(null);
  public selectedUserId: string | null = null;
  public error: string | null = null;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<DialogComponent>;
  isDialogOpen: boolean = false;
  loading: boolean = false;

  /**
   * Tracking-Funktion für die Benutzerliste in der `*ngFor`-Direktive.
   * Dadurch wird eine effizientere Aktualisierung der DOM-Elemente ermöglicht.
   *
   * @param {number} index - Der Index des Elements in der Liste.
   * @param {Users} user - Das Benutzerobjekt.
   * @returns {string | undefined} Die eindeutige Benutzer-ID oder `undefined`, falls keine vorhanden ist.
   */
  trackByUserId(index: number, user: Users): string | undefined {
    return user.id;
  }

  /**
   * Wählt einen Benutzer aus und lädt die zugehörigen Benutzerdaten aus Firestore.
   *
   * @param {string} userId - Die ID des Benutzers, der geladen werden soll.
   */
  selectUser(userId: string): void {
    this.selectedUserId = userId;
    this.selectedUser$ = this.firebaseService.getUserById('users', userId).pipe(
      catchError((error) => {
        this.error = 'Benutzer konnte nicht geladen werden';
        console.error('Error fetching user:', error);
        return of(null);
      }),
    );
  }

  /**
   * Setzt die Benutzerauswahl zurück und zeigt wieder die Benutzerliste an.
   */
  resetSelection(): void {
    this.selectedUserId = null;
    this.selectedUser$ = of(null);
  }

  /**
   * Aktualisiert die Benutzerliste, indem die Daten erneut aus Firestore geladen werden.
   * Falls ein Fehler auftritt, wird `error` gesetzt.
   */
  refreshUsers(): void {
    this.loading = true;
    this.users$ = this.firebaseService.getUsersRef().pipe(
      catchError((err) => {
        this.error = 'Fehler beim Laden der Benutzerliste';
        console.error('Error fetching user list:', err);
        this.loading = false;
        return of([]);
      }),
    );

    this.users$.subscribe(() => {
      this.loading = false;
      this.cdr.markForCheck(); // Manuelles Triggern der Änderungserkennung
    });
  }

  /**
   * Öffnet einen modalen Dialog.
   * Falls bereits ein Dialog geöffnet ist, wird kein neuer geöffnet.
   */
  openDialog(): void {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        name: 'Mate Dialog',
        isDialogOpen: this.isDialogOpen,
        loading: this.loading,
      },
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
    });

    // Nach dem Schließen des Dialogs wird `isDialogOpen` zurückgesetzt und die Ansicht aktualisiert
    this.dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
      this.cdr.markForCheck();
    });
  }

  // /**
  //  * Öffnet einen Dialog zur Bearbeitung eines Benutzers.
  //  *
  //  * @param {User} user - Der Benutzer, der bearbeitet werden soll.
  //  */
  // openEditDialog(user: User): void {
  //   this.dialog.open(DialogComponent, {
  //     data: user,
  //     autoFocus: false,
  //   });
  // }
}
