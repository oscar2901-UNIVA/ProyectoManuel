import React from 'react'
import './Style/Card.scss'
function Card() {

 const infoCard = {
    openTable:5,
    closeTable:1,
    salesDay:1500,
    salesMounth:20000,
    meseros:4
 }


 /* 
 Dashboard
 3 cards (Mesas Abiertas/Cerradas, venta del dia, venta del mes, Meseros)
 grafica de promedio de ventas por mes */

  return (
    <div className='main-card-dashboard'> 
        <div className='card-dashboard'>
            <p className='title-card'>Mesas Abiertas</p>
            <p className='data-card'>{infoCard.openTable}</p>
            <p className='title-card'>Mesas Abiertas</p>
            <p className='data-card'>{infoCard.closeTable}</p>

        </div>
        <div className='card-dashboard'>
            <p className='title-card'>Venta del dia</p>
            <p className='data-card'>{(infoCard.salesDay).toLocaleString('es-MX', {style: 'currency',currency: 'MXN'})}</p>
            <p className='title-card'>Venta del mes</p>
            <p className='data-card'>{(infoCard.salesMounth).toLocaleString('es-MX', {style: 'currency',currency: 'MXN'})}</p>
        </div>
        <div className='card-dashboard'>
            <p className='title-card'>Meseros</p>
            <p className='data-card'>{infoCard.meseros}</p>

        </div>




    </div>
  )
}

export default Card