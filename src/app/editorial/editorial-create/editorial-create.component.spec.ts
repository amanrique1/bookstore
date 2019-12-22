import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {AppModule} from '../../app.module';
import { EditorialCreateComponent } from './editorial-create.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {EditorialService} from '../editorial.service';
import {Editorial} from '../editorial';


describe('EditorialCreateComponent', () => {
	let component: EditorialCreateComponent;
	let fixture: ComponentFixture<EditorialCreateComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, HttpClientModule, AppModule],
            declarations: [],
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: ''
                }, 
                EditorialService,
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
        fixture = TestBed.createComponent(EditorialCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
