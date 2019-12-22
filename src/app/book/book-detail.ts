import { Author } from '../author/author';
import { Book } from './book';
import { Review } from './review';

/**
* This class represents a book of the BookStore. 
* It contains all the information relevant to the book.
*/
export class BookDetail extends Book {
   
    authors: Author[];
    
    reviews: Review[];
}
