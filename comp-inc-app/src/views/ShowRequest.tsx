import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Badge, Button, Descriptions, Select} from 'antd';
import Config from "../Components/Config";
import SpinEl from "../Components/SpinEl";

interface DataType {
    id: number
    telephone: string
    status: {
        id: number
        name: string
    },
    status_id: number
    service: {
        name: string
    },
    service_id: number

    stack: {
        name: string
    }
    stack_id: number

    description: string

    created_at: string

    updated_at: string
}

export default function () {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    let data = new FormData()

    useEffect(() => {
        fetch(Config.adds() + `/api/orders/` + id, {
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
                    console.log(data)
                    setIsLoaded(true)
                });
            }
        })
    }, [])

    const apply = (status:string) => {
        data.append('status_id', status)
        fetch(Config.adds() + `/api/orders/` + id + `?_method=patch`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            method: 'POST',
            body: data,
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    window.location.replace('/RequestList/request/'+id)
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
        return (<div>
                {requestList?.map((item, id) => (
                        <Descriptions title="Статус заявки" bordered style={{marginBottom: 20}}>
                            <Descriptions.Item key={id} label="Номер телефона">{item.telephone}</Descriptions.Item>
                            <Descriptions.Item label="Приложение">{item.service.name}</Descriptions.Item>
                            <Descriptions.Item label="Технология">{item.stack.name}</Descriptions.Item>
                            <Descriptions.Item label="Заявка была отправлена">{item.created_at}</Descriptions.Item>
                            <Descriptions.Item label="Статус" span={3}>
                                {item.status.id == 1 &&
                                    <Badge status="processing" text={item.status.name}></Badge>
                                }
                                {item.status.id == 1 && Config.User().role_id === 1 &&
                                    <span style={{float: "right"}}>
                                        <Button type="primary" onClick={() => apply('2')}>
                                            Принять
                                        </Button>

                                        <Button danger style={{marginLeft: 10}} onClick={() => apply('3')}>
                                            Отклонить
                                        </Button>
                                    </span>
                                }
                                {item.status.id == 2 &&
                                    <Badge status="success" text={item.status.name}></Badge>
                                }
                                {item.status.id == 3 &&
                                    <Badge status="error" text={item.status.name}></Badge>
                                }

                            </Descriptions.Item>
                        </Descriptions>
                    )
                )}

                <h5 style={{color: '#AEAEAE', fontStyle: 'italic'}}>
                    P.S Мы свяжемся с вами по номеру телефона или электронной почте
                </h5>
            </div>
        )
    }
}