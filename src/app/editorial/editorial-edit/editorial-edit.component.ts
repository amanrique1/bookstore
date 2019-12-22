import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {EditorialService} from '../editorial.service';
import {EditorialDetail} from '../editorial-detail';


@Component({
    selector: 'app-editorial-edit',
    templateUrl: './editorial-edit.component.html',
    styleUrls: ['./editorial-edit.component.css']
})
export class EditorialEditComponent implements OnInit {

    /**
    * The component's constructor
    * @param editorialService The editorial's service
    * @param toastrService The toastr to show messages to the user 
    */
    constructor(
        private editorialService: EditorialService,
        private toastrService: ToastrService
    ) {}

    /**
    * The id of the editorial that the user wants to edit
    * This is passed as a parameter by the parent component
    */
    @Input() editorial_id: number;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an editorial
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user updated a new editorial
    */
    @Output() update = new EventEmitter();

    /**
    * The editorial to edit
    */
    editorial: EditorialDetail;

    /**
    * Retrieves the information of the editorial
    */
    getEditorial(): void {
        this.editorialService.getEditorialDetail(this.editorial_id)
            .subscribe(editorial => {
                this.editorial = editorial;
            });
    }

    /**
    * Updates the editorial's information
    */
    editEditorial(): void {
        this.editorialService.updateEditorial(this.editorial)
            .subscribe(() => {
                this.update.emit();
                this.toastrService.success("The editorial's information was updated", "Editorial edition");
            });
    }

    /**
    * Informs the parent component that the user no longer wants to update the editorial
    */
    cancelEdition(): void {
        this.cancel.emit();
    }

    /**
    * The function which initializes the component
    */
    ngOnInit() {
        this.editorial = new EditorialDetail();
        this.getEditorial();
    }

    /**
    * The function which is called every time the user chooses to edit a different editorial
    */
    ngOnChanges() {
        this.ngOnInit();
    }
}
