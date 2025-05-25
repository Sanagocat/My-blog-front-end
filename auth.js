// auth.js
const verifyURL = "https://anonymous-portal-back-end-8f41d2684ed2.herokuapp.com";

async function checkAuthAndRedirect() {
    //1. load token
    const token = getCookie("myblogtoken");
    console.log(token);
    if (token == "") {
        console.log("NULL!!");
        redirectToLogin();
        return false;
    }

    //2. send token to "/me" end point
    const res = await fetch(verifyURL + "/me", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    //3. if token is NOT valid
    if (!res.ok) {
        //redirect to login page
        redirectToLogin();
        return false;
    }

    //4. valid user token
    const user = await res.json();
    console.log("인증된 사용자:", user.username);
    //alert("인증된 사용자!");
    return true;
}

function redirectToLogin() {
    alert("로그인이 필요합니다.");
    window.location.href = "https://www.anonymousportal.com/login.html";
}
// 쿠키 가져오기 함수
function getCookie(key) { //mainURL은 현재 접속중인 URL만 가져옴
    const name = encodeURIComponent(key) + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    console.log(cookies);
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}
