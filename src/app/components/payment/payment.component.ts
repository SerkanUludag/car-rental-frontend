import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { Rental } from 'src/app/models/rental/rental';
import { DataService } from 'src/app/services/data/data.service';
import { PaymentServiceService } from 'src/app/services/payment/payment-service.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  cardNumber: string;
  isPaymentVerified: boolean;
  startDate: string;
  endDate: string;
  subscriptionForStartDate: Subscription;
  subscriptionForEndDate: Subscription;
  subscriptionForCurrentCar: Subscription;
  dataLoaded: boolean = false;
  currentCar: Car;

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentServiceService,
    private activaredRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscriptionForStartDate = this.dataService.currentStartDate.subscribe(
      (date) => (this.startDate = date)
    );
    this.subscriptionForEndDate = this.dataService.currentEndDate.subscribe(
      (date) => {
        this.endDate = date;
        this.dataLoaded = true;
      }
    );
    this.subscriptionForCurrentCar = this.dataService.currentCar.subscribe(
      (car) => {
        this.currentCar = car;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptionForStartDate.unsubscribe();
    this.subscriptionForEndDate.unsubscribe();
    this.subscriptionForCurrentCar.unsubscribe();
  }

  pay() {
    this.paymentService.pay(this.cardNumber).subscribe((response) => {
      if (response.success) {
        this.isPaymentVerified = true;
        let newRental = new Rental();
        newRental.carId = this.currentCar.id;
        newRental.customerId = 1; // todo
        newRental.rentDate = new Date(this.startDate);
        newRental.returnDate = new Date(this.endDate);
        console.log(newRental);

        this.rentalService.addRental(newRental).subscribe((res) => {
          if (res.success) {
            console.log('rental added');
            this.toastr.success('Rent successfull');
            this.router.navigate(['/cars']);
          } else {
          }
        });
      } else {
        this.isPaymentVerified = false;
        this.toastr.error('Invalid card number. Try again.');
      }
    });
  }

  dateDiffInDays() {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    let a = new Date(this.startDate);
    let b = new Date(this.endDate);

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
