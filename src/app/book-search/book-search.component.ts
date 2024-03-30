// book-search.component.ts

import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../google-service/google-books.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];

  constructor(private googleBooksService: GoogleBooksService) {}

  //run 20 books on start
  ngOnInit(): void {
    this.getRandomBooks();
  }

  //get 20 random books for the oninit
  getRandomBooks(): void {
    //im lazy dont judge me
    const randomQuery = 'random'; // Example random query
    this.googleBooksService.searchBooks(randomQuery, 20).subscribe(
      (data: any) => {
        this.results = data.items;
      },
      (error) => {
        console.error('Error fetching random books:', error);
      }
    );
  }

  //search query params
  search(): void {
    if (this.query.trim() !== '') {
      this.googleBooksService.searchBooks(this.query).subscribe(
        (data: any) => {
          this.results = data.items;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  }

  //trim the text for a shorter descrition 
  truncateDescription(description: string): string {
    const maxLength = 150;
    if (description && description.length > maxLength) { // Added a check for description existence
      return description.substring(0, maxLength) + '...';
    } else {
      return description;
    }
  }
}
