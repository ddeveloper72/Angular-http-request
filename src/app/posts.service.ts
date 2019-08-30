import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    crateAndStorePost(title: string, content: string) {
        // ...
        const postData: Post = {title, content};
        this.http
          .post<{ name: string }>(
            'https://angular-http-requests-cb030.firebaseio.com/posts.json',
            postData
          )
          .subscribe(responseData => {
            console.log(responseData);
          });
    }

    fetchPosts() {
        // ...
        return this.http
          .get<{ [key: string]: Post }>('https://angular-http-requests-cb030.firebaseio.com/posts.json')
          .pipe(map(responseData => {
              const postsArray: Post[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key });
                }
              }
              return postsArray;
            })
          );
    }

    deletePosts() {
       return this.http.delete('https://angular-http-requests-cb030.firebaseio.com/posts.json');
    }
}
