import React from 'react';

import GridLoader from 'react-spinners/GridLoader';
import SyncLoader from 'react-spinners/SyncLoader';

function Loading({type} : {type: number}) {
    // type 1 - Page loading
    // type 2 - Small loading
    return (
        <>
        {type === 1 ? (
            <div className="loading">
                <GridLoader size={25} color={"rgb(224, 224, 22)"} />
            </div>
        ) : (
            <div className="small-loading">
                <SyncLoader size={20} color={"rgb(224, 224, 22)"} />
            </div>
        )}
        </>
    )
}

export default Loading;