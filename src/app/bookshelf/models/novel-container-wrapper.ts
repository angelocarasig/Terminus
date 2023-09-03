import { UserNovel } from '../../shared/models/vn/user-novel';

export interface NovelContainerWrapper {
  novels: Array<UserNovel>;
  paginateNumber: number;
}
