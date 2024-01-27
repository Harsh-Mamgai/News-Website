const URL = "./news.json";
window.addEventListener("load", ()=>{
    fetchNews();
}); 
async function fetchNews(){
    const res = await fetch(URL);
    const data = await res.json();//array of objects
    bindData(data);
}
function bindData(data){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    data.forEach(article => {
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