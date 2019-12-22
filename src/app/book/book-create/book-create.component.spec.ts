import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {AppModule} from '../../app.module';
import { BookCreateComponent } from './book-create.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {BookService} from '../book.service';
import {Book} from '../book';


describe('BookCreateComponent', () => {
 let component: BookCreateComponent;
    let fixture: ComponentFixture<BookCreateComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: ''
                }, 
                BookService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                           paramMap: convertToParamMap({id: 100})
                        }
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
