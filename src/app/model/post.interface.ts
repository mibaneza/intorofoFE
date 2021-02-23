import {UpdateModel} from './update-model.interface';

export interface PostI {
  id: string;
  linktitle: string;
  title: string;
  content: string;
  updateModel: UpdateModel;
  est: boolean;
  idpost: string;
  linktitlecategory: string;
  quantitycommets: number;

}
