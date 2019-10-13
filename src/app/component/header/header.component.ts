import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  text = "";
  currentValue=0;
  value = [
    "Ethereum",
    "इथीरियम",
    "以太坊",
    "Etérium",
    "Αιθέριο",
    "إثيريوم",
    "Ξ",
    "イーサリアム",
    "Eterijum",
    "Эфириум",
    "이더리움",
    "อีเธอเรียม"
  ];
  constructor() {}

  ngOnInit() {
    this.loadValue();
  }
  loadValue() {
    setInterval(() => {
      if(this.currentValue==this.value.length){
        this.currentValue=0;
      }
      else
      this.currentValue++;
      this.text=this.value[this.currentValue]
    }, 500);
  }
}
