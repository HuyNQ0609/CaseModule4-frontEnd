function registerUser() {
    let fullname = $('#fullname').val();
    let signupLoginName = $('#signupLoginName').val();
    let password = $('#signupPassword').val();
    let rewritepassword = $('#rewritePassword').val()
    let role = $(".signuprole:checked").val();
    if (fullname === "" || signupLoginName === "" || password === "" || role === undefined) alert("fill the form before register")
    else if (fullname.length > 50 || fullname.length < 6) alert("fullname have 6 to 50 letters")
    else if (signupLoginName.length > 32 || signupLoginName.length < 6) alert("login name have 6 to 32 letters")
    else if (password.length > 8 || password.length < 6) alert("password have 6 to 8 letters")
    else if (password !== rewritepassword) alert("invalid rewritePassword")
    else {
        let user = {
            "fullName": fullname,
            "username": signupLoginName,
            "password": password,
            "roles": [role]
        }
        $.ajax({
            contentType: "application/json",
            method: "POST",
            url: "http://localhost:8080/api/signup",
            data: JSON.stringify(user),
            success: function (data) {
                console.log(data)
                alert(data.message)
            }
        })
    }
}

function login() {
    let username = $('#LoginName').val()
    let password = $('#password').val()
    if (username === "" || password === "") alert("fill username and password before login")
    else {
        let user = {
            username: username,
            password: password
        }
        $.ajax({
            contentType: "application/json",
            method: "POST",
            url: "http://localhost:8080/api/signin",
            data: JSON.stringify(user),
            success: function (data) {
                if (data === "InvalidUser") alert(data)
                else if (data === "InvalidPassword") alert(data)
                else {
                    let jwt = data.token;
                    localStorage.setItem("token", JSON.stringify(jwt))
                    if (data.roles[0].authority === "HOST") {
                        alert("HOST")
                        window.open("listHouseOwner.html")
                    }
                    else if (data.roles[0].authority === "USER") {
                        alert("USER")
                        window.open("listHouseUser.html")
                    }
                }
            }
        })
    }
}