const app = require('./app')
const config = require('./utils/config')
const { info, error} = require('./utils/logger')

app.listen(config.PORT,'0.0.0.0',() => {
    info('Server is runing on por:',config.PORT)
})






