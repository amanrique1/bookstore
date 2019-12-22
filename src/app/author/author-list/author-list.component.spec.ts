import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppModule} from '../../app.module';
import {AuthorListComponent} from './author-list.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {AuthorService} from '../author.service';
import {Author} from '../author';

describe('AuthorListComponent', () => {
    let component: AuthorListComponent;
    let fixture: ComponentFixture<AuthorListComponent>;
    const authors: Author[] = require('../../../assets/authors.json');

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, AuthorService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should have a list of authors', () => {
        component.authors = authors;
        expect(component.authors.length).toEqual(authors.length);
    });

    it('a author should be a author (first and last)', () => {
        component.authors = authors;
        expect(component.authors[0].name).toEqual(authors[0].name);
        expect(component.authors[authors.length - 1].name).toEqual(authors[authors.length - 1].name);
    });
});