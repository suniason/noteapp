import React from 'react'
import Legends from '../components/legends'

const Legend: React.FC = () => {
  return (
    <div className='w-full bg-white p-10'>
      <b>Legend:</b>
      <div className='grid grid-cols-5 py-2'>
        <Legends color='darkred' barangay='Manipis' />
        <Legends color='red' barangay='Pal-ew' />
        <Legends color='brown' barangay='Luca' />
        <Legends color='orange' barangay='San Isidro' />
        <Legends color='lightorange' barangay='Santa Cruz Viejo' />
        <Legends color='yellow' barangay='Santa Cruz Nuevo' />
        <Legends color='lightyellow' barangay='Poblacion IV' />
      </div>
    </div>
  )
}

export default Legend
