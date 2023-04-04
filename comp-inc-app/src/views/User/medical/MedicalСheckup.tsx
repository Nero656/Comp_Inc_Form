import React, {useState} from "react";
import Config from "../../../Components/Config";
import {Space, Card, Button, Form} from "antd"
import {useParams} from "react-router-dom";

export default function MedicalHeckup() {
    const {id} = useParams();

    const [status, setStatus] = useState(null);
    let [File, setFile] = useState<File>()

    function fileUpload(e: any) {
        setFile(e.target.files[0])
    }

    function healthCheck(e: { preventDefault: () => void; }) {
        const data: any = new FormData();
        data.append('user_id', id)
        data.append("file", File)
        data.append('access', status)
        e.preventDefault()

        fetch(Config.adds() + `/api/diving/permitList/`, {
            method: 'POST',
            body: data,
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status
                return Promise.reject(error);
            } else {
                window.location.replace('/Medical_examinations_list/user/' + id)
            }
        })
    }

    return (
        <Space direction="vertical">
            <Card title={'Медицинский осмотр в онлайн формате'} style={{width: '50em'}}>
                <Form
                    name="basic"
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Файл"
                        name="File"
                    >
                        <input type='file' onClick={fileUpload}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={healthCheck}>
                            Предоставить данные
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}
