import React, {useEffect, useState} from 'react'
import {Button, Form, Select, List, Avatar, DatePicker, message} from 'antd';
import type { DatePickerProps } from 'antd';
import Config from "../../../Components/Config";

type itemsType = [
    obj: {
        id: number,
        name: string,
        image_url: string,
        background_color: string
    }
]

type userType = [
    obj: {
        id: number,
        name: string,
        avatar: string,
        role_id: number
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
    let [users, setUsers] = useState<userType>()
    let [certificate, setCertificate] = useState<itemsType>()
    let [stackId, setStackId] = useState('')
    let [serviceId, setServiceId] = useState('')
    let [date, setDate] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

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

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString)
    };


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Вы успешно создали запись',
        });
    };

    useEffect(() => {
        fetch(Config.adds() + `/api/user/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            method: 'GET'
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setUsers(data)
                });
            }
        })

        fetch(Config.adds() + `/api/Certificate/types`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setCertificate(data)
                });
            }
        })
    }, [])

    let data = new FormData()
    data.append('user_id', serviceId)
    data.append('type_id', stackId)
    data.append('date_of_issue', date)

    const send = () => {
        fetch(Config.adds() + `/api/Certificate/make`, {
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
                success()
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
            {contextHolder}
            <h1 style={{textAlign: "center"}}> Выдать сертификат</h1>
            <Form.Item label="Выберете пользователя">
                <Select onChange={serviceHandleChange} size="large">
                    {users?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>
                                <List itemLayout="horizontal">
                                    <List.Item style={{padding: '0.45em 0 0 0'}}>
                                        <List.Item.Meta style={{lineHeight: '1px'}}
                                                        avatar={<Avatar src={Config.adds() + item.avatar}/>}
                                                        title={item.name}
                                                        description={Config.Role(item.role_id)}
                                        ></List.Item.Meta>
                                    </List.Item>
                                </List>
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Выберете сертифкат">
                <Select onChange={stackHandleChange} >
                    {certificate?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>{item.name}</Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Выберете дату выдачи" >
                <DatePicker style={{width: '100%'}} onChange={onChange}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={send} style={{width: '100%'}}>
                    Падать заявку
                </Button>
            </Form.Item>
        </Form>
    )
}