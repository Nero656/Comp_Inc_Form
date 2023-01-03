import React, {useState} from 'react'
import {Button, Form, Input} from 'antd'
import Config from "../../Components/Config";

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

export default function AboutDev() {
    let email = UserInput('');
    let password = UserInput('');
    function sendAuth(e: { preventDefault: () => void; }) {
        const data: any = new FormData();
        data.append('email', email.value())
        data.append('password', password.value())
        e.preventDefault()
        Config.auth(data)
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            autoComplete="off"
            className={'auth col-lg-5'}
        >
            <h1 style={{textAlign: "center"}}> Авторизация </h1>
            <Form.Item
                label="Email"
                name="Email"
                rules={[{required: true, message: 'Пожалуйста введите ваш Email!'}]}
            >
                <Input {...email.bind}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Пожалуйста введите ваш пароль!'}]}
            >
                <Input.Password {...password.bind}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 17, span: 16}}>
                <Button type="primary" htmlType="submit" onClick={sendAuth}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
}