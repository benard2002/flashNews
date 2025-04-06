import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();
const API_KEY = process.env.API_KEY; //NEWS API

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const API_URL = "https://newsapi.org/v2/top-headlines"
// https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=896202d1a9ea47f4ae2f486c322596c7
// const SourceParams = {
//   sources : "bbc-news",
  
// }


let category = 'general';
const headers = {
  'Authorization': `Bearer ${API_KEY}`
}
// console.log(response.data);
async function fetchNews() {
  const categoryParams = {
    category : category,
    pageSize : 12,
  }
  try {
    const response = await axios.get(API_URL,{
      headers : headers,
      params : categoryParams,
    });
    const news = response.data.articles;
    return news;
    
  } catch (error) {
    console.log("error");
  }
}

let news = [];

app.get('/', async(req, res)=>{
  console.log(category, 'insideeewewwe')
  if (news.length === 0){

    news = await fetchNews();
  }
  // console.log(news);
  res.render('index.ejs', {news});
})

app.get('/getCat', async (req, res)=>{
  category = req.query.category;
  news = await fetchNews();
  // console.log(category);
  // console.log(news, ' asdsdfasdf sdf sdf ')

  res.redirect('/');
  
});


app.get("/news", (req, res)=>{
  const title = req.query.title;
  const data = news.find(n => n.title == title);
  console.log(data, 'dsfsdfs');

  res.render("news.ejs", {data});

});


app.get('/about', (req, res)=>{


  res.render("about.ejs");


});
app.get("/contact", (req, res)=>{

  res.render('contact.ejs');
})

app.listen(port, ()=>{

  console.log(`Server running on port ${port}`);
})


// Error handling for lost connectivity, no news to display