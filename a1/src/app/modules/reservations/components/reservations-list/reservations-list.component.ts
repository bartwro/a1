import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { ReservationListViewModel } from '../../models/reservation-list-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppSettingsService } from 'src/app/modules/shared/services/app-settings.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {

  viewModel = new ReservationListViewModel();
  reservationListForm: FormGroup;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private appSettingsService: AppSettingsService,
    private httpClient: HttpClient) {
    }

  ngOnInit() {
    this.reservationService
      .getAll()
      .then(data => this.onInitLoad(data));

    // this.viewModel.sortByRoomIcon = this.viewModel.sortDownInactiveIcon;
    this.viewModel.sortByIcon.room = this.viewModel.sortDownInactiveIcon;
    this.viewModel.pagingDetails.pageSizeOptions = [5, 10, 15];
    const pageSize = this.appSettingsService.get("reservationsPageSize");
    this.viewModel.pagingDetails.selectedPageSize = pageSize>0 ? pageSize : 10;
    this.reservationListForm = this.fb.group({});
  }

  private onInitLoad(data: Reservation[]): void {
    let t = this.httpClient.get("http://localhost:5000/api/values/1");
    t.subscribe(x => console.log(x.toString()));
    //console.log(t);
    this.viewModel.reservations = data;
    this.viewModel.filteredReservations = this.viewModel.reservations;
    this.initPagingDetails();
  }

  private initPagingDetails() {
    this.viewModel.pagingDetails.currentPage = 1;
    this.viewModel.pagingDetails.length = this.viewModel.reservations.length;
    this.refreshPagingDtls();
  }

  pageSizeChange(selectedPageSize: number) {
    this.appSettingsService.set("reservationsPageSize", selectedPageSize);
    this.viewModel.pagingDetails.selectedPageSize = +selectedPageSize;
    this.refreshPagingDtls();
  }

  refreshPagingDtls(): void {
    if (this.viewModel.filteredReservations && this.viewModel.pagingDetails) {

      this.viewModel.pagingDetails.numberOfPages = Math.ceil(
        this.viewModel.filteredReservations.length /
        this.viewModel.pagingDetails.selectedPageSize);
      if ( this.viewModel.pagingDetails.numberOfPages === 0 ) {
        this.viewModel.pagingDetails.numberOfPages = 1;
      }

      if (this.viewModel.pagingDetails.currentPage > this.viewModel.pagingDetails.numberOfPages) {
        this.viewModel.pagingDetails.currentPage = this.viewModel.pagingDetails.numberOfPages;
      }

      this.refreshCurrentPage();
    }
  }

  private refreshCurrentPage() {
    const startIndex = this.viewModel.pagingDetails.currentPage === 1 ? 0 :
    this.viewModel.pagingDetails.selectedPageSize *
    (this.viewModel.pagingDetails.currentPage - 1 );

    const lastIndex = startIndex + this.viewModel.pagingDetails.selectedPageSize;
    this.viewModel.currentPage = this.viewModel.filteredReservations.slice(startIndex, lastIndex);
  }

  goToNextPage(): void {

    if (this.viewModel.isNavigateRightActive()) {
      // move page right...
      this.viewModel.pagingDetails.currentPage++;
      this.refreshCurrentPage();
    }
  }

  goToPreviousPage(): void {
    if (this.viewModel.isNavigateLeftActive()) {
      this.viewModel.pagingDetails.currentPage--;
      this.refreshCurrentPage();
    }
  }

  onFilterByRoom(filterValue: string): void {
    this.viewModel.filter.room = filterValue;
    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  onFilterByWho(filterValue: string): void {
    this.viewModel.filter.who = filterValue;
    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  onFilterByFrom(filterValue: string): void {

    if (filterValue) {
      const dateParts = filterValue.split('-').map(x => +x); // yyyy-mm-dd
      this.viewModel.filter.from = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    } else {
      this.viewModel.filter.from = null;
    }

    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  onFilterByFromTest(filterValue: string, field: string): void {

    if (filterValue) {
      const dateParts = filterValue.split('-').map(x => +x); // yyyy-mm-dd
      this.viewModel.filter[field] = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    } else {
      this.viewModel.filter.from = null;
    }

    this.refreshFilteredReservations();
    this.refreshPagingDtls();
  }

  refreshFilteredReservations(): void {

    this.viewModel.filteredReservations = this.viewModel.reservations
      .filter(x =>
           (!this.viewModel.filter.from || x.from >= this.viewModel.filter.from)
        && (!this.viewModel.filter.from || x.to <= this.viewModel.filter.to)
        && (!this.viewModel.filter.room || x.roomName.includes(this.viewModel.filter.room))
        && (!this.viewModel.filter.who || x.who.includes(this.viewModel.filter.who)) );
  }

  onClickSvg(): void {
    console.log('svg clicked');
  }

  onMouseOver(field: string): void {

    if (!this.viewModel.sortByStatus[field]) {
      this.viewModel.sortByIcon[field] = this.viewModel.sortDownActiveIcon;
    }
  }

  onMouseOut(field: string): void {
    if (!this.viewModel.sortByStatus[field]) {
      this.viewModel.sortByIcon[field] = this.viewModel.sortDownInactiveIcon;
    }
  }

  onSortClick(field: string): void {
    // () (\/) (/\) ().. repeat
    this.viewModel.setFilterBy(field);
    if (this.viewModel.sortByStatus[field] === 0) {
      this.viewModel.sortByStatus[field] = 1;
    } else if ( this.viewModel.sortByStatus[field] === 1 ) {
      this.viewModel.sortByStatus[field] = 2;
    } else {
      this.viewModel.sortByStatus[field] = 0;
    }

    this.viewModel.refreshSortIcon();

    if (this.viewModel.sortByStatus[field] === 0) {
      this.viewModel.filteredReservations = this.viewModel.filteredReservations.sort( (r1, r2) => r1.id > r2.id ? 1 : -1 );
    } else if (this.viewModel.sortByStatus[field] === 1) {
      this.viewModel.filteredReservations = this.viewModel.filteredReservations.sort( (r1, r2) => r1[field] > r2[field] ? 1 : -1 );
    } else {
      this.viewModel.filteredReservations = this.viewModel.filteredReservations.sort( (r1, r2) => r1[field] > r2[field] ? -1 : 1 );
    }

    this.refreshCurrentPage();
  }

  filterToggle() {
    this.viewModel.filteringOn = !this.viewModel.filteringOn;
  }
}
