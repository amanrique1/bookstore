import { Editorial } from './editorial';
import { Book } from '../book/book';
/**
* This class represents an editorialDetail of the BookStore. 
* It contains all the information relevant to the editorial.
*/
export class EditorialDetail extends Editorial {


    /**
     * The editorial's books
     */
    books: Book[];
}