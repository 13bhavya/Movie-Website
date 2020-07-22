import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/data.services';
import { MovieItems } from 'src/app/shared/data.services';
import { HttpClient } from '@angular/common/http';
import { MatRadioChange } from '@angular/material';
import { MovieItem } from './movieItem.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movieItems: MovieItems[] = [];
  movieRadio: MovieItems[] = [];
  changeText: boolean = false;

  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  constructor(private modalService: NgbModal,
    private http: HttpClient,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPopular()
    setTimeout(() => { 
      this.movieRadio = this.dataService.getData();
    }, 2000)

  }

  // onClick() {
  //   console.log(this.radioModel)
  //   if (this.radioModel === 1) {
  //     this.dataService.getNow()
  //   } else if (this.radioModel === 2) {
  //     this.dataService.getNow()
  //   } else {
  //     this.dataService.getUpcoming();
  //   }
  //   this.movieRadio = this.dataService.getData();
  // }

  radioChangeHandler(event: MatRadioChange) {
    if (event.value == 1) {
      console.log(event.value == 1)
      this.dataService.getPopular()
      console.log(this.movieRadio)
    } else if (event.value == 2) {
      this.dataService.getNow()
    } else {
      this.dataService.getUpcoming()
    }
    this.movieRadio = this.dataService.getData()
  }

  onSubmit(searForm: NgForm) {
    let queryIn = searForm.value.search;
    this.dataService.fetchMovies(queryIn)
    this.movieItems = []
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.movieItems = this.dataService.getData());
      }, 1000);
    });
    promise.then(() => {

    }, error => {
      console.log(error);
    });

    // async () => {
    //   await this.dataService.fetchData(queryIn);
    //   // this.movieItems = this.dataService.getData();

    // }

    // this.dataService.movieSelected.next();
    console.log("Items", this.movieItems)
  }
}
