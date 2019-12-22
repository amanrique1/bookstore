import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {ToastrService} from 'ngx-toastr';

import {Editorial} from '../editorial';
import {EditorialService} from '../editorial.service';

/**
* The component for the list of editorials in the BookStore
*/
@Component({
    selector: 'app-editorial',
    templateUrl: './editorial-list.component.html',
    styleUrls: ['./editorial-list.component.css']
})
export class EditorialListComponent implements OnInit {

    /**
    * Constructor for the component
    * @param editorialService The author's services provider
    */
    constructor(
        private editorialService: EditorialService,
        private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef,
        private toastrService: ToastrService) {}


    /**
    * The list of editorials which belong to the BookStore
    */
    editorials: Editorial[];

    /**
    * Shows or hides the create component
    */
    showCreate: boolean;

    /**
     * Shows or hides the edit component.
     */
    showEdit: boolean;

    /**
     * The id of the editorial being edited.
     */
    editorial_edit_id: number;

    /**
    * Asks the service to update the list of editorials
    */
    getEditorials(): void {
        this.editorialService.getEditorials()
            .subscribe(editorials => {
                this.editorials = editorials;
            });
    }

    /**
    * Shows or hides the create component
    */
    showHideCreate(): void {
        this.showEdit = false;
        this.showCreate = !this.showCreate!
    }

    /**
    * Shows or hides the create component
    */
    showHideEdit(editorial_id: number): void {
        if (!this.showEdit || (this.showEdit && editorial_id != this.editorial_edit_id)) {
            this.showCreate = false;
            this.showEdit = true;
            this.editorial_edit_id = editorial_id;
        }
        else {
            this.showEdit = false;
        }
    }

    updateEditorial(): void {
        this.showEdit = false;
    }

    /**
    * Deletes an editorial
    */
    deleteEditorial(editorialId): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete an editorial',
            childComponent: SimpleModalComponent,
            data: {text: 'Are you sure your want to delete this editorial from the BookStore?'},
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.editorialService.deleteEditorial(editorialId).subscribe(() => {
                            this.toastrService.error("The editorial was successfully deleted", "Editorial deleted");
                            this.ngOnInit();
                        }, err => {
                            this.toastrService.error(err, "Error");
                        });
                        return true;
                    }
                },
                {text: 'No', onAction: () => true}
            ]
        });
    }



    /**
    * This will initialize the component by retrieving the list of editorials from the service
    * This method will be called when the component is created
    */
    ngOnInit() {
        this.showCreate = false;
        this.showEdit = false;
        this.getEditorials();
    }
}


