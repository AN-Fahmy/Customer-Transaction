import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerData: any[] = [];
  transactionData: any[] = [];
  searchQuery: number | string = '';
  filteredCustomers: any[] = [];
  filteredTransactions: any[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCustomers().subscribe({
      next: (res) => this.customerData = res
    });
    this.userService.getTransactions().subscribe({
      next: (res) => {
        this.transactionData = res}
    });
  }

  getTransactionsByCustomerId(customerId: any): any[] {
    
    return this.transactionData.filter(transaction => transaction.customer_id === customerId);
  }

  filterTransactionsByCustomerName(): void {
    this.filteredCustomers = [];
    this.filteredTransactions = [];

    if (typeof this.searchQuery === 'number') {
      const searchTerm = this.searchQuery;
      this.filteredTransactions = this.transactionData
        .filter(transaction => transaction.amount === searchTerm)
        .map(transaction => transaction.customer_id);
      this.filteredTransactions.map(customerId => {
        this.filteredCustomers = this.customerData.filter(customer => customer.id === customerId).map(customer => customer);
      });
    } else {
      const searchTerm = this.searchQuery?.toString().toLowerCase();
      this.filteredCustomers = this.customerData
        .filter(customer => customer.name?.toLowerCase().includes(searchTerm))
        .map(customer => customer);
    }
  }

  getDisplayData(): any[] {
    if (this.filteredCustomers.length !== 0) {
      return this.filteredCustomers;
    } else if (this.filteredTransactions.length !== 0) {
      return this.filteredCustomers;
    } else {
      return this.customerData;
    }
  }
}