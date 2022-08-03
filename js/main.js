let elMovieCardTemplate = document.querySelector("#movie__card").content;
let elCardWrapper = document.querySelector(".card__wrapper");
let elForm = document.querySelector(".form");
let elResult = document.querySelector(".result");
let elRatinginput = document.querySelector(".rating");
let elNameinput = document.querySelector(".name");
let elYearinput = document.querySelector(".year");
let elSelect = document.querySelector(".select");
let elSelectSort = document.querySelector(".movie_select");

// html dan jsga chaqirvomiz

console.log(elMovieCardTemplate);
let newMovies = movies.slice(0, 50);

// kinolani ovomiz



// newMovies.forEach(function (item) {
//     let newItem = {};

//     newItem.title = item.Title.toString();
//     newItem.movie_year = item.movie_year;
//     newItem.imdb_rating = item.imdb_rating;
//     newItem.categories = item.Categories.split("|");
//     newItem.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
//     newItem.video_url = `https://www.youtube.com/watch?v=${item.ytid}`;

//     normolizedAray.push(newItem);    
// })

// for each bilan array yasadik


let normolizedAray = newMovies.map(function(item){
    return {
        id: item.imdb_id,
        title: item.Title.toString(),
        movie_year: item.movie_year,
        imdb_rating: item.imdb_rating,
        categories: item.Categories.split("|"),
        summary: item.summary,
        img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        video_url: `https://www.youtube.com/watch?v=${item.ytid}`
    }
})

// kinoning arayidan ozimga kerak bogan array yasadik

function createCategories(array) {
    let CategoriesArray = []
    
    for (const item of array) {
        item.categories.forEach(function (item2) {
            if (!(CategoriesArray.includes(item2))) {
                CategoriesArray.push(item2)
            }
            
        })
        
    }
    return CategoriesArray
    
}
// bu funksiya categorylani uwavoliwimiz uchun kerak

let categoryList = createCategories(normolizedAray);



function renderCategory(array, wrapper) {
    
    let newFragment = document.createDocumentFragment()
    for (const item of array) {
        let newOption = document.createElement("option")
        
        newOption.textContent = item;
        
        newOption.value = item;
        
        newFragment.appendChild(newOption)
    }
    
    wrapper.appendChild(newFragment)
}
renderCategory(categoryList, elSelect)

// bu funcsiya orqali biz formni ichidagi selectga xama categoriyalani joyladik

function renderMovies(array) {
    
    elCardWrapper.innerHTML = null;
    
    elResult.textContent = array.length;
    
    let elFragment = document.createDocumentFragment();
    
    for (let item of array) {
        
        let movieCard = elMovieCardTemplate.cloneNode(true)
        
        movieCard.querySelector(".card-img-top").src = item.img;
        
        movieCard.querySelector(".card-heading").textContent = item.title;
        
        movieCard.querySelector(".card-year").textContent = item.movie_year;
        
        movieCard.querySelector(".card-rating").textContent = item.imdb_rating;
        
        movieCard.querySelector(".categories").textContent = item.categories;

        movieCard.querySelector(".moreinfo_btn").dataset.movieId = item.id;
        
        elFragment.appendChild(movieCard)
        
    }
    
    elCardWrapper.appendChild(elFragment)
    
}

// bu funcsiya orqali biz kinolani template orqali render qildik

renderMovies(normolizedAray);

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    let Ratinginputvalue = elRatinginput.value;
    
    let Yearinputvalue = elYearinput.value;
    
    let Selectvalue = elSelect.value;

    let SelectSortValue = elSelectSort.value;
    
    console.log(SelectSortValue);
    
    
    
    let filteredMovies = normolizedAray.filter(function (item) {
        
        let select = Selectvalue == "All"? true: item.categories.includes(Selectvalue);
        
        let validation = item.movie_year >= Yearinputvalue && item.imdb_rating >= Ratinginputvalue && select
        return validation;
    });
    
    filteredMovies.sort((a, b) =>{
        if (SelectSortValue == "rating-high-low") {
            return b.imdb_rating - a.imdb_rating
        }
        if (SelectSortValue == "rating-low-high") {
            return a.imdb_rating - b.imdb_rating
        }
        if (SelectSortValue == "year-high-low") {
            return a.movie_year - b.movie_year
        }
        if (SelectSortValue == "year-low-high") {
            return b.movie_year - a.movie_year
        }
    })
    
    
    renderMovies(filteredMovies)
    
    
});

// bu yerda form ni ewitib imdb_rating, movie_year va categoriesni inputlaga uladik

elCardWrapper.addEventListener("click", function (evt) {
    let movieId = evt.target.dataset.movieId

    modal(normolizedAray, evt.target.dataset.movieId)
})

function modal(array, id) {
    
 let foundMOviebyId = array.find(function(item) {
        return item.id == id
    });

    staticBackdropLabel.textContent = foundMOviebyId.title;

    modal_body.textContent = foundMOviebyId.summary;
}

// bu funcsiyada modal ni title yani ismi bilan summary yani kino haqida qisqacha malumotni togirladik






