import SpinEl from "../../Components/SpinEl";
import React, {useEffect, useState} from "react";
import Config from "../../Components/Config";
import {Image, Typography, Card, Row, Col, Space, Alert} from 'antd';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

const {Title, Text} = Typography;

interface itemsType {
    id: number
    name: string
    login: string
    role_id: number
    email: string
    telephone: string
    avatar: string
    instructor_id: number
}

interface statusDate {
    access: string
}


export default function UserPage() {
    const {id} = useParams();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    let [items, setItems] = useState<itemsType>();
    let [status, setStatus] = useState<statusDate[]>([]);


    let load = () => {
        fetch(Config.adds() + `/api/user/show/` + id, {
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
                    setItems(data)
                    setIsLoaded(true)
                });
            }
        })

        fetch(Config.adds() + `/api/diving/permitList/getStatus/` + id, {
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
                    setStatus(data)
                    setIsLoaded(true)
                });
            }
        })
    }

    const message = () => {
        let element = null
        status.map((item, id) => {
            if (item?.access === "true")
                element = <Alert
                    type='success'
                    message={items?.name + ' успешно допущен(а) к занятиям '}
                    showIcon
                />
            if (item?.access === "false")
                element = <Alert
                    type='error'
                    message={items?.name + '  не допущен(а) к занятиям'}
                    showIcon
                />
            if (item?.access === "null")
                element = <Alert
                    type='warning'
                    message={'Данные ещё не проверены'}
                    showIcon
                />
        })
        if (status.length === 0) {
            element = <Alert
                type='warning'
                message={'Данные о здоровье ещё не предоставлены'}
                showIcon
            />
        }

        return element
    }

    useEffect(() => {
        load()
    }, [])

    const redirect = () => {
        return window.location.replace('/UserPage/' + items?.instructor_id)
    }

    const services = () => {
        let identification = Number(id)
        let element = null


        if (Config.User().role_id === 1 || Config.User().id === identification)
            element = <>
                <Card title="Дополнительные услуги">
                    <Link to={'/Services/user/' + id}>подключеные услуги</Link>
                </Card>
                <Card title="Медицинские осмотры">
                    {sendIssue()}
                    <br/>
                    <Link to={'/Medical_examinations_list/user/' + id}>Проведенные мед. осмотры</Link>
                </Card>
            </>

        return element
    }

    const sendIssue = () => {
        let identification = Number(id)
        let element = null

        if (Config.User().id === identification)
            element = <Link to={'/Medical_checkup/user/' + id}>Пройти мед. осмотр в онлайн формате</Link>

        return element
    }


    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (
            <div>
                <Row gutter={12}>
                    <Col span={9}>
                        <Space direction="vertical" size={16}>
                            {message()}
                            <Card>
                                <div style={{borderRadius: '200px', overflow: 'hidden'}}>
                                    <Image alt={items?.name} src={Config.adds() + items?.avatar}/>
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    {items != null &&
                                        <Title>{Config.Role(items?.role_id)}</Title>
                                    }
                                    <Text>Имя: {items?.name}</Text><br/>
                                    <Text>Логин: {items?.login}</Text><br/>
                                    <Text>Email: {items?.email}</Text><br/>
                                    <Text>Телефон: {items?.telephone}</Text><br/>

                                    {items?.instructor_id != null && items?.role_id === 2 &&
                                        <Text> Инструктор:
                                            <a onClick={() => redirect()}> Инструктор</a>
                                        </Text>
                                    }
                                    {items?.instructor_id === null && items?.role_id === 2 &&
                                        <>
                                            <Text>Инструктор: не назначен</Text>
                                            <br/>
                                            {Config.User().role_id === 1 &&
                                                <Text>
                                                    <Link to={'/appoint_an_instructor/' + id}>
                                                        Назначить нового инструктора
                                                    </Link>
                                                </Text>
                                            }
                                        </>
                                    }
                                </div>
                            </Card>
                            <Card title="Книга дайвера">
                                {Config.User().role_id === 1 &&
                                    <Link to={'/DiveCreate/' + id}>Добавить погружение</Link>
                                }
                                <br/>
                                <Link to={'/DiveList/' + id}>проведенные занятия</Link>
                            </Card>
                        </Space>
                    </Col>

                    <Col span={10}>
                        <Space direction="vertical" size={16}>
                            {services()}
                            <Card title="Теоретические занятия">
                                <Link to={'/TheoreticalLessonsList/' + id}>Проведенные занятия</Link>
                            </Card>

                            <Card title="Сертификаты">
                                <Link to={'/Certificate/user/' + id}>Сертификаты</Link>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        )
    }
}