import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  images!: Observable<string[]>;
  images_dict: { [key: string]: string } = {"": "defaultImage"}

  images_test!: Observable<string[]>;
  image_dict_test: { [key: string]: string } = {"": "defaultImage"};

  constructor(private fireStorage: AngularFireStorage) {
  }

  async ngOnInit() {
    //url store in DB
    const imagePaths = ['/image_data_client/product/assets/food_0.jpg', '/image_data_client/product/assets/food_1.jpg', '/image_data_client/product/assets/food_2.jpg'];
    const observables = imagePaths.map(path => this.getImageUrl(path));
    //url store in firebase
    this.images = forkJoin(observables)

    let i = 0;
    this.images.subscribe(imagesArray => {
      imagesArray.forEach(imageUrl => {
        console.log(imageUrl);
        this.images_dict[imagePaths[i++]] = imageUrl
      });
    });


    // for int i=0;i<imagePaths.length;i++
    //       get image of this.images belong to imagePaths[i]
    //   this.images_dict[imagePaths[i++]] = imageUrl of this.images

    const imagePaths_test = ['/image_data_client/product/assets/'];
    for (let i = 0; i < imagePaths_test.length; i++) {
      let obser = imagePaths_test.map(path => {
          this.getImageUrl(path);

          this.images_test.subscribe(imageUrl => {
            console.log(imageUrl);
          })
        }
      )
    }

  }

  async onFileChange(events: any) {
    const file = events.target.files[0];
    if (file) {
      const path = `yt/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
    }
  }

  async getImagesInDirectory(directory: string): Promise<string[]> {
    const ref = this.fireStorage.ref(directory);
    const listResult = await ref.listAll().toPromise();
    if (listResult && listResult.items) {
      const urls: string[] = [];
      await Promise.all(listResult.items.map(async (item) => {
        const url = await item.getDownloadURL();
        urls.push(url);
      }));
      return urls;
    } else {
      return [];
    }
  }


  getImageKeys(): string[] {
    return Object.keys(this.images_dict);
  }


  private getImageUrl(path: string): Observable<string> {
    const ref = this.fireStorage.ref(path);
    return ref.getDownloadURL();
  }

}
