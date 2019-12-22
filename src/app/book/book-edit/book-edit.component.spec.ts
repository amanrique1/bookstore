import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {AppModule} from '../../app.module';
import { BookEditComponent } from './book-edit.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {BookService} from '../book.service';
import {Book} from '../book';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
    let fixture: ComponentFixture<BookEditComponent>;
    
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
        fixture = TestBed.createComponent(BookEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
