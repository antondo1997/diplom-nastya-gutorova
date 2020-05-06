import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.databaseURL}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response)
            .map((key) => ({
              ...response[key],
              id: key
            }));
        })
      );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.databaseURL}/posts/${id}.json`)
      .pipe(
        map((post) => {
          return {...post, id};
        })
      );
  }

  addPost(post: Post) {
    return this.http.post(`${environment.databaseURL}/posts.json`, post);
  }


  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.databaseURL}/posts/${id}.json`, post);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.databaseURL}/posts/${id}.json`);
  }
}
