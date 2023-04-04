import React, {useEffect, useState} from 'react'
import {List, Button, Alert, Space, Avatar} from 'antd';
import Config from "../../Components/Config";
import SpinEl from "../../Components/SpinEl";
import {useParams} from "react-router-dom";

interface DataType {

    id: number
    user_id: number
    type_id: number
    date_of_issue: string

    user:{

        name: string
        email: string
        telephone:string
        avatar:string
    }

    types: {
        id: number
        name: string
    }
}


export default function CertificateList() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()

    let load = () => {
        fetch(Config.adds() + `/api/Certificate/list/` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setRequestList(data)
                    setIsLoaded(true)
                });
            }
        })
    }

    useEffect(() => {
        load()
    }, [])

    let send = (id: number) => {
        fetch(Config.adds() + `/api/service/sub/` + Config.User().id + `/` + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    load()
                });
            }
        })
    }


    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (
            <List
                header={<h5>Список выданных сертификатов</h5>}
                style={{width: '100rem'}}
                itemLayout="horizontal"
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={Config.adds()+item.user.avatar}/>}
                            title={item.types.name}
                            description={item.date_of_issue}
                        />
                    </List.Item>
                )}
            />
        );
    }
}