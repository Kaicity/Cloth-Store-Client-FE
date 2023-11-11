import { Injectable } from '@angular/core';
import { FoodDto } from 'src/BM-API/Dtos/FoodDto';
// import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // //http goi den back-end
  // private baseURL = 'http://localhost:8080/springboot-crud-rest/api/v1/foods';

  // constructor(private http: HttpClient) { }

  // //Lay chi tiet mon an tu danh sach mon an
  // getFood(id: Number) :Observable<any>{
  //   return this.http.get('${this.baseURL}/${id}');
  // }

  // //Them mon an
  // createFood(food: Object): Observable<Object> {
  //   return this.http.post('${this.baseURL', food);
  // }

  // //update mon an
  // updateFood(id: number, value: any): Observable<object> {
  //   return this.http.put('${this.baseURL}/${id}', value);
  // }

  // //Xoa mon an
  // deleteFood(id: number): Observable<any> {
  //   return this.http.delete('${this.baseURL}/${id}', {responseType: 'text'});
  // }

  foods: FoodDto [] = [
    {
      id: 1,
      price: 55.000,
      name: "Burger",
      quatity: 10,
      discription: "Burger đậm đà hương vị truyền thống",
      favorite: true,
      id_category: 1,
      name_category: "Cake",
      imageURL: "assets/food_1.jpg"
    },
    {
      id: 2,
      price: 109.000,
      name: "Pizza",
      quatity: 10,
      discription: "Pizaa ngon oải cả chưởng ngại gì không ăn ?",
      favorite: true,
      id_category: 5,
      name_category: "Big cake",
      imageURL: "assets/food_2.jpg"
    },
    {
      id: 3,
      price: 75.000,
      name: "Salad",
      quatity: 31,
      discription: "Rau củ quả đa số đều ung thư",
      favorite: true,
      id_category: 3,
      name_category: "Fresh",
      imageURL: "assets/food_3.jpg"
    },
    {
      id: 4,
      price: 65.000,
      name: "Sushi",
      quatity: 15,
      discription: "Sushi đậm đà hương vị truyền thống",
      favorite: false,
      id_category: 1,
      name_category: "Sushi Hàn Quốc",
      imageURL: "assets/food_4.jpg"
    },
    {
      id: 5,
      price: 85.000,
      name: "Pasta",
      quatity: 13,
      discription: "Chưa có mô tả",
      favorite: false,
      id_category: 10,
      name_category: "Ring",
      imageURL: "assets/food_5.jpg"
    },
    {
      id: 6,
      price: 35.000,
      name: "Taco",
      quatity: 12,
      discription: "Món này ăn vào sẽ chết",
      favorite: true,
      id_category: 4,
      name_category: "hotdog",
      imageURL: "assets/food_6.jpg"
    },
    {
      id: 7,
      price: 40.000,
      name: "Ice Cream",
      quatity: 22,
      discription: "Kem tươi ngon hết sảy",
      favorite: true,
      id_category: 1,
      name_category: "cream",
      imageURL: "assets/food_7.jpg"
    },
    {
      id: 8,
      price: 88.000,
      name: "Hotdog",
      quatity: 50,
      discription: "Xúc xích của chúng tôi ngon từ đáy lòng",
      favorite: true,
      id_category: 9,
      name_category: "hotdog",
      imageURL: "assets/food_8.jpg"
    },
  ];

  cardFood: FoodDto[] = [];

  //Tao mot phuong thuc tra ve hien thi hinh anh cua tat ca mon an( DU LIEU MAU)
  getAll(): FoodDto[]{
    return this.foods;
  }

  getCardAll(): FoodDto[] {
    return this.cardFood;
  }

  addFoodToCard(food: FoodDto): void{
    this.cardFood.push(food); // Phuong thuc cho phep them mot san pham vao gio hang
  }

  clearFoodCard() {
    this.cardFood = [];
    return this.cardFood;
  }

  // getFoodList(): Observable<any> {
  //   return this.http.get('${this.baseURL}');
  // }
}
