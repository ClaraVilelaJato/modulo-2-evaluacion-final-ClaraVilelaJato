"use strict";const inputShow=document.querySelector(".js-searchinput"),searchButton=document.querySelector(".js-search-btn"),reset=document.querySelector(".reset__btn"),resultsContainer=document.querySelector(".js-list-results"),paintedFavs=document.querySelector(".js-favs");let apiDataShows=[],favorites=[];function setInLocalStorage(){const e=JSON.stringify(favorites);localStorage.setItem("favorites",e)}function fetchToApi(){let e=inputShow.value.toLocaleLowerCase();fetch("https://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{apiDataShows=e}),paintShows()}function getLocalStorage(){const e=localStorage.getItem("favorites");if(null===e)fetchToApi();else{const t=JSON.parse(e);favorites=t,paintFavs()}}function handleSearch(e){e.preventDefault(),fetchToApi()}function handleShows(e){const t=parseInt(e.currentTarget.id),s=apiDataShows.find(e=>e.show.id===t),a=favorites.findIndex(e=>e.show.id===t);-1===a?favorites.push(s):favorites.splice(a,1),console.log(favorites),paintShows(),paintFavs(),setInLocalStorage()}function listenShows(){const e=document.querySelectorAll(".js-picked");for(const t of e)t.addEventListener("click",handleShows)}function handleresetFavs(){favorites=[],paintedFavs.innerHTML="",localStorage.clear()}function paintShows(){let e="",t="";for(const s of apiDataShows){const a=s.show;t=isFavorite(a)?"js-selected-list":"";let o="";o=null===a.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":a.image.medium,e+=`<li id="${a.id}" class="serie__box js-picked ${t}">`,e+='<div class="border-show">',e+=`<img src="${o}" alt="${a.name}">`,e+=`<h3 class="serie__name">${a.name}</h3></li>`,e+="</div>"}resultsContainer.innerHTML=e,listenShows()}function paintFavs(){let e="";paintedFavs.innerHTML="";for(let t of favorites){const s=t.show;let a="";a=null===s.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":s.image.medium,e+=`<button value="x" class="close-fav">x</button><li id="${s.id}" class="fav__card">`,e+=`<img class="fav__image" src="${a}" alt="${s.name}">`,e+=`<h3 class="fav__name">${s.name}</h3></li>`}paintedFavs.innerHTML=e}function isFavorite(e){return void 0!==favorites.find(t=>t.show.id===e.id)}searchButton.addEventListener("click",handleSearch),getLocalStorage(),reset.addEventListener("click",handleresetFavs);