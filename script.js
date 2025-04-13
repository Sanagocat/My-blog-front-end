//1. write blog page - html+js (write.html+write.js) - DONE
//2. load blog list - index.html +script.js : query blog list - DONE
//2.1. make time desc (DB) - write/load
//2.2. make blog list looks better - style.css with chatGPT

//3. make display detailed Blog contents page - detail.html+detail.js
//4. link blog list to detail page - <a href="link?id=${blogList.id}"> </a>
//5. make detail page looks better - detail.css +chatGPT
//6. req.query.id -> req.params.id (/?id=10 -> /:id)

//@detail blog page,
//7. make UPDATE BLOG function
// -0. make plan : FRONT - BACKEND - DB
// -1. make endPoint URL @backend
// -2. make FRONTEND function - button / request to backend
// -3. make BACKEND function - endPoint / function / control DB
//8. make DELETE BLOG function
//same as UPDATE Process

//2025.03.16
//1. page indexing - 10 blog list per page
//2. login page - DB
//3. log in : /login - always login

//2025.03.23
//3. login page - frontend
//4. login endpoint - backend
//5. link front login data to backend
//6. new account (register) endpoint - backend
//7. link front register data to backend
//8. login verification @every page - always check login

//2025.04.05
//9. password 암호화 : await bcrypt.compare(userPassword, user.userpassword);
//10. JWT : get token : /verifytoken - use token
//11. jwt verification @every page - always check jwt
//12. MAIN PAGE IMAGE setup - google image gen AI

// deploy service
//1. git upload
//2. HEROKU setup - backend
//3. VERCEL setup - frontend
//4. URL Setup - buy URL 


const postBlogButton = document.getElementById('postBlog');
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageNumber = document.getElementById("page");
let currentPageNumber = 1;
let currentPostSize = 10;

prevButton.addEventListener("click", prevPage);
nextButton.addEventListener("click", nextPage);

postBlogButton.addEventListener("click", postBlogFunction);
const blogURL = CONFIG.BACKEND_URL;

// 페이지 로딩 시 Check Auth & 블로그 포스트 목록을 불러옵니다.
window.onload = async function() {
 if(await checkAuthAndRedirect() == true){
    pageNumber.textContent = currentPageNumber;
    loadPostList();
  }
}

async function postBlogFunction() {
  console.log("Post blog button pressed");
  window.location.href = 'write.html'; // write.html 페이지로 이동
}

//load post list
// getpostlist?limit=10&page=2
async function loadPostList() {
  const limit=10;
  const page = currentPageNumber;
  const response = await fetch(blogURL + "/getpostlist?limit="+ limit+"&page="+page); 
  const data = await response.json();
  const postList = data.posts;

  const postListDiv = document.getElementById("posts-container");
  postListDiv.innerHTML = "";
  currentPostSize = postList.length; //remember current post size

  if(currentPostSize < 10){
    nextButton.disabled = true;
  }
  else{
    nextButton.disabled = false;
  }
  
  for (let i = 0; i < postList.length; i++) {
    console.log(postList[i]);
    const tempPostDiv = document.createElement("div");
    tempPostDiv.innerHTML = `
      <div class="post">
        <div class="date">${postList[i].date.split('T')[0]}</div>
        <div class="title">
          <a href="detail.html?blogid=${postList[i].id}" > ${postList[i].title}</a>
        </div>
        <div class="name">${postList[i].name}</div>
      </div>
    `;
    postListDiv.appendChild(tempPostDiv);
  }
}


function nextPage() {
  if(currentPostSize < 10){
    console.log("last page...")
    return;
  }  
  else{
    currentPageNumber = currentPageNumber+1;
    pageNumber.textContent = currentPageNumber;  
    loadPostList();
  }
}

function prevPage() {
  currentPageNumber = currentPageNumber-1;
  if (currentPageNumber<1) {
    currentPageNumber = 1;
  }
  
  pageNumber.textContent = currentPageNumber;
  loadPostList();
}

