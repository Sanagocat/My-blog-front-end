// auth.js
const verifyURL = "https://b82cdebd-d75f-4f5e-8101-d9c4e83017ec-00-50jb4toe0nbv.worf.replit.dev:8080";

async function checkAuthAndRedirect() {
    //1. load token
    const token = localStorage.getItem("myblogtoken");
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
    window.location.href = "/login.html";
}