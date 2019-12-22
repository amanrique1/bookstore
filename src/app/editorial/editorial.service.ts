import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Editorial } from './editorial';
import { EditorialDetail } from './editorial-detail';

import { environment } from '../../environments/environment';
const API_URL = environment.apiURL;
const editorials = '/editorials';


/**
* The service provider for everything related to editorials
*/
@Injectable()
export class EditorialService {

    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) { }

    /**
    * Returns the Observable object containing the list of editorials retrieved from the API
    * @returns The list of books in real time
    */
    getEditorials(): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(API_URL + editorials);
    }

    /**
    * Returns the Observable object containing the editorial retrieved from the API
    * @returns The editorial
    */
    getEditorialDetail(editorialId): Observable<EditorialDetail> {
        return this.http.get<EditorialDetail>(API_URL + editorials + '/' + editorialId);
    }
    
    /**
    * Creates an editorial
    * @param editorial The editorial which will be created
    * @returns The confirmation of the editorial's creation
    */
    createEditorial(editorial): Observable<Editorial> {
        return this.http.post<Editorial>(API_URL + editorials, editorial);
    }
    
    /**
    * Updates an editorial
    * @param editorial The editorial which will be update
    * @returns The confirmation of the editorial's update
    */
    updateEditorial(editorial): Observable<EditorialDetail> {
        return this.http.put<EditorialDetail>(API_URL + editorials + '/' + editorial.id, editorial);
    }
    
    /**
    * Deletes an editorial
    * @param editorialId The editorial which will be deleted
    * @returns True if the editorial was deleted, false otherwise
    */
    deleteEditorial(editorialId): Observable<EditorialDetail> {
        return this.http.delete<EditorialDetail>(API_URL + editorials + '/' + editorialId);
    }
}
