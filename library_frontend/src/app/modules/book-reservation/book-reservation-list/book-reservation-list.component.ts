import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookReservationService } from 'src/app/services/book-reservation.service';

@Component({
  selector: 'app-book-reservation-list',
  templateUrl: './book-reservation-list.component.html',
  styleUrls: ['./book-reservation-list.component.css']
})
export class BookReservationListComponent implements OnInit{

  reservationList : any = [];
  activeReservationList : any = [];
  constructor(private bookReservationService: BookReservationService,
              private router: Router,
              private toastrService: ToastrService){

  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.bookReservationService.getReservations().subscribe(data=>{
      this.reservationList = data;

      this.activeReservationList = [];
      this.reservationList.forEach(element => {
        if(element.isComplete == false){
          this.activeReservationList.push(element);
        }
      });
      console.log('active reservlist ',this.activeReservationList);
      
    })
  }

  addBookReservation(){
    this.router.navigateByUrl('/book-reservation/add-book-reservation');
  }

  editReservation(id: any){
    this.router.navigateByUrl(`/book-reservation/edit-book-reservation/${id}`);
  }

  completeReservation(reservation: any){
    this.bookReservationService.completeReservation(reservation).subscribe(() => {
      console.log('Book reservation completed successfully!');
      this.toastrService.success('Book reservation completed successfully!');
      this.getReservations();
    }, (err) => {
      console.log(err);

    });
  }

  deleteReservation(id: any, i: any){
    if(window.confirm('Are you sure want to delete this reservation?')){
      this.bookReservationService.deleteReservation(id).subscribe(data=>{
        this.toastrService.error('Reservation deleted successfully!');
        this.getReservations();
      })
    }
  }


}
