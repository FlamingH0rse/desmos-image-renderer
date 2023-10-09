import express from 'express'
const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static('frontend'))
app.use(express.static('frontend/styles'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).sendFile(`${__dirname}/frontend/index.html`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})