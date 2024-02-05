import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ProductFullModel} from '../../BM-API/dtos/product-full.model';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {BaseSearchModel} from 'src/BM-API/dtos/base-search.model';
import {ProductService} from 'src/BM-API/Services/warehouse/Product-service';
import {ResponseModel} from 'src/BM-API/dtos/response.model';
import {ExportingBillTransactionModel} from 'src/BM-API/dtos/exporting-bill-transaction.model';
import {SharedService} from 'src/BM-API/Services/Data/ShareService';
import {ExportingBillModel} from "../../BM-API/dtos/exporting-bill.model";
import {SizesModel} from "../../BM-API/dtos/sizes.model";
import {ColorsModel} from "../../BM-API/dtos/colors.model";
import {ProductModel} from "../../BM-API/dtos/product.model";


@Component({
  selector: 'app-food-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {

  isCardVisible = false;
  cardItem: ExportingBillTransactionModel[] = [];
  cardItemSaving: ExportingBillTransactionModel[] = [];
  productDtos: ProductFullModel[] = []; // Tạo danh sách chứa các sản phẩm

  //Danh sach food get APi
  seach: BaseSearchModel<ProductFullModel> = new BaseSearchModel<ProductFullModel>();


  productDetail!: ProductFullModel; // sản phẩm cho người dùng coi
//  productChose!: ProductModel; // sản phẩm mà người dùng chọn để thêm vào vỏ hàng
  detailBill = new ExportingBillTransactionModel();
  isCardVibsible: Boolean = false;
  isCheckHasItem: Boolean = true;

  isLoading: Boolean = false;
  currentPage: number = 1;
  itemInPageList: number[] = [4, 8, 12];

  showAlert: boolean = false;
  img = "";

  @ViewChild('scrollTarget') scrollTarget!: ElementRef


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute,
              private sharedService: SharedService) {
    if (this.isCardVibsible) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      })
    }
  }

  inputNumberValue: number = 1;

  public increaseQuality(): void {
    this.inputNumberValue++;
  }

  public decreaseQuality(): void {
    if (this.inputNumberValue > 1) {
      this.inputNumberValue--;
    }
  }

  public decQty(item: ExportingBillTransactionModel) {
    if (item.quantity > 0) {
      item.quantity--;
    }
    if (item.quantity != null && item.product?.price != null) {
      item.amount = item.quantity * item.product.price;
    }


    for (let i = 0; i < this.cardItem.length; i++) {
      if (this.cardItem[i].quantity == 0) {
        console.log("ok");
        this.cardItem.splice(i, 1);
      }
    }

    //Set amount of card
    this.totalCard();
    //update localStore save card
    localStorage.setItem('card', JSON.stringify(this.cardItem));
  }


  ngOnInit(): void {
    //Khoi tao lay id food param
    this.getProductId(this.route.snapshot.params['id']);

    //Lay danh sach food
    this.getAllProduct();
    //this.getFoodById();

    //Lay food khi khoi tao page detail
    this.productDetail = this.getProductFromMenuProduct();
    //set gia tri cho product

    this.detailBill.product = new ProductModel();
    if (this.detailBill && this.detailBill.product)
      this.detailBill!.product = this.detailBill!.product?.CoppyData(this.productDetail);
    //this.productChose = new ProductModel(this.productDetail);
    console.log("va qua rr");
    console.log(this.productDetail.colors?.[0]?.optionProduct );

    if (this.productDetail.sizes !== null && this.productDetail.sizes.length > 0) {
      let sizeDto = new SizesModel(this.productDetail.sizes[0]);
      this.detailBill!.size = sizeDto;
    }

    if (this.productDetail.colors !== null && this.productDetail.colors.length > 0) {
      let color = new ColorsModel(this.productDetail.colors[0]);
      this.detailBill!.color = color;
      this.detailBill!.product!.image = color.image;
    }


    //Load card item đã được lưu trữ, đồng thời giỏ hàng sẽ tồn tại sản phẩm
    const getCardItemSaving = localStorage.getItem('card');
    if (getCardItemSaving) {
      this.cardItem = [];
      this.cardItem = JSON.parse(getCardItemSaving);
      console.log(this.cardItem);
    }
  }

  public onChangeColorOption(option: number) {
    let index = +option;

    if (this.productDetail.colors !== null && this.productDetail.colors.length > 0) {
      let color = new ColorsModel(this.productDetail.colors[index]);
      this.detailBill!.color = color;
      this.detailBill!.product!.image = color.image;
      this.productDetail.image = color.image;
      console.log(color.image);

    }
  }

  public onChangeSizeOption(option: number) {
    let index = +option;


    if (this.productDetail.sizes !== null && this.productDetail.sizes.length > 0) {
      let sizesDto = new SizesModel(this.productDetail.sizes[index]);
      this.detailBill!.size = sizesDto;

    }
  }


  public getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      res => {
        this.getAllProductComplete(res);
      }
    )
    console.log("hello product old");
  }


  public getProductId(id: any): void {
    console.log("ahihi");
    this.productService.getProductById(id).subscribe(
      res => {
        this.productDetail = res;
        console.log(this.productDetail);
      }
    )
  }

  //Ham kiem tra ket qua tra ve danh sach cac mon an
  public getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductFullModel[]>>): void {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(
          value => {
            var t: any;
            t.error.message(value);
          }
        )
      }
    }
    this.seach = res.result;


    //this.search.recordOfPage = 8;
    this.seach.recordOfPage = 4;
    for (let i = 0; i < this.seach.recordOfPage; i++) {
      // Your code here
      this.productDtos.push(this.seach.result[i]);
    }
  }

  public updateDataOfPageWhenChoseNext(event: any) {

    this.seach.recordOfPage = +event.pageSize;
    this.currentPage = +event.pageIndex + 1;
    if (this.currentPage > 0) {
      this.productDtos.splice(0, this.productDtos.length);
      var end: number = this.currentPage * this.seach.recordOfPage;
      var start: number = end - this.seach.recordOfPage;
      for (let i = start; i < end; i++) {
        // Your code here
        if (i < this.seach.result.length) this.productDtos.push(this.seach.result[i]);
      }
    }

  }


  public toogleCard(): void {
    this.isCardVisible = !this.isCardVisible;
  }


  public addProductToCardItem(): void {
    //console.log(item);
    let checkItemExist = false;
    let detail: ExportingBillTransactionModel = new ExportingBillTransactionModel(this.detailBill);

    console.log("ready :");
    console.log(detail);

    if (this.cardItem.length != 0) {
      this.cardItem.forEach(param => {
        console.log("ready :");
        // console.log(param.product?.id + "-----" + detail.product!.id);
        // console.log(param.product?.sizes![0].optionProductDto!.name + "-----" + this.productChose.sizes![0].optionProductDto!.name);
        // console.log(param.product?.colors![0].optionProductDto!.name + "-----" + this.productChose.colors![0].optionProductDto!.name)
        if (param.product?.id === detail.product!.id && param.size.optionProduct!.name === this.detailBill.size.optionProduct!.name && param
          .color.optionProduct.name === this.detailBill.color.optionProduct.name) {// cùng id cùng id option cùng id option detail

          param.quantity++;
          if (param.product?.price != null) {
            param.amount = param.quantity * param.product?.price;
            //Cập nhật giỏ hàng
            localStorage.setItem('card', JSON.stringify(this.cardItem));
          }
          checkItemExist = true;
          return;
        }
      });
    }

    if (checkItemExist) {
      this.showAlertMessage()
      return;
    }

    if (detail.product?.price != null) {
      detail.amount = detail.quantity * detail.product.price;
    }
    console.log("ready :");
    this.cardItem.push(detail);

    //Lưu giỏ hàng vào localstore toàn cục
    localStorage.setItem('card', JSON.stringify(this.cardItem));
    //Amount to card display
    this.totalCard();

    this.showAlertMessage();
  }

  showAlertMessage() {
    //alert add item
    this.showAlert = true;
    setTimeout(() => {
      this.hideAlert();
    }, 1500); // 1 second
  }

  hideAlert() {
    this.showAlert = false;
  }

  totalCard(): number {
    let sumPriceCardDisplay: number = 0;
    //Display status card
    this.cardItem.forEach(element => {
      if (element.amount != null) {
        sumPriceCardDisplay += element.amount;
      }
    });

    //check status
    if (sumPriceCardDisplay != 0) {
      this.isCheckHasItem = false;
    } else {
      this.isCheckHasItem = true;
    }
    return sumPriceCardDisplay;

  }


  public createExportingbill(): ExportingBillModel {

    //Tinh tong cong so tien chon san pham
    let exFull: ExportingBillTransactionModel = new ExportingBillTransactionModel();
    exFull.bill = new ExportingBillModel();
    exFull.bill.agency = null;
    exFull.bill.customer = null;

    let sum = 0;
    this.cardItem.forEach(value => {
      if (value.amount != null) {
        sum += value.amount;
      }
    });
    //tinh tong tien cac item trong gio hang
    exFull.bill.total = sum;

    this.cardItem.forEach(value => {
      value.bill = exFull.bill;
    });

    return exFull.bill;
  }


  public selectProductForProductDetail(item: ProductFullModel): void {
    this.productDetail = item;
    console.log("caigi");


    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  public getProductFromMenuProduct(): ProductFullModel {
    let a = this.sharedService.getData();
    console.log("va qua r");
    console.log(a);
    return a;
  }


  //UPDATE  chieu cao card khi san pham tang dan
  updateMinHeight() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
      const cartItemRows = cartElement.querySelectorAll('tbody tr');
      const minHeight = 100 + 50 * cartItemRows.length;
      cartElement.style.minHeight = minHeight + 'px';
    }
  }


  public setDataExportingbillTransaction() {
    this.sharedService.setDataExportingbillTransaction(this.cardItem);
    this.sharedService.setDataExportingbill(this.createExportingbill());

    console.log(this.sharedService.getDataExportingbill());
    console.log(this.sharedService.getDataExportingbillTransaction())
    this.router.navigate(['./customer-info']);// this ts code in angular is move to another page but I want to pass list object to that page, how can you modify it to solve my project
  }

}
