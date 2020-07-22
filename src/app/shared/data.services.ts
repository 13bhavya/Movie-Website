import { HttpClient } from '@angular/common/http';
import { Movies, Shows } from '../movies/movies-list/movies.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface MovieItems {
    title: string;
    imageUrl: string;
    rating: number;
    overview: string;
    releaseDate: Date;
}
@Injectable({ providedIn: 'root' })
export class DataService {
    imageUrl = 'https://image.tmdb.org/t/p/original';
    url = 'https://api.themoviedb.org/3/search/movie?api_key=62d1a8737b7c14a5d4f88ee3ec688227&language=en-US';
    newUrl: string;
    imagePath: string;
    title: string = '';
    rating: number;
    overview: string;
    releaseDate: Date;
    movieSelected = new Subject<MovieItems[]>();
    private movieItems: MovieItems[] = [];

    constructor(private http: HttpClient) { }

    fetchMovies(query: string) {
        this.newUrl = this.url + '&query=' + query;
        this.http.get<Movies>(this.newUrl)
            .subscribe(response => {
                this.movieItems = [];
                console.log(response)
                response.results.map(movie => {
                    this.imagePath = movie.poster_path;
                    this.title = movie.original_title;
                    this.rating = movie.vote_average;
                    this.overview = movie.overview;
                    this.releaseDate = movie.release_date;
                    if (movie.poster_path === null) {
                        return
                    } else {
                        let imageUrl = this.imageUrl + this.imagePath
                        let title = this.title
                        let overview = this.overview
                        let releaseDate = this.releaseDate
                        let rating = this.rating
                        this.movieItems.push({ title, imageUrl, rating, overview, releaseDate });
                        console.log(this.movieItems)
                    }
                })
            })
    }

    fetchSeries() {
        let showUrl = "https://api.themoviedb.org/3/search/tv?api_key=62d1a8737b7c14a5d4f88ee3ec688227&language=en-US&page=1&query=fast"
        this.http.get<Shows>(showUrl)
            .subscribe(response => {
                console.log(response)
            })
    }

    getUpcoming() {
        console.log("getUpcoming")
        this.http.get<Movies>('https://api.themoviedb.org/3/movie/upcoming?api_key=62d1a8737b7c14a5d4f88ee3ec688227&language=en-US&page=1')
            .subscribe(response => {
                this.movieItems = [];
                console.log(response)
                response.results.map(movie => {
                    this.imagePath = movie.poster_path;
                    this.title = movie.original_title;
                    this.rating = movie.vote_average;
                    this.overview = movie.overview;
                    this.releaseDate = movie.release_date;
                    if (movie.poster_path === null) {
                        return
                    } else {
                        let imageUrl = this.imageUrl + this.imagePath
                        let title = this.title
                        let overview = this.overview
                        let releaseDate = this.releaseDate
                        let rating = this.rating
                        this.movieItems.push({ title, imageUrl, rating, overview, releaseDate });
                        console.log(this.movieItems)
                    }
                })
            })
    }
    getNow() {
        console.log('getNow')
        this.http.get<Movies>('https://api.themoviedb.org/3/movie/now_playing?api_key=62d1a8737b7c14a5d4f88ee3ec688227&language=en-US&page=1')
            .subscribe(response => {
                this.movieItems = [];
                console.log(response)
                response.results.map(movie => {
                    this.imagePath = movie.poster_path;
                    this.title = movie.original_title;
                    this.rating = movie.vote_average;
                    this.overview = movie.overview;
                    this.releaseDate = movie.release_date;
                    if (movie.poster_path === null) {
                        return
                    } else {
                        let imageUrl = this.imageUrl + this.imagePath
                        let title = this.title
                        let overview = this.overview
                        let releaseDate = this.releaseDate
                        let rating = this.rating
                        this.movieItems.push({ title, imageUrl, rating, overview, releaseDate });
                        console.log(this.movieItems)
                    }
                })
            })
    }
    getPopular() {
        console.log("getPopular")
        this.http.get<Movies>('https://api.themoviedb.org/3/movie/popular?api_key=62d1a8737b7c14a5d4f88ee3ec688227&language=en-US&page=1')
            .subscribe(response => {
                this.movieItems = [];
                console.log(response)
                response.results.map(movie => {
                    this.imagePath = movie.poster_path;
                    this.title = movie.original_title;
                    this.rating = movie.vote_average;
                    this.overview = movie.overview;
                    this.releaseDate = movie.release_date;
                    if (movie.poster_path === null) {
                        return
                    } else {
                        let imageUrl = this.imageUrl + this.imagePath
                        let title = this.title
                        let overview = this.overview
                        let releaseDate = this.releaseDate
                        let rating = this.rating
                        this.movieItems.push({ title, imageUrl, rating, overview, releaseDate });
                        console.log(this.movieItems)
                    }
                })
            })
    }

    getData() {
        return this.movieItems.slice();
    }
}