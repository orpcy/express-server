import express from 'express';
import bodyParser from 'body-parser';
import data from './data.json';
import fs from 'fs';

//setting const app
const app = express();
//setting app to use body-parser
app.use(bodyParser.json());

//home url
app.get('/', (req, res) => {
  res.send('Testing microphone!');
});

//url to create data
app.post('/data', (req, res) => {
  const dataItems = {
    id: data.length +1,
    name: req.body.name,
    email: req.body.email
  }

  data.push(dataItems);

  fs.writeFile('data.json', JSON.stringify(dataItems, null, 2), (err) => {
    if(err){
      res.send(err);
    }else{
      res.send(dataItems);
    }
  })

});

//url to get all data
app.get('/data', (req, res) => {
  res.status(201).send(data);
})

app.listen(5402, () => {
  console.log('lsitening on port 5402');
});

