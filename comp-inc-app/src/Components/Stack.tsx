import React, {useEffect, useState} from 'react'
import {Image, Col, Row, Tooltip, Button, Modal} from "antd";
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

export default function Services() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    let [items, setItems] = useState<itemsType>();
    useEffect(() => {
        fetch(Config.adds()+`/api/stack/all`).then(async response => {
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
            <div className={'justify-content-center'} style = {{marginTop: '5em'}}>
                <h5>Технологии которые мы используем</h5>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {items?.map((item, id) => (
                            <Col key={id}>
                                <Image.PreviewGroup>
                                    <div className={'stack_item'} style={{color: item.background_color}}>
                                        <img alt={item.name} width={150} src={Config.adds() + item.image_url} />
                                        <h6>{item.name} </h6>
                                        {localStorage.getItem('User') !== null && Config.User().role_id === 1 &&
                                            <Tooltip title="Удалить">
                                                <Button danger type={'text'}
                                                        onClick={() => warning(item.id)}
                                                        className={'destroyBTN'}
                                                        icon={<DeleteFilled/>}
                                                />
                                            </Tooltip>
                                        }
                                    </div>
                                </Image.PreviewGroup>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
}

