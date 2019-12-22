import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Book} from './book';
import {BookDetail} from './book-detail';
import {Review} from './review';


import {environment} from '../../environments/environment';
const API_URL = environment.apiURL;
const books = '/books';
const reviews = '/reviews';


/**
* The service provider for everything related to books
*/
@Injectable()
export class BookService {

    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) {}

    /**
    * Returns the Observable object containing the list of books retrieved from the API
    * @returns The list of books in real time
    */
    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(API_URL + books);
    }

    /**
    * Creates a new book
    * @param book The new book
    * @returns The book with its new id if it was created, false if it wasn't
    */
    createBook(book): Observable<BookDetail> {
        return this.http.post<BookDetail>(API_URL + books, book);
    }

    /**
    * Returns the Observable object with the details of an author retrieved from the API
    * @returns The author details
    */
    getBookDetail(bookId): Observable<BookDetail> {
        return this.http.get<BookDetail>(API_URL + books + '/' + bookId);
    }

    /**
    * Creates a review
    * @param review The review
    * @returns True if the review was posted, false otherwise
    */
    createReview(bookId, review): Observable<Review> {
        return this.http.post<Review>(API_URL + books + '/' + bookId + reviews, review);
    }

    /**
        * Updates a new book
        * @param book The updated book
        * @returns The updated book
        */
    updateBook(book): Observable<BookDetail> {
        return this.http.put<BookDetail>(API_URL + books + '/' + book.id, book);
    }
    
    /**
    * Deletes a book
    * @param bookId The book's id
    * @returns True if the book was deleted, false otherwise
    */
    deleteBook(bookId): Observable<BookDetail> {
        return this.http.delete<BookDetail>(API_URL + books + '/' + bookId);
    }
}
