import React from 'react'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import type {MenuProps} from 'antd';
import {Button, Dropdown, Avatar, Space} from 'antd';
import Config from "./Config";
export default function Header() {
    const exit = () => {
        localStorage.removeItem('User')
        window.location.replace('/')
    }
    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <a href={'/UserPage/'+Config.User().id}>
                    <Button type="link" size={'large'}>
                        Мой профиль
                    </Button>
                </a>
            ),
        },
        {
            key: '1',
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
                    <img
                        alt=""
                        src="/LogoShark.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <Navbar.Brand>Shark</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem('User') !== null &&
                            <>

                                <Link to={':/user-request'}>
                                    <Button type="text" style={{color: "white"}}>
                                        пользователи
                                    </Button>
                                </Link>

                                <Link to={':/Equipments'}>
                                    <Button type="text" style={{color: "white"}}>
                                        Оборудование для дайвинга
                                    </Button>
                                </Link>

                                <Link to={':/Services'}>
                                    <Button type="text" style={{color: "white"}}>
                                       Услуги
                                    </Button>
                                </Link>
                                {Config.User().role_id === 1 &&
                                    <>


                                        <Link to={':/TheoreticalLessons'}>
                                            <Button type="text" style={{color: "white"}}>Управление Теор.занятиями</Button>
                                        </Link>

                                        {/*<Link to={':/stack'}>*/}
                                        {/*    <Button type="text" style={{color: "white"}}>*/}
                                        {/*        Управление технологиями*/}
                                        {/*    </Button>*/}
                                        {/*</Link>*/}
                                        {/*<Link to={':/partners'}>*/}
                                        {/*    <Button type="text" style={{color: "white"}}>*/}
                                        {/*        Управление партнерами*/}
                                        {/*    </Button>*/}
                                        {/*</Link>*/}

                                        <Link to={':/issue_a_certificate'}>
                                            <Button type="text" style={{color: "white"}}>
                                                Управление сертификатами
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
                                        <Avatar size={25} shape={'square'} style={{marginLeft: '10px'}}
                                                src={Config.adds() + Config.User().avatar}/>
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