import {AngularFireStorage} from "@angular/fire/compat/storage";

export class FirebaseStorage {
  constructor(private storage: AngularFireStorage) {
  }

  getImageUrl(path: string): Promise<string | null> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL().toPromise();
  }
}
