import React, {useEffect, useState} from 'react'
import {Button, Form, Select, Input, DatePicker, TimePicker, message, Space, Avatar, InputNumber, List,} from 'antd';
import type {DatePickerProps, TimePickerProps, InputNumberProps} from 'antd';
import Config from "../../../Components/Config"
import dayjs from 'dayjs'
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

const format = 'HH:mm';

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
    let {id} = useParams();
    let [users, setUsers] = useState<userType>()
    let [certificate, setCertificate] = useState<itemsType>()
    let [stackId, setStackId] = useState('')
    let [userId, setUserId] = useState('')
    let [date, setDate] = useState('')
    let [time, setTime] = useState('')
    let [duration, setDuration] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

    let name = UserInput('')
    let deep = UserInput('');


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

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setDate(dateString)
    };


    const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
        setTime(timeString)
    };

    const onChangeDuration: TimePickerProps['onChange'] = (duration, durationString) => {
        setDuration(durationString)
    };


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Вы успешно создали запись',
        });
    };

    useEffect(() => {
        fetch(Config.adds() + `/api/dive/types/`, {
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

        fetch(Config.adds() + `/api/reservoirs/`).then(async response => {
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



    const send = () => {
        let data = new FormData()
        data.append('name', name.value())
        data.append('date', date)
        data.append('time', time)
        data.append('deep', deep.value())
        data.append('duration', duration)
        data.append('user_id', String(id))
        data.append('type_id', userId)
        data.append('reservoirs_id', stackId)


        fetch(Config.adds() + `/api/dive/`, {
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
            <h1 style={{textAlign: "center"}}>Отметить погружение</h1>
            <br/>
            <Form.Item label="Выберете место">
                <Select onChange={stackHandleChange} size="large">
                    {certificate?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>
                                <List itemLayout="horizontal">
                                    <List.Item style={{padding: '0.5em 0 0 0'}}>
                                        <List.Item.Meta style={{lineHeight: '1px'}}
                                                        avatar={
                                                            <Avatar src={Config.adds() + item.image_url}/>
                                                        }
                                                        title={item.name}
                                        ></List.Item.Meta>
                                    </List.Item>
                                </List>
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>

            <Form.Item label="Выберете тип погружения">
                <Select onChange={serviceHandleChange} size="large">
                    {users?.map((item, id) => (
                            <Select.Option value={item.id} key={id}>
                                <List itemLayout="horizontal">
                                    <List.Item style={{padding: '0.5em 0 0 0'}}>
                                        <List.Item.Meta style={{lineHeight: '1px'}}
                                            // avatar={
                                            //     <Avatar src={Config.adds() + item.image_url}/>
                                            // }
                                                        title={item.name}
                                        ></List.Item.Meta>
                                    </List.Item>
                                </List>
                            </Select.Option>
                        )
                    )}
                </Select>
            </Form.Item>

            <Form.Item label={"Название"}>
                <Input {...name.bind}/>
            </Form.Item>

            <Form.Item label={"Глубина погружения"} rules={[{type: 'number'}]}>
                <input type={'number'}
                       className={'ant-input css-dev-only-do-not-override-26rdvq'}
                       style={{width:'100%'}}
                       {...deep.bind}/>
            </Form.Item>

            <Form.Item label={"Выберете дату и время проведения"}>
                <Space.Compact style={{width: '100%'}}>
                    <DatePicker style={{width: '50%'}}
                                onChange={onChangeDate}
                                placeholder={'Выберете дату'}
                    />
                    <TimePicker
                        style={{width: '50%'}}
                        onChange={onChangeTime}
                        format={format}
                        defaultOpenValue={dayjs('00:00', format)}
                        placeholder={'Выберете время'}
                    />
                </Space.Compact>
            </Form.Item>

            <Form.Item label={"Продолжительность погружения"}>
                <TimePicker
                    style={{width: '100%'}}
                    onChange={onChangeDuration}
                    format={format}
                    defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                    placeholder={'Время'}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={send} style={{width: '100%'}}>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    )
}