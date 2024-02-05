import {Component, HostListener, OnInit} from '@angular/core';
import {ProductFullModel} from '../../BM-API/dtos/product-full.model';
import {Route, Event, NavigationEnd, Router} from '@angular/router';
import {BaseSearchModel} from "../../BM-API/dtos/base-search.model";
import {ProductService} from "../../BM-API/Services/warehouse/Product-service";
import {ResponseModel} from "../../BM-API/dtos/response.model";
import {HttpClient} from "@angular/common/http";
import {ExportingBillTransactionModel} from 'src/BM-API/dtos/exporting-bill-transaction.model';
import {SharedService} from 'src/BM-API/Services/Data/ShareService';
import {SizesModel} from "../../BM-API/dtos/sizes.model";
import {ColorsModel} from "../../BM-API/dtos/colors.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDtos: ProductFullModel[] = []; // Tao danh sach chua cac mon an
  isCardVisible = false;
  cardItem: ExportingBillTransactionModel[] = [];
  isLoading: Boolean = false;
  currentPage: number = 1;
  // test sau

  public search: BaseSearchModel<ProductFullModel[]> = new BaseSearchModel<ProductFullModel[]>();

  constructor(private http: HttpClient, private router: Router, private foodService: ProductService, private sharedService: SharedService) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;

    }, 1000);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  } // Lay tu foodservice


  private getAllProduct() {
    // cho cái load show chổ này
    this.foodService.getAllProduct().subscribe(
      res => {
        this.getAllProductComplete(res)
      });
  }

  private getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(
          value => {
            var t: any;
            t.error.message(value);
          }
        );
        return;
      }
    }
    // Lấy danh sách đối tượng từ API
    this.search = res.result;
    console.log(res.result);
    //set hình ảnh của sản phẩm là củ option đầu tiên
    for(let productChose of this.search.result)
      if (productChose.colors !== null && productChose.colors.length > 0) productChose.image = productChose.colors[0].image;

    //this.search.recordOfPage = 8;
    //Giá trị khi hiển thị mặc định là 8 sản phẩm
    this.search.recordOfPage = 8;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      // Your code here
      this.productDtos.push(this.search.result[i]);
    }


    ///cho cai load close chổ này
  }

  //Lay food trong menu chinh den food detail
  public getProductToDetail(item: ProductFullModel): void {
    console.log(item);
    this.sharedService.setData(item);
  }

  // addFoodToCardItem(item: ProductModel): void {
  //   console.log(item);
  //   let detail: ExportingBillTransactionModel = new ExportingBillTransactionModel();
  //   detail.product = new ProductModel();
  //   detail.product = item;
  //   this.cardItem.push(detail);
  // }


  //Giá trị phân trang cho tất cả sản phẩm
  quality: number = 1;
  itemInPageList: number[] = [4, 8, 12];

  //Thay phân trang khi chọn giá trị
  public updateDataOfPageWhenChoseNext(event: any) {

    this.search.recordOfPage = +event.pageSize;
    this.currentPage = +event.pageIndex + 1;
    if (this.currentPage > 0) {
      this.productDtos.splice(0, this.productDtos.length);
      var end: number = this.currentPage * this.search.recordOfPage;
      var start: number = end - this.search.recordOfPage;
      for (let i = start; i < end; i++) {
        // Your code here
        if (i < this.search.result.length) this.productDtos.push(this.search.result[i]);
      }
    }

  }

  ngOnInit(): void {
    console.log('Hello from ExampleService constructorcccccccccccc');
    this.getAllProduct();
  }

}
