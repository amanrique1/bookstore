import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EditorialService } from '../editorial.service';
import { Editorial } from '../editorial';
import { EditorialDetail } from '../editorial-detail';

@Component({
    selector: 'app-editorial-detail',
    templateUrl: './editorial-detail.component.html',
    styleUrls: ['./editorial-detail.component.css']
})
export class EditorialDetailComponent implements OnInit {

    /**
    * The component's constructor
    * @param editorialService The editorial's service
    * @param route The route element which helps to obtain the editorial's id
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private editorialService: EditorialService,
        private route: ActivatedRoute
    ) { }

    /**
    * The editorial whose details we want to show
    */
    editorialDetail: EditorialDetail;



    /**
    * The editorial's id retrieved from the address
    */
    editorial_id: number;

    /**
    * The method which retrieves the books of an editorial
    */
    getEditorialDetail(): void {
        this.editorialService.getEditorialDetail(this.editorial_id)
            .subscribe(editorialDetail => {
                this.editorialDetail = editorialDetail
            });
    }

    /**
    * The method which initializes the component
    * We need to initialize the editorial so it is never considered as undefined
    */
    ngOnInit() {
        this.editorial_id = +this.route.snapshot.paramMap.get('id');
        this.editorialDetail = new EditorialDetail();
        this.getEditorialDetail();
    }

}
