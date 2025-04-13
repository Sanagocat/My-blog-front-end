const userId = document.getElementById("userId");
const password = document.getElementById("password");
const username = document.getElementById("username");

const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const logoutButton = document.getElementById("logoutButton");
const blogURL = CONFIG.BACKEND_URL;

loginButton.addEventListener("click", loginFunction);
registerButton.addEventListener("click", registerFunction);
logoutButton.addEventListener("click", logoutFunction);

function logoutFunction(){
  localStorage.removeItem("myblogtoken");
  alert("LOG OUT!!");
}

async function loginFunction() {
  console.log("LoginButton pressed");

  const response = await fetch(blogURL + "/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // JSON 데이터를 보내기 위해 헤더 설정
    },
    body: JSON.stringify({
      userId: userId.value,
      password: password.value
    })
  });

  const data = await response.json();
  console.log(data);

  if (data.result == "success")//login sucess
  {
    //alert("LOGIN SUCESS!!");
    //save jwt token
    console.log(data.token);
    localStorage.setItem("myblogtoken", data.token);
    
    window.location.href = "index.html";
  }
  else //login fail
  {
    if (data.message == "UNKNOWN ID!!") //UNKNOWN ID
    {
      alert("LOGIN FAILED!! : UNKNOWN ID!!");
    }
    else if (data.message == "INCORRECT PASSWORD!!") {
      alert("LOGIN FAILED!! INCORRECT PASSWORD!!");
    }
  }
}

async function registerFunction() {
  console.log("RegisterButton pressed");

  const userIdValue = userId.value.replace(/\s/g, '');
  const userNameValue = username.value.replace(/\s/g, '');
  const passwordValue = password.value.replace(/\s/g, '');
  
  if(userIdValue == ""){
    alert("Please enter user ID");
    return;
  }  
  else if(passwordValue == ""){
    alert("Please enter password")
    return;
  }
  else if(userNameValue == ""){
    alert("Please enter username")
    return;
  }
  
  const response = await fetch(blogURL + "/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // JSON 데이터를 보내기 위해 헤더 설정
    },
    body: JSON.stringify({
      userId: userIdValue,
      password: passwordValue,
      username: userNameValue
    })
  });

  const data = await response.json();
  console.log(data);

  if(data.result == "fail"){
    alert("User register fail! :"+data.message);
  }
  else{
    alert("User register success!");
  }
}
