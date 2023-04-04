import React, {useEffect, useState} from 'react'
import {List} from "antd";
import Config from "../../Components/Config";


interface GenericsExampleProps<T> {
    id: number
    name: string
}

interface gymInterface {
    name: string
}


export default function EquipmentList<T>({id, name}:GenericsExampleProps<T>) {
    let [equipList, setEquipList] = useState<gymInterface[]>()

    useEffect(() => {
        fetch(Config.adds() + `/api/equip/` + id).then(async response => {
            if (!response.ok) {
                const error = (response) || response
                return Promise.reject(error)
            } else {
                response.json().then(function (data) {
                    setEquipList(data)
                });
            }
        })
    }, [])




    return (
        <>
            <List
                style={{width: '95%'}}
                itemLayout="horizontal"
                dataSource={equipList}
                header={<div>Список оборудования</div>}
                bordered
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta title={item.name}/>
                    </List.Item>
                )}
            />

        </>
    );
}