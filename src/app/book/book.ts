import { Editorial } from '../editorial/editorial';

export class Book {
    /**
    * The book's id
    */
    id: number;

    /**
    * The book's name
    */
    name: string;

    /**
    * The book's ISBN
    */
    isbn: string;

    /**
    * A brief summary of the book
    */
    description: string;

    /**
    * The location of the book's image
    */
    image: string;

    /**
     * The book's publishing date
     */
    publishingdate: any;
    

    /**
    * The editorial of the book
    */
    editorial: Editorial;
}
