export interface Users {
  id?: string; // Optional, falls Firestore automatisch IDs generiert
  firstName: string;
  lastName: string;
  role: string;
}
