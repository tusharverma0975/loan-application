import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css',
})
export class MainComponentComponent {
  public readonly minLoanAmount: number = 1_000_000;
  public readonly maxLoanAmount: number = 17_484_500;
  public readonly minLoanPeriod: number = 6;
  public readonly maxLoanPeriod: number = 18;
  private readonly interestRate: number = 0.05;

  public maxFunding: number = 17_484_500;
  public loanAmount: number = 14_500_000;
  public loanPeriod: number = 12;
  public estimatedMonthlyRepayment: number = 0;
  public vehicleModel: string = 'Honda ADV 150 CBS';
  public vehicleYear: number = 2022;

  constructor() {}

  ngOnInit(): void {
    this.calculateMonthlyRepayment();
  }

  public calculateMonthlyRepayment(): void {
    const monthlyInterestRate: number = this.interestRate / 12;
    const totalPayments: number = this.loanPeriod;

    const monthlyPayment: number =
      (this.loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    this.estimatedMonthlyRepayment = Math.round(monthlyPayment / 1000) * 1000;
  }

  public onLoanAmountChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.loanAmount = Number(target.value);
    this.calculateMonthlyRepayment();
  }

  public onLoanPeriodChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.loanPeriod = Number(target.value);
    this.calculateMonthlyRepayment();
  }

  public applyLoan(): void {
    console.log({
      loanAmount: this.loanAmount,
      loanPeriod: this.loanPeriod,
      monthlyRepayment: this.estimatedMonthlyRepayment,
      vehicleModel: this.vehicleModel,
      vehicleYear: this.vehicleYear,
    });
  }

  public formatCurrency(amount: number): string {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }
}
