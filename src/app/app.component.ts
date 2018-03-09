import { Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { RequestService, Result } from './services/request.service';

export interface MovieItem {
	title: string,
	year: number,
	url: string
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [RequestService]
})
export class AppComponent {
	@ViewChild(MatSort) sort: MatSort;

	public searchValue = '';
	public searchResult: MovieItem[] = [];
	public searchError = false;
	public errorMessage = '';
	public searching = false;
	public displayedColumns = ['year', 'title'];
	public dataSource;
	public hidden = true;

	constructor (private requestService: RequestService) { }

	/**
	 * Subscribes to the request made by requestService and forwards the result.
	 */
	public onSearchMovie () {
		if (this.searchValue !== '') {
			this.searching = true;
			this.requestService.getMovies(this.searchValue).subscribe(
				data => this.handleMovies(data),
				err => this.handleError('Search failed'));
		}
	}

	/**
	 * Opens a new tab with the selected movie
	 * @param {string} url
	 */
	public onMovie (url: string) {
		window.open(url, '_blank');
	}

	/**
	 * Handles Movies
	 * Resets the table with results and adds new movies if there are any.
	 * @param {Result} data
	 */
	private handleMovies (data: Result) {
		this.searchResult = [];
		this.searching = false;

		if (data.Response === 'False') {
			this.handleError('No result')
		} else {
			this.searchError = false;
			this.hidden = false;
			for (let movie of data.Search) {
				let movieItem: MovieItem = {
					title: movie.Title,
					year: +movie.Year,
					url: 'http://www.imdb.com/title/' + movie.imdbID
				}
				this.searchResult.push(movieItem)
			}

			if (this.searchResult.length > 10) this.searchResult.length = 10;
			this.dataSource = new MatTableDataSource(this.searchResult);
			this.dataSource.sort = this.sort;
		}
	}

	/**
	 * Handles Error
	 * Disables spinning icon, hides table and sets an error message
	 * @param {string} msg
  */
	private handleError (msg: string) {
		this.searchError = true;
		this.searching = false;
		this.hidden = true;
		this.errorMessage = msg;
	}
}
