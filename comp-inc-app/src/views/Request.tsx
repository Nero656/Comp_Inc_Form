import React, {useEffect, useState} from 'react'
import {Button, Form, Select} from 'antd';
import TextArea from "antd/es/input/TextArea";
import Config from "../Components/Config";

type itemsType = [
    obj: {
        id: number,
        name: string,
        image_url: string,
        background_color: string
    }
]

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

export default function Services() {
    let [services, setServices] = useState<itemsType>();
    let [stacks, setStacks] = useState<itemsType>();
    let [stackId, setStackId] = useState('');
    let [serviceId, setServiceId] = useState('');
    let desc = UserInput('');

    let user
    if (localStorage.getItem('User') !== null) {
        user = JSON.parse(localStorage.User);
    }

    const stackHandleChange = (value: string) => {
        setStackId(value)
    };
    const serviceHandleChange = (value: string) => {
        setServiceId(value)
    };


    useEffect(() => {
        fetch(Config.adds() + `/api/service/all`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setServices(data)
                });
            }
        })

        fetch(Config.adds() + `/api/stack/all`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setStacks(data)
                });
            }
        })
    }, [])

    let data = new FormData()
    data.append('status_id', '1');
    data.append('service_id', serviceId);
    data.append('stack_id', stackId);
    data.append('description', desc.value());
    data.append('telephone', user.telephone);

    const send = () => {
        fetch(Config.adds() + `/api/orders/`, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status
                return Promise.reject(error);
            } else {
                // window.location.replace('auth')
            }
        })
    }

    return (
        <Form
            name="basic"
            layout='vertical'
            labelCol={{span: 10}}
            wrapperCol={{span: 24}}
            initialValues={{remember: true}}
            autoComplete="off"
            className={'auth col-lg-5'}
        >
            <h1 style={{textAlign: "center"}}> Оформление заявки {localStorage.User.telephone}</h1>
            <Form.Item label="Выберете тип приложения">
                <Select onChange={serviceHandleChange}>
                    {services?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>{item.name}</Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Выберете технологию">
                <Select onChange={stackHandleChange}>
                    {stacks?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>{item.name}</Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Опишите ваше приложение" {...desc.bind}>
                <TextArea rows={4}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={send}>
                    Падать заявку
                </Button>
            </Form.Item>
        </Form>
    )
}