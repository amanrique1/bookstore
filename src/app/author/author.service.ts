import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Author } from './author';
import { AuthorDetail } from './author-detail';
import { environment } from '../../environments/environment';

const API_URL = environment.apiURL;
const authors = '/authors';


/**
* The service provider for everything related to authors
*/
@Injectable()
export class AuthorService {
    
    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) { }
    
    /**
    * Returns the Observable object containing the list of authors retrieved from the API
    * @returns The list of authors in real time
    */
    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(API_URL + authors);
    }
    
    /**
    * Returns the Observable object with the details of an author retrieved from the API
    * @returns The author details
    */
    getAuthorDetail(authorId): Observable<AuthorDetail> {
        return this.http.get<AuthorDetail>(API_URL + authors + '/' + authorId);
    }
    
    /**
    * Creates an author
    * @param author The new author
    * @returns The confirmation that the author was created
    */
    createAuthor(author): Observable<Author> {
        return this.http.post<Author>(API_URL + authors, author);
    }
    
    /**
    * Updates an author
    * @param author The author's information updated
    * @returns The confirmation that the author was updated
    */
    updateAuthor(author): Observable<AuthorDetail> {
        return this.http.put<AuthorDetail>(API_URL + authors + '/' + author.id, author);
    }
    
    /**
    * Deletes an author from the BookStore
    * @param authorId The id of the author
    * @returns The confirmation that the author was deleted
    */
    deleteAuthor(authorId): Observable<boolean> {
        return this.http.delete<boolean>(API_URL + authors + '/' + authorId);
    }
    
}
