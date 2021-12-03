import moment from 'moment';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';

import { Navbar } from '../ui/Navbar';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector(state => state.auth );

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') ||'month' );

    /**
     * 
     * Loading events from DB
     */
    useEffect(() => {
        dispatch( eventStartLoading() );
    }, [ dispatch ]);

    /**
     * 
     * Close modal
     * @param {SyntheticEvent} e 
     */
    const onDoubleClick = e => {
        dispatch( uiOpenModal() );
        dispatch( eventSetActive( e ) );        
    };

    const onSelectEvent = e => {
        dispatch( eventSetActive( e ) );
    };

    const onViewChange = e => {
        setLastView( e );
        localStorage.setItem('lastView', e );
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: '#FFFFFF',
        };
        return { style };
    };

    const onSelectSlot = e => {
        dispatch( eventClearActiveEvent() );
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }} 
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                components={{
                    event: CalendarEvent
                }}/>

            <AddNewFab />
            { activeEvent && <DeleteEventFab /> }

            <CalendarModal />
        </div>
    )
};