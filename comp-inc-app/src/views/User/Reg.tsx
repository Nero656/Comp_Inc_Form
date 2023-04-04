import React, {useState} from 'react'
import {Button, Form, Input, Space, Upload} from 'antd'
// @ts-ignore
import InputMask from 'react-input-mask';
import Config from "../../Components/Config";
function PhoneInput(props:any) {
    return (
        <InputMask
            className={'ant-input css-dev-only-do-not-override-26rdvq'}
            mask='(+7) 999 999 9999'
            value={props.value}
            onChange={props.onChange}/>
    );
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


export default function Reg() {
    const phone = UserInput('');

    let name = UserInput('')
    let login = UserInput('')
    let email = UserInput('')
    let password = UserInput('')
    let [avatarFile, setAvatarFile] = useState<File>()

    function fileUpload(e: any) {
        setAvatarFile(e.target.files[0])
    }

    function sendReg(e: { preventDefault: () => void; }) {
        const data: any = new FormData();
        data.append('name', name.value())
        data.append('login', login.value())
        data.append('email', email.value())
        data.append('telephone', phone.value())
        data.append('password', password.value())
        data.append('avatar', avatarFile)

        e.preventDefault()

        Config.registration(data)
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
            <h1 style={{textAlign: "center"}}> Регистрация {}</h1>
            <Form.Item
                label="Имя"
                name="name"
                rules={[{required: true, message: 'Пожалуйста введите ваше Имя!'}]}
            >
                <Input {...name.bind}/>
            </Form.Item>

            <Form.Item
                label="Логин"
                name="login"
                rules={[{required: true, message: 'Пожалуйста введите ваш Логин!'}]}
            >
                <Input {...login.bind}/>
            </Form.Item>

            <Form.Item
                label="Телефон"
                name="telephone"
                rules={[{required: true, message: 'Пожалуйста введите ваш номер телефона!'}]}
            >
                <PhoneInput {...phone.bind} />
            </Form.Item>


            <Form.Item
                label="Email"
                name="Email"
                rules={[{required: true, message: 'Пожалуйста введите ваш Email!'}]}
            >
                <Input   {...email.bind}/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Пожалуйста введите ваш пароль!'}]}
            >
                <Input.Password {...password.bind}/>
            </Form.Item>

            <Form.Item
                label="Аватарка"
                name="avatar"
            >
                <input type='file' onClick={fileUpload}/>
            </Form.Item>


            <Form.Item wrapperCol={{offset: 17, span: 16}}>
                <Button type="primary" htmlType="submit" onClick={sendReg} style={{ width: '100%' }}>
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
}