export interface Reservation {
    id: number;
    roomName: string;
    from: Date;
    to: Date;
    who: string;
    description: string;
}
