import React, {useEffect, useState} from 'react'
import {List, Alert, Avatar} from 'antd';
import {Link} from "react-router-dom";

import Config from "../../../Components/Config";
import SpinEl from "../../../Components/SpinEl";
import {useParams} from "react-router-dom";

interface DataType {
    id: number
    name: string
    date: string
    reservoirs: {
        image_url: string
    }
}


export default function DiveList() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()

    let load = () => {
        fetch(Config.adds() + `/api/dive/` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setRequestList(data)
                    setIsLoaded(true)
                });
            }
        })
    }

    useEffect(() => {
        load()
    }, [])



    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (
            <List
                style={{width: '100rem'}}
                itemLayout="horizontal"
                header={<h5>Список погружений</h5>}
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Link to={'/DivePreview/' + item.id}
                                        key="list-loadmore-more">Подробне</Link>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={Config.adds()+item.reservoirs.image_url}/>}
                            title={`${item.name}`}
                            description={`${item.date}`}
                        />
                    </List.Item>
                )}
            />
        );
    }
}