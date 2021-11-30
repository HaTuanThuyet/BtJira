import React from 'react'

import styleLoading from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    console.log(isLoading);
    if (isLoading) {
        return (
            <div className="bgrgba">
                <div className={styleLoading.bgLoading}  >
                </div>
            </div>

        )
    } else {
        return ''
    }
}
