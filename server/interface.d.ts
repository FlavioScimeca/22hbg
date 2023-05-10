//! Ho impostato la struttura del dato cosi da sfruttare al meglio TS (ed avere i suggerimenti eheheh)

import { Request } from 'express';

export interface Post {
  author: number;
  categories: Array<number>;
  comment_status: string;
  content: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  featured_media: number;
  format: string;
  guid: { rendered: string };
  id: number;
  link: string;
  meta: { inline_featured_image: boolean };
  modified: string;
  modified_gtm: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: Array<number>;
  template: string;
  title: { rendered: string };
  type: string;
  yoast_head: string;
  yoast_head_json: { title: string };
  _links: object;
}

export interface CustomReq extends Request {
  query: {
    title: string;
    items: string;
  };
}
