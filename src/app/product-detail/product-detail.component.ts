import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ProductFullModel} from '../../bm-api/dtos/product-full.model';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {BaseSearchModel} from 'src/bm-api/dtos/base-search.model';
import {ProductService} from 'src/bm-api/Services/warehouse/Product-service';
import {ResponseModel} from 'src/bm-api/dtos/response.model';
import {ExportingBillTransactionModel} from 'src/bm-api/dtos/exporting-bill-transaction.model';
import {SharedService} from 'src/bm-api/Services/Data/ShareService';
import {ExportingBillModel} from "../../bm-api/dtos/exporting-bill.model";
import {SizesModel} from "../../bm-api/dtos/sizes.model";
import {ColorsModel} from "../../bm-api/dtos/colors.model";
import {ProductModel} from "../../bm-api/dtos/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Component({
  selector: 'app-food-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {

  isCardVisible = false;
  cardItem: ExportingBillTransactionModel[] = [];

  productDtos: ProductFullModel[] = []; // Tạo danh sách chứa các sản phẩm

  //Danh sach san pham get APi
  search: BaseSearchModel<ProductFullModel> = new BaseSearchModel<ProductFullModel>();

  productDetail!: ProductFullModel; // sản phẩm cho người dùng coi

  detailBill = new ExportingBillTransactionModel();
  isCardVibsible: Boolean = false;
  isCheckHasItem: Boolean = true;

  isLoading: Boolean = false;
  currentPage: number = 1;
  itemInPageList: number[] = [4, 8, 12];

  showAlert: boolean = false;
  img = "";

  isShowModalProductDetail: boolean = false;

  selectedOptionColor!: number;
  selectedOptionSize!: number;
  ref: any;

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute,
              private sharedService: SharedService, private snackBar: MatSnackBar, private fireStorage: AngularFireStorage) {
    if (this.isCardVibsible) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
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

  ngOnInit(): void {
    //Khoi tao lay id food param
    this.getProductId(this.route.snapshot.params['id']);

    //Neu load lai thi tro ve trang san pham ban dau
    if (this.getProductFromMenuProduct() === undefined) {
      this.router.navigate(['/']);
    }

    //Lay danh sach food
    this.getAllProduct();
    //this.getFoodById();

    //Lay food khi khoi tao page detail
    this.productDetail = this.getProductFromMenuProduct();
    //set gia tri cho product

    this.detailBill.product = new ProductModel();
    if (this.detailBill && this.detailBill.product)
      this.detailBill!.product = this.detailBill!.product?.CoppyData(this.productDetail);


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
    }
  }

  public onChangeColorOption(option: number) {
    let index = +option;
    this.selectedOptionColor = index;
    if (this.productDetail.colors !== null && this.productDetail.colors.length > 0) {
      let color = new ColorsModel(this.productDetail.colors[index]);
      this.detailBill!.color = color;
      this.detailBill!.product!.image = color.image;

      //set image firebase when choose size
      let myPath: string;
      const path = 'image_data_client/product/' + color.image; // Your image path
      this.ref = this.fireStorage.ref(path)
      this.ref.getDownloadURL().subscribe((url: any) => {
        this.productDetail.image = url;
      });
    }
    this.scrollToTop();
  }

  public onChangeSizeOption(option: number) {
    let index = +option;
    this.selectedOptionSize = index;
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
  }


  public getProductId(id: any): void {
    this.productService.getProductById(id).subscribe(
      res => {
        this.productDetail = res;
      }
    )
  }

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

    // Lấy danh sách đối tượng từ API
    this.search = res.result;

    //set hình ảnh của sản phẩm là củ option đầu tiên
    for (let productChose of this.search.result)
      if (productChose.colors !== null && productChose.colors.length > 0) productChose.image = productChose.colors[0].image;

    //this.search.recordOfPage = 8;
    //Giá trị khi hiển thị mặc định là 8 sản phẩm
    this.search.recordOfPage = 4;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      this.productDtos.push(this.search.result[i]);
    }

    //Image url firebase
    this.getImagePathFirebase();
  }

  getImagePathFirebase(): void {
    //Code bởi NQTiến 12/05/2024 lay path hình ảnh từ firebase gán ngược lại giá trị image của product
    this.productDtos.forEach(value => {
      const path = 'image_data_client/product/' + value.image; // Your image path
      this.ref = this.fireStorage.ref(path)
      this.ref.getDownloadURL().subscribe((url: any) => {
        value.image = url
      });
    })
  }

  public updateDataOfPageWhenChoseNext(event: any) {
    this.search.recordOfPage = +event.pageSize;
    this.currentPage = +event.pageIndex + 1;
    if (this.currentPage > 0) {
      this.productDtos.splice(0, this.productDtos.length);
      var end: number = this.currentPage * this.search.recordOfPage;
      var start: number = end - this.search.recordOfPage;
      for (let i = start; i < end; i++) {
        // Your code here
        if (i < this.search.result.length) {
          this.productDtos.push(this.search.result[i]);
          this.getImagePathFirebase();
        }
      }
    }
  }


  public addProductToCardItem(): void {
    //Kiem tra co mau sac va size chua
    if (this.selectedOptionSize == null || this.selectedOptionColor == null) {
      this.openSnackBar("Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn.", "Đã hiểu");
    } else {
      let checkItemExist = false;
      let detail: ExportingBillTransactionModel = new ExportingBillTransactionModel(this.detailBill);

      if (this.cardItem.length != 0) {
        this.cardItem.forEach(param => {
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

      this.cardItem.push(detail);

      //Lưu giỏ hàng vào localstore toàn cục
      localStorage.setItem('card', JSON.stringify(this.cardItem));


      //Amount to card display
      this.totalCard();

      this.sharedService.setDataExportingbillTransaction(this.cardItem);
      this.sharedService.setDataExportingbill(this.createExportingbill());

      this.showAlertMessage();

      location.reload();
    }
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
    this.isShowModalProductDetail = false;
    this.productDetail = item;
    this.detailBill.product!.image = this.productDetail.image;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  public getProductFromMenuProduct(): ProductFullModel {
    let a = this.sharedService.getData();
    return a;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
