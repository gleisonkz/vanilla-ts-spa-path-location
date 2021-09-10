import { AbstractPage } from '../classes/abstract-page';

export interface Route {
  path: string;
  page: AbstractPage;
}
