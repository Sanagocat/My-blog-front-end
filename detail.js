const blogURL = CONFIG.BACKEND_URL;

const titleObject = document.getElementById("title");
const nameObject = document.getElementById("name");
const dateObject = document.getElementById("date");
const contentsObject = document.getElementById("contents");
const backbutton = document.getElementById("backButton");
backbutton.addEventListener('click', backToMainPage);
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");
editButton.addEventListener('click', editBlog);
deleteButton.addEventListener('click', deleteBlog);

// 페이지 로딩 시 블로그 상세내용을 불러옵니다.
window.onload = async function() {
 if(await checkAuthAndRedirect() == true){
    loadDetailPage();
  }
}


function backToMainPage() {
  window.location.href = 'index.html'
}

// /detail.html?blogid=26
async function loadDetailPage() {
  //1. get selected id
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogid");

  //2. query detail data from blodId
  const response = await fetch(blogURL + "/getdetailblog/" + blogId);
  const detailBlog = await response.json();

  //3. update html object values
  console.log(detailBlog.data.id);

  titleObject.value = detailBlog.data.title;
  nameObject.value = detailBlog.data.name;
  //nameObject.style.pointerEvents = 'none';
  contentsObject.value = detailBlog.data.contents;
  dateObject.value = detailBlog.data.date.split("T")[0];
  //dateObject.style.pointerEvents = 'none';
}

//make blog contents update!
async function editBlog() {
  console.log("edit Btn Pressed!");

  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogid");

  //1. make json body
  console.log(JSON.stringify({
    name: nameObject.value,
    title: titleObject.value,
    contents: contentsObject.value,
    date: dateObject.value,
    id: blogId
  }));

  //2. send to Update End Point
  const response = fetch(verifyURL + "/updateblog", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' // BODY에 JSON 데이터를 보내기 위해 헤더 설정
    },
    body: JSON.stringify({
      name: nameObject.value,
      title: titleObject.value,
      contents: contentsObject.value,
      date: dateObject.value,
      id: blogId
    })
  });

  const data = await response;
  console.log(data);

  window.location.href = 'complete.html';
}

async function deleteBlog() {
    console.log("delete button!!");
    //1. get selected id
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("blogid");
    console.log("삭제할 blogId:", blogId);

    //2. query detail data from blodId
    const response = await fetch(verifyURL + "/deleteblog/"+blogId, { method: "DELETE" });
    const deleteResult = await response.json();

    //3. console log
    console.log(deleteResult);

    window.location.href = 'complete.html';
}