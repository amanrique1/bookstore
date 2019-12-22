import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {AppModule} from '../../app.module';
import {BookReviewComponent} from './book-review.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {BookService} from '../book.service';
import {Book} from '../book';
import {Review} from '../review';

describe('BookReviewsComponent', () => {
    let component: BookReviewComponent;
    let fixture: ComponentFixture<BookReviewComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, BookService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookReviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
});
