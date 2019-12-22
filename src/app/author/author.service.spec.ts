import {ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {Author} from './Author';
import {AuthorService} from './author.service';
import {AppModule} from '../app.module';


describe('Service: AuthorService', () => {
    let injector: TestBed;
    let service: AuthorService;
    const authors: Author[] = require('../../assets/authors.json');
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, AuthorService]
        });
        injector = getTestBed();
        service = injector.get(AuthorService);
    });
    
    it('#getAuthors should return value from observable',
    (done: DoneFn) => {
    service.getAuthors().subscribe(value => {
        expect(value.length).toBeGreaterThan(0);
        done();
        });
    });
    
    it('#getAuthorDetail should return an existing author',
    (done: DoneFn) => {
    service.getAuthorDetail(authors[0].id).subscribe(value => {
        expect(value.name).toEqual(authors[0].name);
        done();
        });
    });
	
	it('#createAuthor should return the author created',
    (done: DoneFn) => {
    service.createAuthor(authors[0]).subscribe(value => {
        expect(value.name).toEqual(authors[0].name);
        done();
        });
    });
	
	it('#updateAuthor should return the author updated',
    (done: DoneFn) => {
	service.createAuthor(authors[0]).subscribe(value => {});
    service.updateAuthor(authors[0]).subscribe(value => {
        expect(value.name).toEqual(authors[0].name);
        done();
        });
    });
    
});