import React, {useEffect, useState} from 'react'
import {List, Button, Alert, Space} from 'antd';
import Config from "../../Components/Config";
import SpinEl from "../../Components/SpinEl";
import {useParams} from "react-router-dom";

interface DataType {
    status: number
    service: {
        id: number
        name: string
        description: string
        price: string
    }
}


export default function ServicesList() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()

    let load = () => {
        fetch(Config.adds() + `/api/service/sub/` + id, {
            method: 'POST',
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

    let send = (id: number) => {
        fetch(Config.adds() + `/api/service/sub/` + Config.User().id + `/` + id, {
            method: 'POST',
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
                    load()
                });
            }
        })
    }


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
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.service.name}
                            description={item.service.price}
                        />


                        {item.status === 1 &&


                            <Button danger onClick={e => send(item.service.id)}>Отключить</Button>

                        }
                        {item.status === 0 &&
                            <Space direction="horizontal">
                                <Alert message="Услуга была отключена" type="warning" showIcon/>
                                <Button type="primary" onClick={e => send(item.service.id)}>Подключить</Button>
                            </Space>
                        }
                    </List.Item>
                )}
            />
        );
    }
}