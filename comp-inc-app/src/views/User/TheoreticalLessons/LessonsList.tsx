import React, {useEffect, useState} from 'react'
import {List, Alert} from 'antd';
import Config from "../../../Components/Config";
import SpinEl from "../../../Components/SpinEl";
import {useParams} from "react-router-dom";

interface DataType {
    user_id: number
    type_id: number
    date: string

    theoretical_lessons_type: {
        name: string
    }
}


export default function LessonsList() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()

    let load = () => {
        fetch(Config.adds() + `/api/theoretical/lessons/` + id, {
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

    // let send = (id: number) => {
    //     fetch(Config.adds() + `/api/diving/permitList/` + id, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.token
    //         }
    //     }).then(async response => {
    //         if (!response.ok) {
    //             const error = (response) || response
    //             return Promise.reject(error)
    //         } else {
    //             response.json().then(function (data) {
    //                 load()
    //             });
    //         }
    //     })
    // }
    //

    const access = (access: string) => {
        if (access === 'true')
            return (<Alert
                message="Мед.обследование было успешно пройдено"
                type="success"
                showIcon
                style={{width: '25em'}
                }/>)
        if (access === 'false')
            return (<Alert
                message="В ходе обследования были выявлены проблемы со здоровьем"
                type="error"
                showIcon
                style={{width: '25em'}
                }/>)
    }

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
                header={<h5>Список проведенных занятий</h5>}
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.theoretical_lessons_type.name}
                            description={item.date}
                        />
                    </List.Item>
                )}
            />
        );
    }
}