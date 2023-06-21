import React from 'react'
import '../styles/Dashboard.scss'
import Card from '../components/Dashboard/Card'
import GraphsTotal from '../components/Dashboard/GraphsTotal'
import GraphsSalesDay from '../components/Dashboard/GraphsSalesDay'
import OrdersTable from '../components/Dashboard/OrdersTable'
function Dashboard() {
  return (
    <div className='main-dashbord'>
        <div className='container-card'>
            <Card/>
            <div className='container-graphs'>
                <div className='sub-container-graphs'>
                    <GraphsSalesDay/>

                </div>
                <div className='sub-container-graphs'>
                    <GraphsTotal/>
                </div>
            </div>
            <OrdersTable/>


        </div>
    </div>
  )
}

export default Dashboard