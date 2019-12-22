import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

import {DatePipe} from '@angular/common';
import {AuthorService} from '../author.service';
import {AuthorDetail} from '../author-detail';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-author-edit',
    templateUrl: './author-edit.component.html',
    styleUrls: ['./author-edit.component.css'],
    providers: [DatePipe]
})
export class AuthorEditComponent implements OnInit, OnChanges {

    /**
    * Constructor for the component
    * @param dp DatePipe to format the date.
    * @param authorService The authors' services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private dp: DatePipe,
        private authorService: AuthorService,
        private toastrService: ToastrService,
    ) {}

    /**
    * The author id as received from the parent component
    */
    @Input() author: AuthorDetail;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an author
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user updated a new author
    */
    @Output() update = new EventEmitter();

    /**
    * Updates the information of the author
    */
    editAuthor(): void {
        let dateB: Date = new Date(this.author.birthDate.year, this.author.birthDate.month - 1, this.author.birthDate.day);
        this.author.birthDate = this.dp.transform(dateB, 'yyyy-MM-dd');
        this.authorService.updateAuthor(this.author)
            .subscribe(() => {
                this.toastrService.success("The author's information was updated", "Author edition");
            });
        this.update.emit();
    }

    /**
    * Emits the signal to tell the parent component that the
    * user no longer wants to create an user
    */
    cancelEdition(): void {
        this.cancel.emit();
    }


    /**
    * This function will initialize the component
    */
    ngOnInit() {
        if (this.author && this.author.birthDate) {
            this.author.birthDate = this.author.birthDate.substring(0, 10);
            var date = {
                day: + this.author.birthDate.split('-')[2],
                month: + this.author.birthDate.split('-')[1],
                year: + this.author.birthDate.split('-')[0]
            };
            this.author.birthDate = date;
        }
    }

    /**
    * This function will be called when the user chooses another author to edit
    */
    ngOnChanges() {
        this.ngOnInit();
    }

}
