import {Component, OnInit} from '@angular/core';
import {ProductFullModel} from '../../bm-api/dtos/product-full.model';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BaseSearchModel} from "../../bm-api/dtos/base-search.model";
import {ProductService} from "../../bm-api/Services/warehouse/Product-service";
import {ResponseModel} from "../../bm-api/dtos/response.model";
import {SharedService} from 'src/bm-api/Services/Data/ShareService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDtos: ProductFullModel[] = []; // Tao danh sach chua cac mon an
  currentPage: number = 1;
  isLoading: boolean = false;

  public search: BaseSearchModel<ProductFullModel[]> = new BaseSearchModel<ProductFullModel[]>();

  constructor(private router: Router, private foodService: ProductService, private sharedService: SharedService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }


  private getAllProduct() {
    this.isLoading = true;
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
    //set hình ảnh của sản phẩm là củ option đầu tiên
    for (let productChose of this.search.result)
      if (productChose.colors !== null && productChose.colors.length > 0) productChose.image = productChose.colors[0].image;

    //this.search.recordOfPage = 8;
    //Giá trị khi hiển thị mặc định là 8 sản phẩm
    this.search.recordOfPage = 12;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      // Your code here
      this.productDtos.push(this.search.result[i]);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  //Lay food trong menu chinh den food detail
  public getProductToDetail(item: ProductFullModel): void {
    this.sharedService.setData(item);
  }


  //Giá trị phân trang cho tất cả sản phẩm
  quality: number = 1;
  itemInPageList: number[] = [4, 8, 12, 16];

  //Thay phân trang khi chọn giá trị
  async updateDataOfPageWhenChoseNext(event: any) {
    this.isLoading = true;
    this.search.recordOfPage = +event.pageSize;
    this.currentPage = +event.pageIndex + 1;
    if (this.currentPage > 0) {
      this.productDtos.splice(0, this.productDtos.length);
      var end: number = this.currentPage * this.search.recordOfPage;
      var start: number = end - this.search.recordOfPage;
      for (let i = start; i < end; i++) {
        if (i < this.search.result.length) this.productDtos.push(this.search.result[i]);
      }
      this.actionScrollChange();
    }
  }

  actionScrollChange() {
    //Scroll top
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.getAllProduct();
  }
}
