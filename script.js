const API_KEY = "01dbe7450dee48c5980e5eca7e1fac16";//this api we get when our account is created on news api
const URL = "https://newsapi.org/v2/everything?q=";//in home page of newsapi scroll down. then there is api with get
//keyword copy that api upto q= after q= it mentions that on which topic we want news. also known as query.

window.addEventListener("load", ()=>{
    fetchNews("India");
}); 

function reload(){
    window.location.reload();//this function reloads the window
}

async function fetchNews(query){
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);//we wrote &apiKey= because see the place in news api site from where we have picked the 2nd api or URL. it also has &apiKey= after that.
    const data = await res.json();//extracts the json from data packet which has header and body.
    console.log(data.articles);
    bindData(data.articles);//passing array of objects
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(article.urlToImage == null){
            return;
        }
        else{
            const cardClone = newsCardTemplate.content.cloneNode(true);//this makes the clone of the full card 
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        }
    });
}
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}  ${date}`;

    /*firstElementChild is property that returns the first child element of the specified element*/
    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(query){
    fetchNews(query);
    const navItem = document.getElementById(query);
    //removing the class 'done' from the classes of the curSelectedNav element. if curSelectedNav is not null
    curSelectedNav?.classList.remove('done');
    curSelectedNav = navItem;
    //adding the class 'done' to the classes of the curSelectedNav element.
    curSelectedNav.classList.add('done');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(query == null){
        return;
    }
    fetchNews(query);
    if(curSelectedNav != null){
        curSelectedNav.classList.remove("done");
    }
    curSelectedNav = null;
})
