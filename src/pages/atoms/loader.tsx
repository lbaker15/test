import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux"
import { RootState } from '../../store';

type Props = {
    left: boolean
}
const Loader = ({ left }: Props) => {
    return (
        <Fragment>
            <div style={left ? {left: 0} : {right:0}} className="loader">
                <h1>Loading...</h1>
            </div>
        </Fragment>
    )
}


export default Loader;

