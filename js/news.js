const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => {
      console.log(error);
  })
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
    toogleSpinner(false); 
    // spinner off 
    
}
// load news
const loadNews = (category_id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res =>res.json())
    .then(data => displayNews(data.data))
    .catch(error => {
      console.log(error);
  })
}

const displayNews = allnews =>{ 
  
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent= '';

    // not found message 
    const message = document.getElementById('not-found');
    
    if(allnews.length === 0){
        message.classList.remove('d-none')
    }
    else{
      message.classList.add('d-none')
    }

    //some message found
    const newMessage= document.getElementById('found');
    newMessage.innerText = allnews.length + ' '+ 'Items found in this category';
    if(allnews.length >0){
      newMessage.classList.remove('d-none');
    }
    else{
      newMessage.classList.add('d-none')
    }
   
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
              <h5 class="card-title fs-5 fw-bold">${news.title}</h5>
              <p class="card-text text-secondary">${news.details.slice(0,180)}</p>
              
              
              <div class=" d-flex justify-content-between align-items-center" >
              <div class="d-flex justify-content-between align-items-center" style="width:200px;">
                <img src="${news.author.img}" class="img-responsive img-rounded m-5px" style="max-height: 45px; max-width: 45px; border:1px; border-radius:50%">
                <div >
                <p class="m-0 card-text"><small class="text-muted">${news.author.name? news.author.name:'Not Found'}</small></p>
                <p class="card-text"><small class="text-muted">${news.author.published_date}</small></p>
                </div>
              </div>
              <div>
              <i class="fa-regular fa-eye"></i> ${news.total_view? news.total_view :'No Views'}
              </div>

              </div>
            
            </div>
          </div>
        </div>
      </div>
        `
        newsContainer.appendChild(newsData);
    })
    toogleSpinner(false);
    
}
// modal functions
const newsDetails = news_id =>{
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(error => {
      throw(error);
  })
}

const displayNewsDetails =  allDetails =>{
  console.log(allDetails);
   let mosdalsBody = document.getElementById('modalbody');
   mosdalsBody.textContent ='';
  const newDivision = document.createElement('div');
  newDivision.innerHTML =`
  <img src="${allDetails.image_url}" class="img-fluid rounded-start" alt="...">
  `
  mosdalsBody.appendChild(newDivision);
  let modalTitle = document.getElementById('modal-title');
      modalTitle.innerText = allDetails.title;
  let modalText = document.getElementById('modal-text');
      modalText.innerText= allDetails.details;
  let modalAuthor = document.getElementById('modal-author');
      modalAuthor.innerText= allDetails.author.name? allDetails.author.name:'No Data found';


 

      
}
const toogleSpinner = isLoading =>{
  const loadSpinner = document.getElementById('loader')
  if(isLoading){
    loadSpinner.classList.remove('d-none');
  }
  else{
    loadSpinner.classList.add('d-none');
  }
}

loadCategory(loadNews())



