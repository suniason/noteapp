import app from './app'
import mongoose from 'mongoose'
import env from './util/validateEnv'

const port = env.PORT

mongoose
  .connect(env.MONGO_CONN)
  .then(() => {
    console.log(`Mongoose Connected`)
    app.listen(port, () => {
      console.log(`Server runnning on port ${port}`)
    })
  })
  .catch(console.error)
