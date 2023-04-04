import React, {useEffect, useState} from 'react'
import {List, Button, message } from 'antd';
import Config from "../Components/Config";
import SpinEl from "../Components/SpinEl";

interface DataType {
    id: number
    name: string
    description: string
    price: string
}

export default function ServicesList() {
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('Вы подключили услугу, подробнее  в личном кабинете');
    };


    let load = () => {
        fetch(Config.adds() + `/api/service/all`, {
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

    let send = (id: number) =>{
        fetch(Config.adds() + `/api/service/sub/`+Config.User().id +`/`+id, {
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
                    info()
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
                            title={item.name}
                            description={item.price}

                        />
                        {contextHolder}
                        <Button onClick={e => send(item.id)}>Подключить</Button>
                    </List.Item>
                )}
            />
        );
    }
}