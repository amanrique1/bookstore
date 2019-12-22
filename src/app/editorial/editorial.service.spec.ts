import {ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {Editorial} from './Editorial';
import {EditorialService} from './Editorial.service';
import {AppModule} from '../app.module';


describe('Service: EditorialService', () => {
    let injector: TestBed;
    let service: EditorialService;
	const editorials: Editorial[] = require('../../assets/editorials.json');
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AppModule],
            declarations: [],
            providers: [{provide: APP_BASE_HREF, useValue: ''}, EditorialService]
        });
        injector = getTestBed();
        service = injector.get(EditorialService);
    });
    
    it('#getEditorials should return value from observable',
    (done: DoneFn) => {
    service.getEditorials().subscribe(value => {
        expect(value.length).toBeGreaterThan(0);
        done();
        });
    });
	
	it('#createEditorial should return value from observable',
    (done: DoneFn) => {
    let editorial:Editorial = {id:100,name:"prueba"};
    service.createEditorial(editorial).subscribe(value => {
        expect(value.name).toEqual(editorial.name);
        done();
        });
    });
	
	it('#getEditorialDetail should return value from observable',
    (done: DoneFn) => {
    service.getEditorialDetail(editorials[0].id).subscribe(value => {
        expect(value.name).toEqual(editorials[0].name);
        done();
        });
    });
	
	it('#updateEditorial should return the editorial updated',
    (done: DoneFn) => {
	let editorial:Editorial = {id:100,name:"prueba"};
    service.updateEditorial(editorial).subscribe(value => {
        expect(value.name).toEqual(editorial.name);
        done();
        });
    });
    
});