import {UpdateModel} from './update-model.interface';

export interface PostListI {
  idpost: string;
  iduser: string;
  linktitle: string;
  titlepost: string;
  est: boolean;
  linktitlecategory: boolean;
  idcategoria: string;
  updateModel: UpdateModel;
}
