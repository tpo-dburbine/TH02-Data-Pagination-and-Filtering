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
//const headerHTML = document.querySelector('.header')
const studentListUL = document.querySelector('ul.student-list')
const linkList = document.querySelector('ul.link-list')
const itemsPerPage = 9
let activeButtonIndex = 0

//adding the search bar to html
const header = document.querySelector('header')
let searchBarHTML = `<label for="search" class="student-search">
                  <input id="search" placeholder="search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search Icon"></button>
                 </label> `
header.insertAdjacentHTML('beforeend', searchBarHTML)

//function to dynamically filter search results as user inputs characters
function filterSearch(list) {
   //initialize empty string
   let searchStudents = []
   //create var 'input' to select ID search
   const input = document.querySelector('#search').value.toLowerCase()

   //for loop to loop through data array
   for(let i = 0; i < list.length; i++) {
      //variable set to equal title, firstname, and lastname in data array
      let title = list[i].name.title
      let firstName = list[i].name.first
      let lastName = list[i].name.last
      //create string literal to combine variables and set equal to studentName var
      let studentName = `${title} ${firstName} ${lastName}`.toLowerCase()

      //conditional to check if full studentName var includes user input
      //push names that include user input from data array to empty SearchStudents array
      if(studentName.includes(input)) {
         searchStudents.push(list[i])
      } 
   //function calls to display page and add pagination
   showPage(searchStudents, 1)
   addPagination(searchStudents)
   }
}



//showPage function used to add list of students to page
function showPage(list, page) {
   const startIndex = (page - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   studentListUL.innerHTML =''
   let studentHTML

   //for loop to go through data array and nested conditional to display students within specified index range
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentHTML = 
            `<li class="student-item cf">
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
   //find number of pages needed
   let pages = Math.ceil(list.length / itemsPerPage)
   //set linklist to empty string
   linkList.innerHTML = ''
   //initialize buttons variable
   let buttons
   
   //loop similar to showPage to add buttons to HTML
   for (let i = 1; i <= pages; i++) {
      buttons = `
         <li>
            <button type="button">${i}</button>
         </li>`
      linkList.insertAdjacentHTML('beforeend', buttons)
   }
}

//-----------------------------------------------------------------------------

//event listener for 'keyup'
header.addEventListener('keyup', () => {
   filterSearch(data)
})

//event listener for clicking pagination buttons
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      let pageNum = e.target.textContent
      document.querySelectorAll('ul.link-list button')[activeButtonIndex].className = ''
      e.target.className = 'active'
      activeButtonIndex = pageNum - 1
      showPage(data, pageNum)
   }
})

// Call functions
showPage(data, 1)
addPagination(data)
filterSearch(data)
