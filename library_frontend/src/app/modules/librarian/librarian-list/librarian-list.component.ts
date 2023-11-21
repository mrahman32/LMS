import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibrarianService } from 'src/app/services/librarian.service';

@Component({
  selector: 'app-librarian-list',
  templateUrl: './librarian-list.component.html',
  styleUrls: ['./librarian-list.component.css']
})
export class LibrarianListComponent implements OnInit{

  librarianList : any = [];
  constructor(private librarianService: LibrarianService,
              private router: Router,
              private toastrService: ToastrService){

  }

  ngOnInit(): void {
    this.getLibrarians();
  }

  getLibrarians(){
    this.librarianService.getLibrarians().subscribe(data=>{
      this.librarianList = data;
    })
  }

  addLibrarian(){
    this.router.navigateByUrl('/librarian/add-librarian');
  }

  editLibrarian(id: any){
    this.router.navigateByUrl(`/librarian/edit-librarian/${id}`);
  }

  deleteLibrarian(id: any, i: any){
    if(window.confirm('Are you sure want to delete this librarian?')){
      this.librarianService.deleteLibrarian(id).subscribe(data=>{
        this.toastrService.error('Librarian deleted successfully!');
        this.getLibrarians();
      })
    }
  }
}
