import React from 'react';

import Desktop from './Desktop';
import Mobile from './Mobile';

const TripList = (props) => {

    return(
        <React.Fragment>
            <Desktop {...props}/>
            <Mobile  {...props}/>
        </React.Fragment>
    )
}
export default TripList;