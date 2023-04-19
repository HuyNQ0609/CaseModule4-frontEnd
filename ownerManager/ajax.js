function showHomeDetail(){
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)

    $.ajax({
        headers: {
            "Authorization": "Bearer" + token
        },
        contentType: "application/json",
        method: "GET",
        url: "http://localhost:8080/homeday",
        success:renderCalendar
    })
}