import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Post, states} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../shared/post.service';
import {pipe, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  form: FormGroup;
  mode: string;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  post: Post;
  states = states;
  submitted = false;
  public resData$: Subject<Post> = new Subject<Post>();


  constructor(
    public bsModalRef: BsModalRef,
    private postService: PostService
  ) {
  }

  ngOnInit() {
    let date = new Date(this.post.deadline);
    if (this.mode === 'create') {
      date = null;
      this.post.state = '';
    }
    this.form = new FormGroup({
      link: new FormControl(this.post.link, [Validators.required]),
      state: new FormControl(this.post.state, [Validators.required]),
      deadline: new FormControl(date, [Validators.required]),
      comment: new FormControl(this.post.comment, [])
    });
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const post: Post = {
      link: this.form.value.link,
      state: this.form.value.state,
      deadline: this.form.value.deadline,
      comment: this.form.value.comment,
    };
    if (this.mode === 'create') {
      this.postService.addPost(post)
        .pipe(
          switchMap((response: { name: string }) => {
            return this.postService.getById(response.name);
          })
        )
        .subscribe((res) => {
          // console.log(res);
          console.log('Created');
          // this.submitted = false;
          this.resData$.next(res);
          this.bsModalRef.hide();
        });
    } else {
      this.postService.updatePost(this.post.id, post)
        .subscribe((res) => {
          // console.log('Res', res);
          console.log('edited');
          // this.submitted = false;
          this.resData$.next({...res, id: this.post.id});
          this.bsModalRef.hide();
        });
    }
  }
}
