import { Component, OnInit, Input, } from '@angular/core';
import { Review } from '../review';

@Component({
    selector: 'app-book-reviews',
    templateUrl: './book-review.component.html',
})
export class BookReviewComponent implements OnInit {
    @Input() bookReviews : Review [];
    
    public isCollapsed = false;
    
    /**
     * The function called when a review is posted to update the reviews
     */
    updateReviews(reviews:Review[]): void {
        this.bookReviews = reviews;
    }
    
    ngOnInit(){
    }
}



