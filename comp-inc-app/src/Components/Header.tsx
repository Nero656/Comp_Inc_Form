import React from 'react'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import type {MenuProps} from 'antd';
import {Button, Dropdown, Avatar, Space} from 'antd';
import Config from "./Config";
import {UserOutlined} from "@ant-design/icons";
export default function Header() {
    const exit = () => {
        localStorage.removeItem('User')
        window.location.replace('/')
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={'/RequestList/user/'+Config.User().id}>
                    <Button type="link" size={'large'}>
                        Список заявок
                    </Button>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Button type="link" danger size={'large'} onClick={exit}>
                    Выйти
                </Button>
            ),
        }
    ]
    return (
        <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" className={'header'} style={{position: 'fixed'}}>
            <Container>
                <Link style={{textDecoration: 'none'}} to={'/'}>
                    <Navbar.Brand>Comp_Inc</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem('User') !== null &&
                            <>
                                <Link to={':/Request'}>
                                    <Button type="text" style={{color: "white"}}>
                                        падать заявку
                                    </Button>
                                </Link>

                                {Config.User().role_id === 1 &&
                                    <>
                                        <Link to={':/service'}>
                                            <Button type="text" style={{color: "white"}}>Управление сервисами</Button>
                                        </Link>
                                        <Link to={':/stack'}>
                                            <Button type="text" style={{color: "white"}}>
                                                Управление технологиями
                                            </Button>
                                        </Link>
                                        <Link to={':/partners'}>
                                            <Button type="text" style={{color: "white"}}>
                                                Управление партнерами
                                            </Button>
                                        </Link>
                                        <Link to={':/user-request'}>
                                            <Button type="text" style={{color: "white"}}>
                                                Список заявок пользователей
                                            </Button>
                                        </Link>
                                    </>
                                }
                            </>
                        }
                    </Nav>
                    {localStorage.getItem('User') !== null &&
                        <Nav>
                            <Dropdown menu={{items}}>
                                <a href='' onClick={(e) => e.preventDefault()}
                                   style={{color: "white", cursor: "pointer"}}>
                                    <Space>
                                        {Config.User().name}
                                        {Config.User().avatar != null &&
                                            <Avatar size={25} style={{marginLeft: '10px'}}
                                                    src={Config.adds() + Config.User().avatar}/>
                                        }
                                        {Config.User().avatar === null &&
                                            <Avatar size={25} style={{marginLeft: '10px'}}
                                                    icon={<UserOutlined size={35}/>}/>
                                        }
                                    </Space>
                                </a>
                            </Dropdown>
                        </Nav>
                    }
                    {localStorage.getItem('User') === null &&
                        <Nav>
                            <Link to={':/Auth'}>
                                <Button type="text" style={{color: "white"}}>Войти</Button>
                            </Link>
                            <Link to={':/Reg'}>
                                <Button type="text" style={{color: "white"}}>Зарегистрироваться</Button>
                            </Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}