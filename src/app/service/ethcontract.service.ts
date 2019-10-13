import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../../../build/contracts/Payment.json');

@Injectable({
  providedIn: 'root'
})
export class EthcontractService {

  private provider=null;
  private contracts: {};

constructor() {
  try {
     this.provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
  } catch (error) {
    console.log("no")
  }
   

    window.web3 = new Web3(this.provider);
  }
  getAccountInfo() {
   
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        console.log(account)
        if(err === null) {
          window.web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              console.log({fromAccount: account, balance:(window.web3.fromWei(balance, "ether")).toNumber()});
            return resolve({fromAccount: account, balance:(window.web3.fromWei(balance, "ether")).toNumber()});
            } else {
              console.log({fromAccount: "error", balance:0});
               return reject({fromAccount: "error", balance:0});
            }
          });
        }
      });
    });
  }

  transferEther(
    _transferFrom,
    _transferTo,
    _amount,
    _remarks
  ) {
    let that = this;

    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.provider);

      paymentContract.deployed().then(function(instance) {
          return instance.transferFund(
            _transferTo,
            {
              from:_transferFrom,
              value:window.web3.toWei(_amount, "ether")
            });
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
          console.log(error);

          return reject("Error in transferEther service call");
        });
    });
  }
}