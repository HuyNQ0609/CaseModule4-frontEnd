let token = JSON.parse(localStorage.getItem("token"));
console.log(token)
$.ajax({
    headers: {
        "Authorization": "Bearer" + token
    },
    method: "GET",
    url: "http://localhost:8080/order/owner",
    success(data) {
        console.log(data)
        let str = `<tr>
                            <th>Month</th>
                            <th>Income</th>
                                </tr>`
        for (let i = 0; i < data.length; i++) {
            str += `<tr>
                        <td>${data[i].month}</td>
                        <td>${data[i].money}</td>
                      </tr>`
        }
        document.getElementById("monthIncome").innerHTML = str;
    }
})