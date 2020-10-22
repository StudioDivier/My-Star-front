import React, {useState} from "react";
import './account-page.scss'

export const AccountPage = () => {

  const [open, isOpen] = useState(false)

  return (
    <section className="account-page">
      <div className="container account-page__my-data">
        <h3>Мои данные</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="list-item__title">
              <span>Имя пользователя</span>
            </div>
            <div className="list-item_content">
              <input type="text" className="form-control" value="Аня Семенович"/>
            </div>
          </li>
          <li className="list-group-item">
            <div className="list-item__title">
              <span>Телефон</span>
            </div>
            <div className="list-item_content">
              <input type="text" className="form-control" value="8 999 123 45 67"/>
            </div>
          </li>
          <li className="list-group-item">
            <div className="list-item__title">
              <span>Email</span>
            </div>
            <div className="list-item_content">
              <input type="text" className="form-control" value="anya@siski.com"/>
            </div>
          </li>
          <li className="list-group-item">
            <div className="list-item__title">
              <span>Пароль</span>
            </div>
            <div className="list-item_content">
              <input type="text" className="form-control" value="AhtycbcLhtqr1596"/>
            </div>
          </li>
        </ul>
      </div>
      <div className="container account-page__orders">
        <h3>История заявок</h3>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">От кого</th>
            <th scope="col">Время</th>
            <th scope="col">Дата</th>
            <th scope="col">Статус</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>Володя Бродяга</th>
            <td>16:42</td>
            <td>11.10.2020</td>
            <td className="order-status-new">Новая</td>
          </tr>
          <tr>
            <th>
              <button className="btn btn-look">Посмотреть</button>
            </th>
            <td/>
            <td/>
            <td>
              <button className="btn btn-decline">Отклонить</button>
            </td>
          </tr>

          <tr>
            <th>Анатолий Базука</th>
            <td>16:42</td>
            <td>11.10.2020</td>
            <td className="order-status-make">Ожидает исполнения</td>
          </tr>
          <tr>
            <th>
              <button className="btn btn-look">Посмотреть</button>
            </th>
            <td/>
            <td/>
            <td>
              <button className="btn btn-decline">Отклонить</button>
            </td>
          </tr>

          <tr>
            <th>Вася Пихарь</th>
            <td>16:42</td>
            <td>11.10.2020</td>
            <td className="order-status-pay">Ожидает оплаты</td>
          </tr>
          <tr>
            <th>
              <button className="btn btn-look">Посмотреть</button>
            </th>
            <td/>
            <td/>
            <td>
              <button className="btn btn-decline">Отклонить</button>
            </td>
          </tr>

          <tr>
            <th>Сема Сидел</th>
            <td>16:42</td>
            <td>11.10.2020</td>
            <td className="order-status-done">Завершена</td>
          </tr>
          <tr>
            <th>
              <button className="btn btn-look">Посмотреть</button>
            </th>
            <td/>
            <td/>
            <td>
              <button className="btn btn-decline">Отклонить</button>
            </td>
          </tr>

          <tr>
            <th>Фурион Магмусов</th>
            <td>16:42</td>
            <td>11.10.2020</td>
            <td className="order-status-decline">Отклонена</td>
          </tr>
          <tr>
            <th>
              <button className="btn btn-look">Посмотреть</button>
            </th>
            <td/>
            <td/>
            <td>
              <button className="btn btn-decline">Отклонить</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}