import React, {useEffect, useState} from 'react'
import {Button, Form, Select, List, Avatar, DatePicker, message} from 'antd';
import type {DatePickerProps} from 'antd';
import Config from "../../../Components/Config";
import {useParams} from "react-router-dom";

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


export default function Main() {
    const {id} = useParams();
    let [users, setUsers] = useState<userType>()
    let [certificate, setCertificate] = useState<itemsType>()
    let [stackId, setStackId] = useState('')
    let [userId, setUserId] = useState('')
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
        setUserId(value)
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
        fetch(Config.adds() + `/api/user/trainerList`, {
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
    }, [])


    const send = () => {
        fetch(Config.adds() + `/api/user/TrainerAppend/`+id+`/`+userId, {
            method: 'PUT',
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
            <h1 style={{textAlign: "center"}}>Назначить тренера</h1>
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

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={send} style={{ width: '100%' }}>
                    Назначить
                </Button>
            </Form.Item>
        </Form>
    )
}