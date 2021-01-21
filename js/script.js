/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


//global variables
const studentListUL = document.querySelector('ul.student-list')
const linkList = document.querySelector('ul.link-list')
const itemsPerPage = 9

//adding the search bar to html
const header = document.querySelector('header')
let searchBarHTML = `<label for="search" class="student-search">
                  <input id="search" placeholder="search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search Icon"></button>
                 </label> `
header.insertAdjacentHTML('beforeend', searchBarHTML)

//showPage function used to add list of students to page
function showPage(list, page) {
   const startIndex = (page - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   studentListUL.innerHTML =''
   let studentHTML

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentHTML = `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.title}. ${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
         studentListUL.insertAdjacentHTML('beforeend', studentHTML)
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let pages = Math.ceil(list.length / itemsPerPage)
   linkList.innerHTML = ''
   let buttons
   
   for (let i = 1; i <= pages; i++) {
      buttons = `
         <li>
            <button type="button">${i}</button>
         </li>`
      linkList.insertAdjacentHTML('beforeend', buttons)
      document.querySelector('li button').className = 'active'
   }

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = ''
         let pageNum = e.target.textContent
         e.target.className = 'active'
         showPage(list, pageNum)
      }
   })
}


// Call functions
showPage(data, 1)
addPagination(data)
