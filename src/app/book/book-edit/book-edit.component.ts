import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {BookService} from '../book.service';
import {AuthorService} from '../../author/author.service';
import {EditorialService} from '../../editorial/editorial.service';

import {BookDetail} from '../book-detail';
import {Author} from '../../author/author';
import {Editorial} from '../../editorial/editorial';

@Component({
    selector: 'app-book-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.css'],
    providers: [DatePipe]
})
export class BookEditComponent implements OnInit {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
    * @param authorService The author service which communicates with the API
    * @param editorialService The editorial service which communicates with the API
    * @param toastrService The toastr to show messages to the user
    * @param router The router which is needed to know when the component needs to reload
    * @param route The route which helps to retrieves the id of the book to be shown
    */
    constructor(
        private dp: DatePipe,
        private bookService: BookService,
        private authorService: AuthorService,
        private editorialService: EditorialService,
        private toastrService: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    model: any;
    /**
    * The book which will be updated
    */
    book: BookDetail

    book_id: number;
    /**
    * The list of every author in the BookStore
    */
    authors: Author[];

    /**
    * The list of every editorial in the BookStore
    */
    editorials: Editorial[];

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.authors
                : this.authors.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatter = (x: {name: string}) => x.name;

    /**
    * Retrieves the information of the book which will be updated
    */
    getBook(): void {
        this.bookService.getBookDetail(this.book_id).subscribe(book => {
            book.publishingdate = book.publishingdate.substring(0, 10);
            var date = {
                day: +book.publishingdate.split('-')[2],
                month: +book.publishingdate.split('-')[1],
                year: +book.publishingdate.split('-')[0]
            };
            this.book = book;
            this.book.publishingdate = date;
        });
    }

    /**
     * Retrieves the information of all the editorials in the aplication.
     */
    getEditorials(): void {
        this.editorialService.getEditorials()
            .subscribe(editorials => {
                this.editorials = editorials;

            });
    }

    /**
     * Retrives the information of all the authores in the aplication.
     */
    getAuthors(): void {
        this.authorService.getAuthors().subscribe(authors => {
            this.authors = authors;
            for (let item of this.book.authors) {
                for (let i = 0; i < this.authors.length; i++) {
                    if (this.authors[i].id === item.id) {
                        this.authors.splice(i, 1);
                    }
                }
            };
        });
    }

    /**
    * Cancels the edition of the book
    */
    cancelEdition(): void {
        this.toastrService.warning('The book wasn\'t edited', 'Book edition');
        this.router.navigate(['/books/list']);
    }

    addAuthor(): void {
        if (this.model != undefined && this.model.id != undefined) {
            this.book.authors.push(this.model);
            for (let i = 0; i < this.authors.length; i++) {
                if (this.authors[i].id === this.model.id) {
                    this.authors.splice(i, 1);
                }
            }
            this.model = new Author();
        }

    }

    removeAuthor(author): void {
        this.authors.push(author);
        for (let i = 0; i < this.book.authors.length; i++) {
            if (this.book.authors[i].id == author.id) {
                this.book.authors.splice(i, 1);
            }
        }
    }

    /**
    * This function updates the book
    */
    updateBook(): void {
        let dateB: Date = new Date(this.book.publishingdate.year, this.book.publishingdate.month - 1, this.book.publishingdate.day);
        this.book.publishingdate = this.dp.transform(dateB, 'yyyy-MM-dd');
        this.bookService.updateBook(this.book)
            .subscribe(() => {
                this.router.navigate(['/books/' + this.book.id]);
                this.toastrService.success("The book was successfully edited", 'Book edition');
            });
    }

    /**
    * The function which initilizes the component
    */
    ngOnInit() {
        this.book_id = +this.route.snapshot.paramMap.get('id');
        this.getBook();
        this.getEditorials();
        this.getAuthors();
        this.model = new Author();
    }


}
