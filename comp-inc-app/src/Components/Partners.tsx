import React, {useEffect, useState} from 'react'
import {Image, Col, Row, Modal, Button} from "antd";
import SpinEl from "./SpinEl";
import Config from "./Config";
import {DeleteFilled} from "@ant-design/icons";

type itemsType = [
    obj: {
        id:number
        image_url: string,
    }
]

const {confirm} = Modal

export default function Services() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    let [items, setItems] = useState<itemsType>();

    useEffect(() => {
        fetch(Config.adds()+`/api/partners/all`).then(async response => {
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
                fetch(Config.adds() + `/api/partners/` + id, {
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
                <h5>Наши партнеры</h5>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {items?.map((item, id) => (
                            <Col key={id}>
                                <Image.PreviewGroup>
                                    <div className={'stack_item'}>
                                        <img alt={'partner'} width={300} src={Config.adds() + item.image_url} />
                                        {Config.User().role_id === 1 &&<Button danger
                                                onClick={() => warning(item.id)}
                                                className={'destroyBTN'}
                                                icon={<DeleteFilled/>}
                                        />}
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