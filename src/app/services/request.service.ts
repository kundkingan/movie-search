import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Result {
	Search?: Movie[],
	totalResults: string,
	Response: string
}

export interface Movie {
	Title: string,
	Year: string,
	imdbID: string,
	Type: string,
	Poster: string
}

@Injectable()
export class RequestService {

	constructor(private http: HttpClient) { }

	private url = 'https://www.omdbapi.com/?apikey=62171b8b&type=movie&s=';
	private currentSearchValue;

	public getMovies(searchValue) {
		this.currentSearchValue = searchValue;
		return this.http.get<Result>(this.url + searchValue);
	}

	public getPage(pageNr) {
		return this.http.get<Result>(this.url + this.currentSearchValue + '&page=' + pageNr)
	}

}
