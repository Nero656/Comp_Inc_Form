import React, {useEffect, useState} from 'react'
import {Tabs} from "antd";
import SpinEl from "../../Components/SpinEl";
import Config from "../../Components/Config";
import EquipmentList from "./EquipmentList";

interface itemsType {
    id: number,
    name: string
}


export default function Main() {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [category, setCategory] = useState<itemsType[]>([]);


    useEffect(() => {
        fetch(Config.adds() + `/api/Category/`).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setCategory(data)
                    setIsLoaded(true)
                });
            }
        })
    }, [])


    if (error) {
        return <>Ошибка: {error}</>
    }
    if (!isLoaded) {
        return (<SpinEl/>)
    } else {
        return (
            <Tabs
                defaultActiveKey="1"
                tabPosition={'left'}
                size={"large"}
                className={'tabs'}
                items={category.map((item, i) => {
                    const id = String(i + 1)
                    return {
                        label: item.name,
                        key: id,
                        children: <EquipmentList id={item.id} name={item.name}/>
                    };
                })}
            />
        )
    }
}
