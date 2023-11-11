import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FoodDto } from '../../BM-API/Dtos/FoodDto';
import { FoodService } from '../services/food/food.service';
import { Route, Event, NavigationEnd, Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})

export class FoodDetailComponent implements OnInit{
  foods: FoodDto[] = [];
  foodsCard: FoodDto[] = [];
  foodDetail: FoodDto | undefined;
  isCardVibsible = false;

  @ViewChild('scrollTarget') scrollTarget!: ElementRef

  constructor(private fs: FoodService, private router: Router, private elenmentRef : ElementRef, private route: ActivatedRoute){
    if(this.isCardVibsible){
      this.router.events.subscribe((event: Event) => {
        if(event instanceof NavigationEnd){
          window.scrollTo(0, 0);
        }
      })
    }
  }

  quality : number = 1;

  increaseQuality(): void{
    this.quality++;
  }

  decreaseQuality(): void{
    if(this.quality > 1){
      this.quality--;
    }
  }

  ngOnInit(): void{
    this.foods = this.fs.getAll();
    this.foodsCard = this.fs.getCardAll();
    this.getFoodById();
  }


  toggleShow(): void{
    this.isCardVibsible = !this.isCardVibsible;

    if(this.isCardVibsible){
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // comfirmOrderFood(): void {
  //   if(this.foodDetail != null){
  //     this.addFoodToCard(this.foodDetail);
  //     window.alert(this.foodsCard);

  //     this.toggleShow();
  //   }
  // } Xu ly doan nay


  getFoodById(){
    const routeParams = this.route.snapshot.paramMap;
    const foodIdFromRoute = Number(routeParams.get('id')); // Lay food theo id tren local

    this.foodDetail = this.foods.find(foodDetail => foodDetail.id === foodIdFromRoute);
    //console.log(this.foodDetail);
  }


  addFoodToCard(food: FoodDto): void {
    //goi foodservice de them food vao gio hang
    this.fs.addFoodToCard(food);
    window.alert("Bạn đã thêm món ăn vào giỏ hàng");
  }
}
