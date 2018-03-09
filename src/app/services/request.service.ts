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

const URL = 'https://www.omdbapi.com/?apikey=62171b8b&type=movie&s=';

@Injectable()
export class RequestService {

	constructor (private http: HttpClient) { }

	/**
	 * Sends a GET request to the url with the search value
	 * @param {string} searchValue
	 * @returns {Observable<Object>}
	 */
	public getMovies (searchValue: string) {
		return this.http.get<Result>(URL + searchValue);
	}
}
