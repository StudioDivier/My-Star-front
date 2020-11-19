import React from 'react';
import '../privacy-policy/privacy-policy.scss';
import {Container, Row, Col} from 'react-bootstrap'
import {Table} from 'react-bootstrap'

export const Requisites = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="policy-wrapper">

                        <h1>Реквизиты компании</h1>
                        <Table striped bordered style={{color: 'white'}}>
                            <tbody>
                            <tr>
                                <td>Название организации</td>
                                <td><strong>ООО «Экспромт»</strong></td>
                            </tr>
                            <tr>
                                <td>Название организации на английском языке</td>
                                <td>LLC«Exprome»</td>
                            </tr>
                            <tr>
                                <td>Дата создания</td>
                                <td>03.02.2020 г.</td>
                            </tr>
                            <tr>
                                <td>Генеральный директор</td>
                                <td>Кулиняк Антон Сергеевич</td>
                            </tr>
                            <tr>
                                <td>Главный бухгалтер</td>
                                <td>Кулиняк Антон Сергеевич</td>
                            </tr>
                            <tr>
                                <td>Телефон/факс, код города</td>
                                <td>+7(920) 173-00-00</td>
                            </tr>
                            <tr>
                                <td>Юридический адрес организации (обязательно указывать индекс)</td>
                                <td>РФ, 109507, г. Москва, Ферганский проезд,
                                    д.3, к.2
                                </td>
                            </tr>
                            <tr>
                                <td>Почтовый адрес организации</td>
                                <td>РФ, 109507, г. Москва, Ферганский проезд,
                                    д.3, к.2, кв. 266
                                </td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>info@exprome.ru</td>
                            </tr>
                            <tr>
                                <td>Сайт</td>
                                <td>Exprome.ru</td>
                            </tr>
                            <tr>
                                <td>ОГРН</td>
                                <td>1207700385375</td>
                            </tr>
                            <tr>
                                <td>ИНН</td>
                                <td>9721107395</td>
                            </tr>
                            <tr>
                                <td>КПП</td>
                                <td>772101001</td>
                            </tr>
                            <tr>
                                <td>Сфера деятельности</td>
                                <td>Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая </td>
                            </tr>
                            <tr>
                                <td>Банк, р/счет</td>
                                <td>40702810302500080214  ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"</td>
                            </tr>
                            <tr>
                                <td>К/с</td>
                                <td>30101810845250000999</td>
                            </tr>
                            <tr>
                                <td>БИК</td>
                                <td>044525999</td>
                            </tr>
                            <tr>
                                <td>ОКПО</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>ОКВЭД</td>
                                <td>62.09, 62.01, 62.03.19, 62.03.12, 62.03.11, 62.03.1, 62.03, 62.02.9, 62.02.3, 62.02.2, 62.02.1</td>
                            </tr>
                            <tr>
                                <td>Контактное лицо по организационным вопросам, должность</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Телефон контактного лица</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Уставный капитал</td>
                                <td>10 000</td>
                            </tr>

                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}