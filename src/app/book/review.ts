import {Book} from "./book";
export class Review {
    /**
    * The review's id
    */
    id: number;

    /**
     * The review's name
     */
    name: string;

    /**
     * The review's source
     */
    source: string;

    /**
    * A brief summary of the review
    */
    description: string;

    /**
    * The book of the review
    */
    book: Book;
}
