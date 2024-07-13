import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  itemList: any[] = [];
  filteredTransactions: any[] = [];
  transactions:any[]=[]
  newTransactions:any[]=[]
  x:any[]=[]
  result: any[] = [];
  dates: any[] = [];
  amounts: any[] = [];

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });

    this.UserService.getCustomers().subscribe({
      next: (res) => (this.itemList = res),
    });

    this.UserService.getTransactions().subscribe({
      next: (res) => {
        this.filteredTransactions = res
        this.transactions = res
        },
    });
  }

  filterByName(name: any) {
    name = name.target.value;
    this.result = this.itemList
      .filter((customer) => customer.name == name)
      .map((transaction) => transaction.id);
    this.result.map((transition) => {
      this.newTransactions = this.transactions
        .filter((customer) => customer.customer_id == transition)
        .map((transaction) => transaction);
    });
    this.dates = this.newTransactions.map((transaction) => transaction.date);
    this.amounts = this.newTransactions.map(
      (transaction) => transaction.amount
    );
    this.x = this.newTransactions;
    google.charts.setOnLoadCallback(this.drawChart(this.newTransactions));
  }

  drawChart(Transactions:any []) {    
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Total Amount');

    Transactions.forEach((transaction) => {
      data.addRows([[transaction.date, transaction.amount]]);

    });

    var options = {
      title: 'Total Transaction Amount per Day',
    };

    var chart = new google.visualization.LineChart(
      document.getElementById('chart-container')
    );
    chart.draw(data, options);
  }
}
