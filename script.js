const articles = document.getElementById('articles');
console.log(articles)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let stories = [];

function getTopStories() {
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=K8AbajbHMXQSYXXzYWY6MPct72Cd13Xl')
    .then(promise=>promise.json())
    .then(function(data){
        const article = data.results;
        console.log(article);
        // const arr = article.results;
        // console.log(arr);
        // console.log(article.splice(0,3));
        let i = 0;
        article.splice(0, 3).forEach(item => {
            stories.push(item);
            let date = item.updated_date.slice(8, 10) + " " + months[+item.updated_date.slice(5, 7) - 1];
            stories[i].updated_date = date;
            let author = item.byline.slice(0, item.byline.indexOf(','));
            articles.innerHTML += `
                        <div class="article" id="${i++}">
                            <div class="left">
                                <div class="top">
                                    <div class="info-top">
                                        <img src="Img.png" alt="">
                                        <div class="inter500">${author}</div>
                                        <div class="inter500-grey">in</div>
                                        <div class="inter500">${item.des_facet[0]}</div> 
                                        <div class="inter500">·</div>
                                        <div class="inter500-grey">${date}</div>
                                    </div>
                                    <div class="text">
                                        <div class="inter700">${item.title}</div>
                                        <div class="inter400">${item.abstract}</div>
                                    </div>
                                </div>
                                
                                <div class="info-bottom">
                                    <div class="info">
                                        <button class="button inter500">${item.section.charAt(0).toUpperCase() + item.section.slice(1)}</button>
                                        <p class="inter500-grey">${Math.floor(Math.random() * (15 - 5 + 1) + 5)} min read</p> 
                                        <p class="inter500">·</p>
                                        <p class="inter500-grey">Selected for you</p>
                                    </div>
                                    <div class="actions">
                                        <img src="like.png" alt="Icon.png">
                                        <img src="bookmark-white.png" alt="Icon.png">
                                        <img src="share.png" alt="Icon.png">
                                    </div>
                                </div>
                            </div>
                            <img src="${item.multimedia[0].url}" alt="" class="article-pic">
            `;
        });
    })
    .then(function addEvent () {
        console.log(stories)
        for (let i = 0; i < stories.length; i++) {
            let id = document.getElementById(`${i}`);
                console.log(id);
                id.addEventListener("click", () => {
                    window.location.href = `openedArticle.html?author=${stories[i].byline}&date=${stories[i].updated_date}&title=${stories[i].title}&text=${stories[i].abstract}&img=${stories[i].multimedia[0].url}`;
                });
        }
    })
}

getTopStories();

// console.log(stories);