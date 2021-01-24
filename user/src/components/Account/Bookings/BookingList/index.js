import React from 'react';

import Desktop from './Desktop';
import Mobile from './Mobile';

const bookingList = (props) => {

    return(
        <React.Fragment>
            <Desktop
            {...props}
            />
            <Mobile {...props}/>
        </React.Fragment>
    )
}
export default bookingList;