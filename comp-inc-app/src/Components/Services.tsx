import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Row, Modal, Tooltip} from "antd";
import SpinEl from "./SpinEl";
import Config from "./Config";
import {DeleteFilled} from "@ant-design/icons";

type itemsType = [
    obj: {
        id: number
        name: string
        image_url: string
        background_color: string
    }
]

const {confirm} = Modal;

function DeleteTwoTone() {
    return null;
}

export default function Services() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    let [items, setItems] = useState<itemsType>();
    useEffect(() => {
        fetch(Config.adds() + `/api/service/all`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setItems(data)
                    setIsLoaded(true)
                });
            }
        })
    }, [])

    const warning = (id: number) => {
        confirm({
            title: 'Вы хотите удалить этот эелемент',
            content: 'после удаления его невозможно будет вотановить',
            okText: 'Да',
            cancelText: 'Нет',
            onOk() {
                fetch(Config.adds() + `/api/service/` + id, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    },
                    method: 'DELETE',
                }).then(async response => {
                    window.location.replace('/')
                })
            },
            onCancel() {
            },
        });
    };

    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)

    } else {
        return (
            <div className={'justify-content-center'}>
                <h5>Сервисы</h5>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {items?.map((item, id) => (
                            <Col key={id}>
                                <Card
                                    hoverable
                                    style={{
                                        width: '18rem',
                                        height: '24rem',
                                        backgroundColor: item.background_color,
                                        marginTop: 16
                                    }}
                                    cover={<img alt="example" src={Config.adds() + item.image_url}/>}>
                                    <h6>{item.name}</h6>
                                    {localStorage.getItem('User') !== null && Config.User().role_id === 1 &&
                                        <Tooltip title="Удалить">
                                            <Button danger
                                                    onClick={() => warning(item.id)}
                                                    className={'destroyBTN'}
                                                    icon={<DeleteFilled/>}
                                            />
                                        </Tooltip>
                                    }
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
}