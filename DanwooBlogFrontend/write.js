const userTitle = document.getElementById('title');
const userDate = document.getElementById('date');
const userName = document.getElementById('name');
const userContents = document.getElementById('contents');
const postButton = document.getElementById('postButton');
const cancelButton = document.getElementById('cancelButton');
const blogURL = CONFIG.BACKEND_URL;

postButton.addEventListener('click', postBlogFunction); cancelButton.addEventListener('click', cancelFunction);

//as start page, set Today
userDate.value = getToday();

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function postBlogFunction() {
  console.log("post Btn Pressed!");

  console.log(JSON.stringify({
    name: userName.value,
    title: userTitle.value,
    contents: userContents.value,
    date: userDate.value
  }));

  const response = await fetch(blogURL + "/postblog", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // JSON 데이터를 보내기 위해 헤더 설정
    },
    body: JSON.stringify({
      name: userName.value,
      title: userTitle.value,
      contents: userContents.value,
      date: userDate.value
    })
  });
  
  const data = await response.json();
  console.log(data);
  window.location.href = 'complete.html';
}

function cancelFunction() {
  window.location.href = 'index.html'; // write.html 페이지로 이동
}

window.onload = async function() {
 await checkAuthAndRedirect();
}
  