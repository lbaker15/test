import React, {useEffect, useState} from 'react';

type Props = {
    epoch: number, loading: boolean
}
const RecentEpoch = ({epoch}: Props) => {
    return (
        <div className="left__epoch">
            <h2>Recent time from the server (epoch):</h2> 
            {epoch && <h4>{epoch}</h4>}
        </div>
    )
}

export default React.memo(RecentEpoch);