import React from 'react';
import AddLocations from '../containers/AddLocations';
import LocationsList from '../containers/LocationsList';

function SidePanel() {
    return (
        <div className='sidepanel-container'>
            <AddLocations />
            <div className='horiz-separator'></div>
            <LocationsList />
        </div>
    )
}
export default SidePanel;
