const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories =>{
    const categoryContainer = document.getElementById('category-containerr');
    categories.forEach(category => {
        const newlist = document.createElement('li');
        newlist.classList.add('mx-auto')
        newlist.innerHTML =`
        <p onclick="loadNews('${category.category_id}')">${category.category_name}<p>
        `
        categoryContainer.appendChild(newlist);
    });
    
}
// load news
const loadNews = (category_id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res =>res.json())
    .then(data => displayNews(data.data))
}

const displayNews = allnews =>{ 
    
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent= '';
   
    allnews.forEach(news =>{
      
        const newsData = document.createElement('div');
        newsData.innerHTML =`
        <div class="card mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="newsDetails('${news._id}')" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details.slice(0,120)}</p>
              <p class="card-text"><small class="text-muted">${news.author.name? news.author.name:'No Data'}</small></p>
            
            </div>
          </div>
        </div>
      </div>
        `
        newsContainer.appendChild(newsData);
    })
    
}
// modal functions
const newsDetails = news_id =>{
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}

const displayNewsDetails =  allDetails =>{
  console.log(allDetails);
  let modalTitle = document.getElementById('modal-title');
      modalTitle.innerText = allDetails.title;
  let modalText = document.getElementById('modal-text');
      modalText.innerText= allDetails.details;
  let modalAuthor = document.getElementById('modal-author');
      modalAuthor.innerText= allDetails.author.name? allDetails.author.name:'No Data found';
     
      
}


loadCategory()

