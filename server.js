const config = require('./config/dotenvConfig')
const app = require('./app')
const cors =require('cors')

const PORT = config.PORT
const HOST = config.HOST

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

app.listen(PORT,HOST,()=>{
    console.log(`Fut a szervó http:${HOST}:${PORT}`);
})