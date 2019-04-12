import { Reservation } from './reservation';
import { PagingDetails } from '../../shared/models/paging-details';
import { ReservationListFilter } from './reservation-list-filter';

export class ReservationListViewModel {

    reservations: Reservation[];
    filteredReservations: Reservation[];
    pagingDetails: PagingDetails = new PagingDetails();
    displayedColumns: string[];
    selectedPageSize: number;
    filter: ReservationListFilter;
    currentPage: Reservation[];
    sortDownActiveIcon: string;
    sortDownInactiveIcon: string;
    sortByRoomIcon: string;
    sortUpActiveIcon: string;
    sortByStatus: { [key: string]: number } = {};
    sortByIcon: any = {};
    fields = ['room', 'who', 'from', 'to'];
    filterListPath = '../../../../../assets/icons/filter_list.svg';
    filteringOn = false;
    arrowRightInactivePath = '../../../../../assets/icons/navigate_next_inactive.svg';
    arrowRightActivePath = '../../../../../assets/icons/navigate_next.svg';
    arrowLeftInactivePath = '../../../../../assets/icons/navigate_before_inactive.svg';
    arrowLeftActivePath = '../../../../../assets/icons/navigate_before.svg';
    addIconPath = '../../../../../assets/icons/add_icon.svg';

    get arrowRightPath(): string {
      return this.isNavigateRightActive() ?
        this.arrowRightActivePath :
        this.arrowRightInactivePath;
    }

    isNavigateRightActive() {
      return this.pagingDetails.currentPage < this.pagingDetails.numberOfPages;
    }

    isNavigateLeftActive() {
      return this.pagingDetails.currentPage > 1;
    }

    get arrowLeftPath(): string {
      return this.isNavigateLeftActive() ?
        this.arrowLeftActivePath :
        this.arrowLeftInactivePath;
    }

    constructor() {
        this.displayedColumns = ['who', 'from', 'to'];
        this.filter = { who: null, room: null, from: null, to: null };
        this.sortDownActiveIcon = '../../../../../assets/icons/arrow_down_active.svg';
        this.sortDownInactiveIcon = '../../../../../assets/icons/arrow_down_inactive.svg';
        this.sortUpActiveIcon = '../../../../../assets/icons/arrow_up_active.svg';
        this.sortByStatus.room = 0;
        this.sortByStatus.who = 0;
        this.sortByStatus.from = 0;
        this.sortByStatus.to = 0;
        this.sortByIcon.room = this.sortDownInactiveIcon;
        this.sortByIcon.who = this.sortDownInactiveIcon;
        this.sortByIcon.from = this.sortDownInactiveIcon;
        this.sortByIcon.to = this.sortDownInactiveIcon;
    }

    setFilterBy(field: string): void {
        this.fields.forEach(x => {
            if ( x !== field ) {
                this.sortByStatus[x] = 0;
            }
        });
    }

    refreshSortIcon(): void {
        this.fields.forEach(field => {
          if (this.sortByStatus[field] === 0) {
            this.sortByIcon[field] = this.sortDownInactiveIcon;
          } else if ( this.sortByStatus[field] === 1 ) {
            this.sortByIcon[field] = this.sortDownActiveIcon;
          } else {
            this.sortByIcon[field] = this.sortUpActiveIcon;
          }
        });
    }
}
