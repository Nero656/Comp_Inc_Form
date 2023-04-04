import React, {useEffect, useState} from 'react'
import {Image, Descriptions, Space, Card} from 'antd'
import {Link, useParams} from "react-router-dom";
import Config from "../../Components/Config";
import {Calendar} from 'antd';
import type {Dayjs} from 'dayjs';
import type {CalendarMode} from 'antd/es/calendar/generateCalendar';


interface gymInterface {
    name: string
    image_url: string
    background_color: string
    address: string

    type_id: {
        id: number
        name: string
        description: string
    }
}

export default function Main() {
    const {id} = useParams()

    let [gym, setGym] = useState<gymInterface[]>()


    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    useEffect(() => {
        fetch(Config.adds() + `/api/reservoirs/` + id).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setGym(data)
                });
            }
        })


    }, [])


    return (
        <div style={{width: '80%'}}>
            {gym?.map((item, id) => (
                <div key={id}>
                    <Space direction={'horizontal'} size={20}>
                        <div style={{overflow: 'hidden', borderRadius: '12.5px', width: 200}}>
                            <Image
                                src={Config.adds() + item.image_url}
                            />
                        </div>
                        <Descriptions title="Информация">
                            <Descriptions.Item label="Водоём">{item.name}</Descriptions.Item>
                            <Descriptions.Item label="Тип">{item.type_id.name}</Descriptions.Item>
                            <Descriptions.Item label="Адрес">{item.address}</Descriptions.Item>
                        </Descriptions>
                    </Space>
                </div>
            ))}


            <br/>
            <Card title={'Расписание поездок'}>
                <Calendar onPanelChange={onPanelChange}/>
            </Card>
        </div>

        // <Tabs
        //     defaultActiveKey="1"
        //     tabPosition={'left'}
        //     size={"large"}
        //     className={'tabs'}
        //     items={pages.map((item, i) => {
        //         const id = String(i + 1)
        //         return {
        //             label: item.title,
        //             key: id,
        //             children: item.element,
        //         };
        //     })}
        // />
    )
}