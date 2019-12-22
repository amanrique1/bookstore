import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { AuthorDetail } from '../author-detail';

@Component({
    selector: 'app-author-detail',
    templateUrl: './author-detail.component.html',
    styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

    /**
    * The author
    */
    @Input() authorDetail: AuthorDetail;
    /**
    * Constructor for the component
    * @param route The route which helps to retrieves the id of the book to be shown
    * @param authorService The author's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private route: ActivatedRoute,
        private authorService: AuthorService 
    ) { }

    
    

    /**
    * El id del author que viene en el path get .../authors/author_id
    */
    author_id: number;
    /**
    * The method which obtains the author whose details we want to show
    */
    getAuthorDetail(): void {
        this.authorService.getAuthorDetail(this.author_id)
            .subscribe(authorDetail => {
                this.authorDetail = authorDetail
            });
    }

   
    /**
    * The method which initializes the component.
    * We need to create the author so it is never considered as undefined
    */
    ngOnInit() {
        this.author_id = +this.route.snapshot.paramMap.get('id');
        if (this.author_id){
        this.authorDetail = new AuthorDetail();
        this.getAuthorDetail();
        }
    }
}
