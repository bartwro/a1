import { Room } from '../../reservations/models/room';

export interface NewRoomData {
    isNew: boolean,
    roomData: Room;
}
