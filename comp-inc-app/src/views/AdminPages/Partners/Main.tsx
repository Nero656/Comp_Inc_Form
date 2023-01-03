import React from 'react'
import {Tabs} from 'antd'
import Create from "./Create";
import Update from "./Update";


export default function Main() {

    const pages = [
        {
            id: 0,
            title: 'создать',
            element: <Create/>,
        },
        {
            id: 0,
            title: 'обновить',
            element: <Update/>,
        }
    ]

    return (
        <Tabs
            defaultActiveKey="1"
            tabPosition={'left'}
            size={"large"}
            className={'tabs'}
            items={pages.map((item, i) => {
                const id = String(i + 1)
                return {
                    label: item.title,
                    key: id,
                    children: item.element,
                };
            })}
        />
    )
}