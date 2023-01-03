import React, {useState} from 'react'
import {Button, Card, Form, Input} from 'antd'
import Config from "../../../Components/Config";
import {Console} from "inspector";

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

export default function Create() {
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

    let name = UserInput('');
    let color = UserInput('');

    const data:any = new FormData()
    data.append('name', name.value())
    data.append('background_color', color.value())
    data.append('image_url', file)

    const send = (e: any) => {
        fetch(Config.adds() + `/api/service/`, {
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

    return (
        <div style={{display: "flex"}}>
            <Form
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                autoComplete="off"
                className={'auth col-lg-5'}
            >
                <h1 style={{textAlign: "center"}}> Создать сервис </h1>
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
                        Создать
                    </Button>
                </Form.Item>
            </Form>

            <Card
                hoverable
                style={{width: '18rem', height: '24rem', backgroundColor: color.value(), marginLeft: 16}}
                cover={<img alt={'preview'} src={selectedImage}/>}>
                <h6>{name.value()}</h6>
            </Card>
        </div>
    );
}