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

function UserInput(e: string) {
    let [value, setValue] = useState('')
    return {
        bind: {
            value,
            onChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value)
        },
        clear: () => setValue(('')),
        value: () => value
    }
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

    let name = UserInput('');
    let color = UserInput('');

    const data: any = new FormData()
    data.append('name', name.value())
    data.append('background_color', color.value())
    data.append('image_url', file)

    const send = () => {
        fetch(Config.adds() + `/api/service/` + id + `?_method=patch`, {
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
        fetch(Config.adds() + `/api/service/` + id, {
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
                    <h1 style={{textAlign: "center"}}> Обновить сервис </h1>
                    <Form.Item
                        label="Название"
                        name="name"
                        rules={[{required: true, message: 'Пожалуйста введите название сервиса'}]}
                    >
                        <Input {...name.bind}/>
                    </Form.Item>

                    <Form.Item
                        label="Цвет фона"
                        name="color"
                    >
                        <Input type={'color'} {...color.bind}/>
                    </Form.Item>


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
                    <Card
                        hoverable
                        style={{width: '18rem', height: '24rem', backgroundColor: color.value(), marginLeft: 16}}
                        cover={<img alt={'preview'} src={selectedImage}/>}>
                        <h6>{name.value()}</h6>
                    </Card>
                </Tooltip>

                {getItem !== null &&
                    <Tooltip title={`Выбранный изменяемый элемент ${getItem?.name}`}>
                        <Card
                            hoverable
                            style={{
                                width: '18rem',
                                height: '24rem',
                                backgroundColor: getItem?.background_color,
                                marginLeft: 16
                            }}
                            cover={<img alt={'preview'} src={Config.adds() + getItem?.image_url}/>}>
                            <h6>{getItem?.name}</h6>
                        </Card>
                    </Tooltip>
                }

            </div>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    {items?.map((item, id) => (
                        <Col key={id}>
                            <Tooltip title={`выбрать ${item.name}`}>
                                <Card onClick={() => get(item.id)} hoverable style={{
                                    width: '18rem',
                                    height: '24rem',
                                    backgroundColor: item.background_color,
                                    marginTop: 16
                                }} cover={<img alt="example" src={Config.adds() + item.image_url}/>}>
                                    <h6>{item.name}</h6>
                                </Card>
                            </Tooltip>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
