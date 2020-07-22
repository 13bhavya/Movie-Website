import { MovieItem } from './movieItem.model';

export interface Movies {
    page: number;
    total_results: number;
    total_pages: number;
    results: MovieItem[]

}

export interface Shows {
    
}