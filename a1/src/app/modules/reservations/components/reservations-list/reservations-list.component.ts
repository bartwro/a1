import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PagingDetails } from 'src/app/modules/shared/models/paging-details';
import { ReservationListFilter } from '../../models/reservation-list-filter';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {

  reservations: Reservation[];
  filteredReservations: Reservation[];

  pagingDetails: PagingDetails = new PagingDetails();

  displayedColumns: string[] = ['who', 'from', 'to'];
  selectedPageSize: number;
  filter: ReservationListFilter = {};
  currentPage: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService
      .getAll()
      .then(data => this.onInitLoad(data));
  }

  private onInitLoad(data: Reservation[]): void {
    this.reservations = data;
    this.filteredReservations = this.reservations;
    this.initPagingDetails();
  }

  private initPagingDetails() {
    this.pagingDetails.pageSizeOptions = [1, 3, 5];
    this.pagingDetails.selectedPageSize = 1;
    this.pagingDetails.currentPage = 1;
    this.pagingDetails.length = this.reservations.length;
    this.refreshPagingDtls();
  }

  pageSizeChange(selectedPageSize: number) {
    this.pagingDetails.selectedPageSize = +selectedPageSize;
    this.refreshPagingDtls();
  }

  refreshPagingDtls(): void {
    if (this.filteredReservations && this.pagingDetails) {

      this.pagingDetails.numberOfPages = Math.ceil(
        this.filteredReservations.length /
        this.pagingDetails.selectedPageSize);

      if (this.pagingDetails.currentPage > this.pagingDetails.numberOfPages) {
        this.pagingDetails.currentPage = this.pagingDetails.numberOfPages;
      }

      this.refreshCurrentPage();
    }
  }

  private refreshCurrentPage() {
    const startIndex = this.pagingDetails.currentPage === 1 ? 0 :
    this.pagingDetails.selectedPageSize *
    (this.pagingDetails.currentPage - 1 );

    const lastIndex = startIndex + this.pagingDetails.selectedPageSize;
    this.currentPage = this.filteredReservations.slice(startIndex, lastIndex);
  }

  goToNextPage(): void {
    // move page right...
    this.pagingDetails.currentPage++;
    this.refreshCurrentPage();
  }

  goToPreviousPage(): void {
    this.pagingDetails.currentPage--;
    this.refreshCurrentPage();
  }

  onFilterByRoom(filterValue: string): void {
    this.filter.room = filterValue;
    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  onFilterByWho(filterValue: string): void {
    this.filter.who = filterValue;
    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  refreshFilteredReservations(): void {
    this.filteredReservations = this.reservations
      .filter(x => (!this.filter.from || x.from >= this.filter.from)
        && (!this.filter.room || x.roomName.includes(this.filter.room))
        && (!this.filter.who || x.who.includes(this.filter.who)) );
  }
}
