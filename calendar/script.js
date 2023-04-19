const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeid = urlParams.get('id')
    let datesent = {
        "year": currYear,
        "month": currMonth + 1,
        "home": homeid
    }
    if (token != null) {
        $.ajax({
            headers: {
                "Authorization": "Bearer" + token
            },
            contentType: "application/json",
            method: "GET",
            url: "http://localhost:8080/homeday",
            data: datesent,
            success: function (data) {
                console.log(data)
                for (let i = firstDayofMonth; i > 0; i--) {
                    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
                }
                for (let i = 1; i <= lastDateofMonth; i++) {
                    console.log(date.getDate(), new Date().getMonth(), new Date().getFullYear())
                    let status;
                    for (let j = 0; j < data.length; j++) {
                        let s = data[j].day.substring(8, 10);
                        if (s == i) {
                            if (data[j].status.name === "ORDERED") status = "ordered";
                            else if (data[j].status.name === "FIXING") status = "fixing";
                            else status = "free"
                        }
                    }
                    liTag += `<li class="${status}" onclick="changeStatus('${status}',${i})">${i}</li>`;
                }

                for (let i = lastDayofMonth; i < 6; i++) {
                    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
                }
                currentDate.innerText = `${months[currMonth]} ${currYear}`;
                daysTag.innerHTML = liTag;
            }
        })
    }
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

function changeStatus(status, day) {
    let input = prompt("Please enter status(ordered,fixing,free):", status)
    if (input !== "ordered" && input !== "fixing" && input !== "free") alert("wronginput")
    else {
        let token = JSON.parse(localStorage.getItem("token"));
        console.log(token)
        let url = window.location.search
        let urlParams = new URLSearchParams(url);
        let homeid = urlParams.get('id')
        let inputdate = new Date(currYear, currMonth + 1, day);
        let datesent = {
            "day": inputdate,
            "home": {
                "id":homeid
            },
            "status": {
                "name":input.toUpperCase()
            }
        }
        console.log(datesent)
        $.ajax({
            headers: {
                "Authorization": "Bearer" + token
            },
            contentType: "application/json",
            method: "PATCH",
            url: "http://localhost:8080/homeday",
            data: JSON.stringify(datesent),
            success:renderCalendar
        })
    }
}