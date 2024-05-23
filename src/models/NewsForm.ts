export interface NewsForm {
    news: NewsFormInternal[];
}

export interface NewsFormInternal {
    id: number;
    title: string;
    content: string;
    createdAt?: Date;
}
