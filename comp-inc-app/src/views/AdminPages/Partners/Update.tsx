import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Input, Row, Tooltip} from 'antd'
import Config from "../../../Components/Config";
import {Console} from "inspector";


type itemsType = [
    obj: {
        id: number,
        name: string,
        image_url: string,
        background_color: string
    }
]

type itemType = {
    id: number,
    name: string,
    image_url: string,
    background_color: string
}


export default function Update() {
    let [file, setFile] = useState<File>()
    const [selectedImage, setSelectedImage] = useState('');
    let reader = new FileReader();
    const fileUpload = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            let url = URL.createObjectURL(e.target.files[0])
            setSelectedImage(url)
            setFile(e.target.files[0])
        }
    }

    const [error, setError] = useState(null)
    const [id, setId] = useState<number>()
    let [items, setItems] = useState<itemsType>();
    useEffect(() => {
        fetch(Config.adds() + `/api/partners/all`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setItems(data)
                });
            }
        })
    }, [])

    const data: any = new FormData()
    data.append('image_url', file)

    const send = () => {
        fetch(Config.adds() + `/api/partners/` + id + `?_method=patch`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            method: 'POST',
            body: data,
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status
                return Promise.reject(error);
            } else {
                window.location.replace('/')
            }
        }).catch(error => {
            console.log(error)
        })
    }
    let [getItem, setGetItem] = useState<itemType>()

    function get(id: number) {
        fetch(Config.adds() + `/api/partners/` + id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status
                return Promise.reject(error);
            } else {
                setGetItem(data)
                setId(id)
                console.log(getItem)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <div style={{display: "flex"}}>
                <Form
                    name="basic"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    className={'auth col-lg-5'}
                >
                    <h1 style={{textAlign: "center"}}> Обновить партнера </h1>

                    <Form.Item
                        label="Картинка"
                        name="image"
                    >
                        <input type='file' onChange={fileUpload}/>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 17, span: 16}}>
                        <Button type="primary" htmlType="submit" onClick={send}>
                            обновить
                        </Button>
                    </Form.Item>
                </Form>

                <Tooltip title={`Предпросмотр изменяемого элемента`}>


                    <div className={'stack_item'} style={{marginLeft: '2rem'}}>
                        <img alt={'preview'} width={200} src={selectedImage} />
                    </div>
                </Tooltip>

                {getItem !== null &&
                    <Tooltip title={`Выбранный изменяемый элемент ${getItem?.name}`}>
                        <div className={'stack_item'} style={{marginLeft: '2rem'}}>
                            <img alt={getItem?.name} width={200} src={Config.adds() + getItem?.image_url} />
                        </div>
                    </Tooltip>
                }

            </div>
            <div className="site-card-wrapper" style={{marginTop: '5rem'}}>
                <Row gutter={16}>
                    {items?.map((item, id) => (
                        <div className={'stack_item'} style={{marginLeft: '2rem'}} onClick={() => get(item.id)}>
                            <img alt={item.name} width={200} src={Config.adds() + item.image_url} />
                        </div>
                    ))}
                </Row>
            </div>
        </>
    )
}
