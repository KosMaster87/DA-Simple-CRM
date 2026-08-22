import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: FirebaseService, useValue: { users$: of([]) } },
        { provide: Firestore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
