/**
 * This store keeps the rooms of current user
 *
 * with:
 * - definition (Name)
 * - the store itself (useName)
 *
 */

import { defineStore } from 'pinia'
import { Room as MatrixRoom, MatrixClient } from 'matrix-js-sdk';


/**
 *  Extending the MatrixRoom with some extra properties and there methods:
 *
 *      hidden : boolean        - keep track of 'removed' rooms that are not synced yet.
 *      unreadMessages : number - keep track of new messages in a room that are not read by the user.
 */


interface PubHubsRoomProperties {
    hidden: boolean;
    unreadMessages: number;
}


class Room extends MatrixRoom {

    _ph : PubHubsRoomProperties;

    constructor( public readonly roomId: string,  public readonly client: MatrixClient, public readonly myUserId: string ) {
        super(roomId,client,myUserId);
        this._ph = {
            hidden : false,
            unreadMessages : 0,
        }
    }

    set hidden(hidden:boolean) {
        this._ph.hidden = hidden;
    }

    get hidden():boolean {
        // Temporay hide waiting rooms. Not necessary in our own client.
        if ( this.name.indexOf('Persoonlijke wachtkamer voor:')==0 ) {
            return true;
        }
        return this._ph.hidden;
    }

    set unreadMessages(unread:number) {
        this._ph.unreadMessages = unread;
    }

    get unreadMessages() : number {
        return this._ph.unreadMessages;
    }

    resetUnreadMessages() {
        this.unreadMessages = 0;
    }

    addUnreadMessages( add:number = 1 ) {
        this.unreadMessages += add;
    }

}



const useRooms = defineStore('rooms', {

    state: () => {
        return {
            currentRoomId : '' as string,
            rooms : {} as { [index: string]: Room },
        }
    },

    getters: {

        roomsArray(state) :Array<Room> {
            const values = Object.values(state.rooms);
            const rooms = values.filter( item => typeof(item?.roomId) !== "undefined" );
            return rooms;
        },

        sortedRoomsArray() :Array<Room> {
            const rooms:Array<Room> = Object.assign([],this.roomsArray);
            rooms.sort( (a,b) => (a.name > b.name ? 1:-1) );
            return rooms;
        },

        hasRooms() {
            return this.roomsArray?.length > 0;
        },

        roomExists: (state) => {
            return (roomId:string) => {
                return typeof(state.rooms[roomId])=="undefined"?false:true
            }
        },

        currentRoom(state) : Room {
            return state.rooms[state.currentRoomId];
        },

        currentRoomExists(state):boolean {
            return this.roomExists(state.currentRoomId);
        },

        totalUnreadMessages() {
            let total = 0;
            for (const idx in this.roomsArray) {
                const room = this.roomsArray[idx];
                if ( ! room.hidden ) {
                    total += room.unreadMessages;
                }
            }
            return total;
        },

    },

    actions: {

        changeRoom( roomId:string ) {
            this.currentRoomId = roomId;
            if ( roomId!='' && this.rooms[roomId]) {
                this.rooms[roomId].resetUnreadMessages();
            }
        },

        updateRoomsWithMatrixRooms(rooms:MatrixRoom[]) {
            this.rooms = {} as { [index: string]: Room }; // reset rooms
            for (const idx in rooms) {
                if (Object.hasOwnProperty.call(rooms, idx) && rooms[idx].getMyMembership() == 'join') {
                    this.addMatrixRoom(rooms[idx]);
                }
            }
        },

        addMatrixRoom( matrixRoom:MatrixRoom ) {
            const room = Object.assign(new Room(matrixRoom.roomId,matrixRoom.client,matrixRoom.myUserId),matrixRoom);
            this.addRoom(room);
        },

        addRoom( room:Room ) {
            // maybe rooms exists allready and is written over, then prepare the PubHubs specific room properties
            if ( this.roomExists(room.roomId) ) {
                room.hidden = this.rooms[room.roomId].hidden;
                room.unreadMessages = this.rooms[room.roomId].unreadMessages;
            }
            this.rooms[room.roomId] = Object.assign(new Room(room.roomId,room.client,room.myUserId),room);
        },


    },

})

export { Room, useRooms }
