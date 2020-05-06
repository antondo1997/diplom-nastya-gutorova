import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PostComponent} from '../post/post.component';
import {PostService} from '../shared/post.service';
import {Post} from '../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;
  bsModalRefSub: Subscription;
  postList: Post[];
  postsSub: Subscription;
  isLoading: boolean;

  constructor(
    private modalService: BsModalService,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsSub = this.postService.getAll()
      .subscribe((posts) => {
        console.log(posts);
        this.postList = posts.reverse();
        this.isLoading = false;
      }, error => {
        console.log(error);
      });

  }

  openModal(initialState: any) {
    this.bsModalRef = this.modalService.show(PostComponent, Object.assign({initialState}, {class: 'modal-xl'}, {ignoreBackdropClick: true}));
    this.bsModalRefSub = this.bsModalRef.content.resData$.subscribe((resPost) => {
      // console.log('Response form modal', resPost);
      const idx = this.postList.indexOf(this.postList.filter((post) => post.id === resPost.id)[0]);
      // console.log('idx:', idx);
      if (idx !== -1) {
        this.postList[idx] = resPost;
      } else {
        this.postList.unshift(resPost);
      }
    });
  }

  addPost() {
    const initialState = {
      mode: 'create',
      post: {},
      title: 'Добавить новую запись'
    };
    this.openModal(initialState);
  }

  editPost(id: string, idx: number) {
    console.log(id);
    const initialState = {
      mode: 'edit',
      post: this.postList[idx],
      title: 'Редактировать запись'
    };
    this.openModal(initialState);
  }

  deletePost(id: string, idx: number) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.postList.splice(idx, 1);
      });
  }


  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
    if (this.bsModalRefSub) {
      this.bsModalRefSub.unsubscribe();
    }
  }

}
