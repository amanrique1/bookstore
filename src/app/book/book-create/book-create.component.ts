import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

import {BookService} from '../book.service';
import {EditorialService} from '../../editorial/editorial.service';
import {Book} from '../book';
import {Author} from '../../author/author';
import {Editorial} from '../../editorial/editorial';

@Component({
    selector: 'app-book-create',
    templateUrl: './book-create.component.html',
    styleUrls: ['./book-create.component.css'],
    providers: [DatePipe]
})
export class BookCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param bookService The books' services provider
    * @param authorService The authors' services provider
    * @param editorialService The editorials' services provider
    * @param toastrService The toastr to show messages to the user
    * @param router The router
    */
    constructor(
        private dp: DatePipe,
        private bookService: BookService,
        private editorialService: EditorialService,
        private toastrService: ToastrService,
        private router: Router
    ) {}

    /**
    * The new book
    */
    book: Book;

    /**
    * The list of all the authors in the BookStore
    */
    authors: Author[];

    /**
    * The list of all the editorials in the BookStore
    */
    editorials: Editorial[];

    /**
    * The authors of the new book
    * This list is passed as a parameter to the child two-list component
    * It is also updated by that child component
    */
    bookAuthors: Author[];

    /**
    * Retrieves the list of editorials in the BookStore
    */
    getEditorials(): void {
        this.editorialService.getEditorials()
            .subscribe(editorials => {
                this.editorials = editorials;
            }, err => {
                this.toastrService.error(err, 'Error');
            });
    }

    /**
    * Cancels the creation of the new book
    * Redirects to the books' list page
    */
    cancelCreation(): void {
        this.toastrService.warning('The book wasn\'t created', 'Book creation');
        this.router.navigate(['/books/list']);
    }

    /**
    * Creates a new book
    */
    createBook(): Book {
        let dateB: Date = new Date(this.book.publishingdate.year, this.book.publishingdate.month - 1, this.book.publishingdate.day);
        this.book.publishingdate = this.dp.transform(dateB, 'yyyy-MM-dd');
        this.bookService.createBook(this.book)
            .subscribe(book => {
                this.book.id = book.id;
                this.router.navigate(['/books/' + book.id]);
            }, err => {
                this.toastrService.error(err, 'Error');
            });
        return this.book;
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.book = new Book();
        this.book.editorial = new Editorial();
        this.getEditorials();
    }

}
