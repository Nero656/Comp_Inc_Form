import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Button, Card, Image, Row, Space} from 'antd';
import Config from "../../../Components/Config";
import SpinEl from "../../../Components/SpinEl";

const {Meta} = Card;

interface DataType {
    id: number
    user_id: number,
    file: string,
    access: string,
    created_at: string
    updated_at: string
}

export default function () {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    let data = new FormData()


    const load = () => {
        fetch(Config.adds() + `/api/diving/permitList/permit/` + id, {
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

    const apply = () => {
        fetch(Config.adds() + `/api/diving/permitList/permitTrue/` + id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            method: 'PUT',
            body: data,
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                load()
                return Promise.reject(error)
            }
        })
    }

    const cancel = () =>{
        fetch(Config.adds() + `/api/diving/permitList/permitFalse/` + id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            method: 'PUT',
            body: data,
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    load()
                    window.location.replace('/')
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
                        <Card
                            key={id}
                            hoverable
                            style={{width: 300, marginLeft: "35%", marginRight: "50%"}}
                            cover={<Image alt="example" src={Config.adds() + item?.file}/>}
                        >
                            <Meta title="Справка"/>
                            <br/>
                            {Config.User().role_id === 1 && item.access !== 'true' && item.access !== 'false' &&
                            <Space style={{padding: '0 2.5em 0 2.5em'}}>
                                <Button type="primary" block onClick={apply}>
                                    Принять
                                </Button>
                                <Button danger ghost block onClick={cancel}>Отклонить</Button>
                            </Space>
                            }
                        </Card>
                    )
                )}
                <br/>
                <h5 style={{color: '#AEAEAE', fontStyle: 'italic'}}>
                    P.S Мы свяжемся с вами по номеру телефона или электронной почте
                </h5>
            </div>
        )
    }
}