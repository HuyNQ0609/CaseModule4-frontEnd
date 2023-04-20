function inputDate() {
    let context = document.getElementById("inputdate").innerHTML;
    context += `                                <div id="inputdate">
                                    <div class="form-group">
                                        <label>Date <small>(required)</small></label>
                                        <input name="orderDate" type="date" class="form-control">
                                    </div></div>`
    document.getElementById("inputdate").innerHTML = context;
    event.preventDefault()
}

function arrayHomeDay() {
    var input = document.getElementsByName('orderDate');
    var arr = [];
    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeid = urlParams.get('id')
    for (let i = 0; i < input.length; i++) {
        arr[i] = {
            "day": input[i].value,
            "status":{
                "id":1,
                "name":"FREE"
            },
            "home":{
                "id":homeid
            }
        }
    }
    return arr;

}


function addNewOrder() {
    let token = JSON.parse(localStorage.getItem("token"));
    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeid = urlParams.get('id')
    let newOrder = {
        "homeDays": arrayHomeDay(),
        "home":{
            "id":homeid
        }
    };

    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + token
        },
        type: "POST",
        data: JSON.stringify(newOrder),
        url: "http://localhost:8080/order/create",
        success(data) {
            console.log(data)
            alert(data)
        },
        error(data){
            console.log(data)
            alert(data)
        }
    })
}
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
