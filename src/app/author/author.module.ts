import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgxPermissionsModule} from 'ngx-permissions';

import {AuthorService} from './author.service';
import {AuthorListComponent} from './author-list/author-list.component';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {AuthorDetailComponent} from './author-detail/author-detail.component';
import {AuthorCreateComponent} from './author-create/author-create.component';
import {AuthorEditComponent} from './author-edit/author-edit.component';
import {BookModule} from '../book/book.module';



@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        NgxPermissionsModule,
        FormsModule,
        BookModule,
        NgbModule
    ],
    declarations: [
        AuthorListComponent, AuthorDetailComponent, AuthorCreateComponent, AuthorEditComponent
    ],
    providers: [AuthorService]
})
export class AuthorModule {}
