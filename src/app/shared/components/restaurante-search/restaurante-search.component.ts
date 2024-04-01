import { Restaurante } from './../../../core/models/restaurante.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { RestauranteService } from 'src/app/core/services/restaurante.service';

@Component({
  selector: 'app-restaurante-search',
  templateUrl: './restaurante-search.component.html',
  styleUrls: ['./restaurante-search.component.scss']
})
export class RestauranteSearchComponent implements OnInit {
  restaurantes$!: Observable<Restaurante[]>;
  @Input() label = '';

  private searchTerm = new Subject<string>();

  @Output() private selected = new EventEmitter<Restaurante>();

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.restaurantes$ = this.searchTerm.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.restauranteService.search(term))
    )
  }

  onSelected(selectedItem: MatAutocompleteSelectedEvent): void{
    this.searchTerm.next(''); // limpa a pesquisa

    const restaurante: Restaurante = selectedItem.option.value;
    this.selected.emit(restaurante);
  }

  search(term: string): void{
    this.searchTerm.next(term)
  }

}
