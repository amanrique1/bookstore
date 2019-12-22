import {ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {Book} from './Book';
import {Review} from './review';
import {BookService} from './Book.service';
import {AppModule} from '../app.module';


describe('Service: BookService', () => {
    let injector: TestBed;
    let service: BookService;
	const books: Book[] = require('../../assets/books.json');
	const reviews: Review[] = require('../../assets/reviews.json');
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, BookService]
        });
        injector = getTestBed();
        service = injector.get(BookService);
    });
	
	it('#getBooks should return value from observable',
    (done: DoneFn) => {
    service.getBooks().subscribe(value => {
        expect(value.length).toBeGreaterThan(0);
        done();
        });
    });
    
    it('#createBook should return value from observable',
    (done: DoneFn) => {
   let book:Book = {id:0,name:"Prueba",isbn:"987612345",publishingdate: "2017/01/06",image:"Prueba",description:"Prueba",editorial:{ id: 100, name: "Oveja Negra"}};
    service.createBook(book).subscribe(value => {
        expect(value.name).toEqual(book.name);
        done();
        });
    });
	
	it('#getBookDetail should return value from observable',
    (done: DoneFn) => {
    service.getBookDetail(books[0].id).subscribe(value => {
        expect(value.name).toEqual(books[0].name);
        done();
        });
    });
	it('#createReview should return value from observable',
    (done: DoneFn) => {
    service.createReview(books[0].id,reviews[0]).subscribe(value => {
        expect(value.name).toEqual(reviews[0].name);
        done();
        });
    });
	
	it('#updateBook should return the book updated',
    (done: DoneFn) => {
	let book:Book = {id:100,name:"Prueba",isbn:"987612345",publishingdate: "2017/01/06",image:"Prueba",description:"Prueba",editorial:{ id: 100, name: "Oveja Negra"}};
    service.updateBook(book).subscribe(value => {
        expect(value.name).toEqual(book.name);
        done();
        });
    });
    
});