import {CategoryI} from './category-i.interface';
import {PostListI} from './post-list-i.interface';

export interface CategoryListI {
  categoriesDomain: CategoryI;
  postDomain: PostListI;
  quantity: number;
}
