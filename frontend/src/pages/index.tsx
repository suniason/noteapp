import Head from 'next/head'
import Legends from '../components/legends'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notes App | Homepage</title>
      </Head>
      <div className='text-white'>
        <div className='flex w-full min-h-[65vh] justify-center relative z-0'>
          <div className='max-h-full bg-[url("/homepage.svg")] bg-cover  bg-no-repeat w-full overflow-hidden opacity-30 z-0'></div>
          <div className='absolute inset-1/2 transform -translate-x-10 -translate-y-10'>
            <div className=' text-6xl z-50 font-semibold'>
              <span className='text-red-500'>Think.</span>
              <span className='text-blue-400'>Create.</span>
              <span className='text-yellow-300'>Save.</span>
            </div>
          </div>
        </div>
        <article className='flex w-full min-h-[35vh] justify-center'>
          <div className='w-[60%] m-10'>
            <div className='text-3xl font-semibold '>About</div>
            <div className='m-5 text-justify'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, eum? Hic unde facere
              est delectus placeat doloribus nobis molestias sequi officia velit dolorum ipsam, ipsa
              quos, corporis omnis natus ab dolores cupiditate quam voluptatum? Nemo reprehenderit
              culpa fugit? Ea libero fugiat placeat facilis quaerat expedita blanditiis tempore
              adipisci, nesciunt quo dignissimos asperiores veritatis ab vel ut cupiditate, ipsa
              qui, reiciendis corporis earum dolorum provident! Nesciunt perferendis nostrum ducimus
              id rem magni suscipit quas! Doloribus rem ex perspiciatis, cupiditate eos ea quia non
              architecto odit eius consequuntur quos esse eligendi autem placeat veniam adipisci.
              <br />
              <br />
              Eveniet vel illo dolorum, iusto commodi aliquid magnam pariatur dignissimos nemo eius
              tenetur dolorem reprehenderit repudiandae quisquam! Pariatur a eveniet eos soluta
              corrupti. Sit facere harum totam tempore enim, ratione dolor, natus sed vitae ea vel!
              Ullam ex voluptatibus explicabo molestias error quam nesciunt quaerat, eius fuga esse
              animi nostrum natus nobis ea, quae dolorem. Tenetur, non.
            </div>
          </div>
        </article>
        <footer className='flex w-full min-h-[20vh] bg-slate-950 items-center justify-center text-center'>
          <div className='w-[80%]'>
            <div>
              <i className='text-gray-500'>Personal Project:</i>
            </div>
            <div className='font-semibold'>Brett Josef C. Galvez</div>
            <div className='bg-white w-[100%] h-[1px] mb-2 mt-4' />
            <div className='text-[.9rem]'>@2023 | All Rights Reserved</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
