import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AuthorService} from '../author.service';
import {Author} from '../author';

@Component({
    selector: 'app-author-create',
    templateUrl: './author-create.component.html',
    styleUrls: ['./author-create.component.css'],
    providers: [DatePipe]
})
export class AuthorCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param dp DatePipe to format the date.
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private dp: DatePipe,
        private authorService: AuthorService,
        private toastrService: ToastrService
    ) {}

    /**
    * The new author
    */
    author: Author;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an author
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user created a new author
    */
    @Output() create = new EventEmitter();

    /**
    * Creates an author
    */
    createAuthor(): Author {

        let dateB: Date = new Date(this.author.birthDate.year, this.author.birthDate.month - 1, this.author.birthDate.day);

        this.author.birthDate = this.dp.transform(dateB, 'yyyy-MM-dd');
        console.log(this.author);
        this.authorService.createAuthor(this.author)
            .subscribe((author) => {
                this.author = author;
                this.create.emit();
                this.toastrService.success("The author was created", "Author creation");

            });
        return this.author;
    }

    /**
    * Emits the signal to tell the parent component that the
    * user no longer wants to create an user
    */
    cancelCreation(): void {
        this.cancel.emit();
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.author = new Author();
    }

}
