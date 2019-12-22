import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {AppModule} from '../../app.module';
import {AuthorEditComponent} from './author-edit.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {AuthorService} from '../author.service';
import {Author} from '../author';
describe('AuthorEditComponent', () => {
    let component: AuthorEditComponent;
    let fixture: ComponentFixture<AuthorEditComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: ''
                }, 
                AuthorService,
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
        fixture = TestBed.createComponent(AuthorEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
