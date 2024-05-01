import { TBaseEvent } from './TBaseEvent';

export interface TStateEvent extends TBaseEvent {
	type: 'm.room.create' | 'm.room.name' | 'org.matrix.msc3401.call';
}
