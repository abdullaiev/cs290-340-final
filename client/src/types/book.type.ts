import {Author} from "./author.type";
import {AuthorChanges} from "./author-changes.type";

export class Book {
    id: number;
    title: string;
    category_id: number;
    category_name: string;
    year: number;
    author_id: number;
    first_name: string;
    last_name: string;
    authors: Author[];
    plot: string;
    rate?: number;
    author_changes?: AuthorChanges;
}