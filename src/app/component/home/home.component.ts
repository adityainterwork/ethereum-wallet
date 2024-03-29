import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../../service/ethcontract.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  title = "Transfer Ethers";
  accounts: any;
  transferFrom = "0x0";
  balance = "0 ETH";
  transferTo = "";
  amount = 0;
  remarks = "";
  constructor(private ethcontractService: EthcontractService) {
    this.initAndDisplayAccount();
  }

  initAndDisplayAccount = () => {
    let that = this;
    this.ethcontractService
      .getAccountInfo()
      .then(function(acctInfo: any) {
        console.log("*******************");
        console.log(acctInfo.fromAccount);
        that.transferFrom = acctInfo.fromAccount;
        that.balance = acctInfo.balance;
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  transferEther(event) {
    let that = this;
    console.log(this.transferTo);
    this.ethcontractService
      .transferEther(
        this.transferFrom,
        this.transferTo,
        this.amount,
        this.remarks
      )
      .then(function() {
        that.initAndDisplayAccount();
      })
      .catch(function(error) {
        console.log(error);
        that.initAndDisplayAccount();
      });
  }
}
