import React, {useEffect, useState} from 'react'
import {List, Alert} from 'antd';
import {Link} from "react-router-dom";

import Config from "../../../Components/Config";
import SpinEl from "../../../Components/SpinEl";
import {useParams} from "react-router-dom";

interface DataType {
    id: number
    access: string
}


export default function MedicalExaminationsList() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState()

    let load = () => {
        fetch(Config.adds() + `/api/diving/permitList/` + id, {
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
        if (access === 'null')
            return (<Alert
                message="В процессе проверки"
                type="warning"
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
                header={<h5>Список справок на проверку</h5>}
                dataSource={requestList}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Link to={'/Medical_examinations_list/Test/' + item.id}
                                     key="list-loadmore-more">Подробне</Link>]}
                    >
                        <List.Item.Meta
                            title={'Мед.обследование'}
                            description={access(item.access)}
                        />
                    </List.Item>
                )}
            />
        );
    }
}