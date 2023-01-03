import React, {useEffect, useState} from 'react'
import {Image, Col, List, Row, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";


type itemsType = [
    obj: {
        name: string,
        image_url: string,
        background_color: string
    }
]

export default function SpinEl() {
    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>
    return (
        <List className={'Form col-lg-2 mt-5 '}>
            <div className={'container-fluid row justify-content-center'}>
                <Spin indicator={antIcon}/>
            </div>
        </List>
    )
}