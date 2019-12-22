import { Book } from "../book/book";

import { Author } from "./author";

export class AuthorDetail extends Author {
    
    /** Los libros del author **/
    books : Book[];
}


