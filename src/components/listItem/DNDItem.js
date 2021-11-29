import React from 'react'

import {FaBars} from "react-icons/fa";


const DNDItem = props => {


    return (

            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <FaBars size={24} className={'text-gray-400 ml-2'} />
                </div>
                <div className="col-span-6">
                    <p className="text-xs">{props.item.title}</p>
                    <p className="text-xs">= {props.item.result}</p>
                </div>
                <div className="col-span-4">
                    <div>
                        <a target={'_blank'}
                           rel="noreferrer"
                           href={'http://localhost:5000'  + props.item.filePath}
                            className={'bg-gray-800 text-xs text-white font-bold rounded-full py-1 px-3'}
                        >View Input</a>
                    </div>
                </div>
            </div>

    )
}

export default DNDItem