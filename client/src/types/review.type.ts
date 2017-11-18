export class Review {
    id: number;
    user_id: number;
    book_id: number;
    book_title: string;
    first_name: string;
    last_name: string;
    review: string;
    rating: number;
    posted?: number;
}