import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { Review } from '../review';
import { BookService } from '../book.service';
import { Book } from '../../book/book';
@Component({
    selector: 'app-book-add-review',
    templateUrl: './book-add-review.component.html',
    styleUrls: ['./book-add-review.component.css']
})
export class BookAddReviewComponent implements OnInit, OnChanges {

    /**
    * The constructor of the component
    * @param bookService The book service which communicates with the API
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private bookService: BookService,
        private toastrService: ToastrService
    ) { }

    /**
    * The book's id
    */
    @Input() book: Book;

    /**
    * The review to post
    */
    review: Review;
    
    public isCollapsed = true;

    /**
    * The Event Emitter which sends the signal when a review has just been posted
    * so that the list of reviews refreshes
    */
    @Output() updateReviews = new EventEmitter();

    /**
    * This function posts a review
    * @param reviewForm The form of the review
    */
    postReview(reviewForm: NgForm): Review {
        this.review.book = this.book;
        this.bookService.createReview(this.book.id,this.review)
            .subscribe(() => {
                reviewForm.resetForm();
                this.updateReviews.emit();
                this.toastrService.success("The review was successfully created", 'Review added');
            }, err => {
                this.toastrService.error(err, 'Error');
            });
        return this.review;
    }

    /**
    * The function which initializes the component.
    */
    ngOnInit() {
        this.review = new Review();
    }

    /**
    * The function which notices that the input which defines the book_id has changed.
    * If the book has changed, we update the reviews to show
    */
    ngOnChanges() {
        this.ngOnInit();
    }

}
