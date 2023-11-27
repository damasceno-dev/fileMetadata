import cors from 'cors'
import express from 'express'
import multer from 'multer'

const app = express();
const upload = multer({dest: 'uploads/'})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//for getting values from form using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), (req,res) => {
  
  const file: Express.Multer.File | undefined = req.file
  console.log(file)
  
  if(!file) {
    return res.json('invalid file');
  }
  
  return res.json({name: file.originalname, type: file.mimetype, size: file.size})
})



const port = process.env.PORT || 3333;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
