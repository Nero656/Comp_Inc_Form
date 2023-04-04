import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Card, Image, Typography, Space} from 'antd';
import Config from "../../../Components/Config";
import SpinEl from "../../../Components/SpinEl";


const {Meta} = Card;
const {Title, Text} = Typography;

interface DataType {
    id: number
    name: string
    date: string
    time: string
    deep: string
    duration: string
    reservoirs: {
        name: string
        address: string
        image_url: string
    }
}

export default function DivePreview() {
    const {id} = useParams();
    const [requestList, setRequestList] = useState<DataType[]>()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    let data = new FormData()


    const load = () => {
        fetch(Config.adds() + `/api/dive/preview/` + id, {
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


    if (error) {
        return <div>Ошибка: {error}</div>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (<div>
                {requestList?.map((item, id) => (
                        <Card
                            key={id}
                            hoverable
                            style={{width: 300, marginLeft: "35%", marginRight: "50%"}}
                            cover={<Image alt="example" src={Config.adds() + item.reservoirs.image_url}/>}
                        >
                            <Meta
                                title={`Погружение  ${item.name}`}
                            />
                            <br/>
                            <Space direction="vertical" size={16}>
                                <Text>Дата {item.date}</Text>
                                <Text>Начало в {item.time}</Text>
                                <Text>Глубина {item.deep}</Text>
                                <Text>Продолжительность {item.duration}</Text>
                                <Text>Место: {item.reservoirs.name}</Text>
                                <Text>Адрес:  {item.reservoirs.address}</Text>
                            </Space>
                        </Card>
                    )
                )}
                <br/>
                <h5 style={{color: '#AEAEAE', fontStyle: 'italic'}}>
                    P.S Мы свяжемся с вами по номеру телефона или электронной почте
                </h5>
            </div>
        )
    }
}