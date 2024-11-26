import { Component } from '@angular/core';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchService.updateSearchTerm(searchTerm);
  }
}
