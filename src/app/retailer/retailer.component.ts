import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../services/contract.service'
declare var Materialize;
@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {
name = 'Retailer';
dataValue = [];

  @ViewChild('product') product: any;
  @ViewChild('orderNo') orderNo: any;
  @ViewChild('deliveryDate') deliveryDate: any;
  @ViewChild('temp') temp: any;
  @ViewChild('price') price: any;
  @ViewChild('quantity') quantity: any;

  constructor(private contract: ContractService) { }

  ngOnInit() {
    this.contract.checkReportTrigger.subscribe(result => {
      if (result.length >= 1) {
      this.setData(result);
      }
    });
  }
  setData(result) {
      if( result[1] == '1') {
      this.dataValue.push({orderno: result[0], fileInfo: 'http://127.0.0.1:8080/ipfs/' + result[2]});
      }
    }

  onSubmit(event) {
    this.contract.createOrder(this.orderNo.nativeElement.value,
      this.product.nativeElement.value,
      this.deliveryDate.nativeElement.value.toString(),
      this.temp.nativeElement.value,
      this.price.nativeElement.value,
      this.quantity.nativeElement.value).then(result => {
      console.log(result);
      Materialize.toast('Request Created. Tx id: ' + result.tx, 4000);
    });
  }

}
