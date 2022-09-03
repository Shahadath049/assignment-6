const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories =>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('news-type')
        newDiv.innerHTML =`
            <p onclick="loadNews()">${category.category_name}<p>
        `
        categoryContainer.appendChild(newDiv);
    });
    
}

const loadNews = () =>{
    fetch('https://openapi.programming-hero.com/api/news/category/01')
    .then(res =>res.json())
    .then(data => console.log(data.data))
}

const displayNews = allnews =>{
    const newsContainer = document.getElementById('news-container');
    allnews.forEach(news =>{
        newsContainer.innerHTML =`
        <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
        `
    })
    
}





loadCategory()
