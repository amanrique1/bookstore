import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {ToastrService} from 'ngx-toastr';

import {AuthorService} from '../author.service';
import {Author} from '../author';
import {AuthorDetail} from '../author-detail';

/**
* The author's list component
*/
@Component({
    selector: 'app-author',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

    /**
    * Constructor for the component
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private authorService: AuthorService,
        private modalDialogService: ModalDialogService,
        private viewRef: ViewContainerRef,
        private toastrService: ToastrService) {}

    /**
    * The list of authors which belong to the BookStore
    */
    authors: Author[];

    /**
    * The id of the author that the user wants to view
    */
    author_id: number;

    /**
    * Shows or hides the author-create-component
    */
    showCreate: boolean;

    /**
     * Shows or hides the detail of an author
     */
    showView: boolean;

    /**
    * Shows or hides the edition of an author
    */
    showEdit: boolean;

    /**
     * the author that the user views.
     */
    selectedAuthor: Author;


    /**
    * Shows the author
    */
    onSelected(author_id: number): void {
        this.showCreate = false;
        this.showEdit = false;
        this.showView = true;
        this.author_id = author_id;
        this.selectedAuthor = new AuthorDetail();
        this.getAuthorDetail();
    }

    /**
    * Shows or hides the create component
    */
    showHideCreate(): void {
        this.showView = false;
        this.showEdit = false;
        this.showCreate = !this.showCreate;
    }

    /**
    * Shows or hides the create component
    */
    showHideEdit(author_id: number): void {
        if (!this.showEdit || (this.showEdit && author_id != this.selectedAuthor.id)) {
            this.showView = false;
            this.showCreate = false;
            this.showEdit = true;
            this.author_id = author_id;
            this.selectedAuthor = new AuthorDetail();
            this.getAuthorDetail();
        }
        else {
            this.showEdit = false;
            this.showView = true;
        }
    }

    /**
    * Asks the service to update the list of authors
    */
    getAuthors(): void {
        this.authorService.getAuthors()
            .subscribe(authors => {
                this.authors = authors;
            });
    }

    getAuthorDetail(): void {
        this.authorService.getAuthorDetail(this.author_id)
            .subscribe(selectedAuthor => {
                this.selectedAuthor = selectedAuthor
            });
    }

    updateAuthor(): void {
        this.showEdit = false;
        this.showView = true;
    }

    /**
    * Deletes an author
    */
    deleteAuthor(authorId): void {
        this.modalDialogService.openDialog(this.viewRef, {
            title: 'Delete an author',
            childComponent: SimpleModalComponent,
            data: {text: 'Are you sure your want to delete this author from the BookStore?'},
            actionButtons: [
                {
                    text: 'Yes',
                    buttonClass: 'btn btn-danger',
                    onAction: () => {
                        this.authorService.deleteAuthor(authorId).subscribe(() => {
                            this.toastrService.error("The author was successfully deleted", "Author deleted");
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
    * This will initialize the component by retrieving the list of authors from the service
    * This method will be called when the component is created
    */
    ngOnInit() {
        this.showCreate = false;
        this.showView = false;
        this.showEdit = false;
        this.selectedAuthor = undefined;
        this.author_id = undefined;
        this.getAuthors();
    }
}