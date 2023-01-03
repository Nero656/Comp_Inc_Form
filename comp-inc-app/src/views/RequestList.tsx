import React, {useEffect, useState} from 'react'
import {Alert, Avatar, List} from 'antd';
import Config from "../Components/Config";
import SpinEl from "../Components/SpinEl";
import {Link, useParams} from "react-router-dom";

interface DataType {
    id: number
    telephone: string

    user:{
        avatar:string
    }
    status: {
        id: number
        name: string
    },
    status_id: number
    service: {
        name: string
    },
    service_id: number

    description: string

    created_at: string

    updated_at: string
}

export default function RequestList() {
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const {id} = useParams();

    useEffect(() => {
        fetch(Config.adds() + `/api/orders/reqList/`+id, {
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
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={Config.adds()+item.user.avatar}/>}
                            title={<Link to={'/RequestList/request/'+item.id}>{'заявка #'+ item.service.name}</Link>}
                            description={item.status.name}
                        />
                        {item.status.id == 1 &&
                            <Alert message="В ожидании" type="info" showIcon />
                        }
                        {item.status.id == 2 &&
                            <Alert message="Успешно" type="success" showIcon />
                        }
                        {item.status.id == 3 &&
                            <Alert message="Отклонено" type="error" showIcon />
                        }

                    </List.Item>
                )}
            />
        );
    }
}