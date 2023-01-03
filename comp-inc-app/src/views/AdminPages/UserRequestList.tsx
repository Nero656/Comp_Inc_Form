import React, {useEffect, useState} from 'react'
import {Alert, Avatar, List} from 'antd';
import Config from "../../Components/Config";
import SpinEl from "../../Components/SpinEl";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

interface DataType {
    id: number
    name: string
    email:string
    login:string
    avatar:string
}

export default function UserRequestList() {
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(Config.adds() + `/api/user/all`, {
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
    }, [])

    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (
            <List
                style={{width: '100rem'}}
                itemLayout="horizontal"
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        {item.avatar !== null &&
                            <List.Item.Meta
                                avatar={<Avatar src={Config.adds()+item.avatar}/>}
                                title={<Link to={'/RequestList/user/'+item.id}>{item.name}</Link>}
                                description={item.email}
                            />
                        }

                        {item.avatar === null &&
                            <List.Item.Meta
                                avatar={<Avatar size={25} style={{marginLeft: '10px'}}
                                                icon={<UserOutlined size={35}/>}/>}
                                title={<Link to={'/RequestList/user/'+item.id}>{item.name}</Link>}
                                description={item.email}
                            />
                        }
                    </List.Item>
                )}
            />
        );
    }
}