function inputDate() {
    let context = document.getElementById("inputdate").innerHTML;
    context += `                                <div id="inputdate">
                                    <div class="form-group">
                                        <label>Date <small>(required)</small></label>
                                        <input name="date" type="date" class="form-control">
                                    </div></div>`
    document.getElementById("inputdate").innerHTML = context;
    event.preventDefault()
}

function arrayDate() {
    var input = document.getElementsByName('name');
    var value = [];
    for (let i = 0; i < input.length; i++) {
        value[i] = {
            "day": input[i].value
        }
    }
    return value;

}


function addNewOrder() {
    let token = JSON.parse(localStorage.getItem("token"));
    let status = {
        "id":1,
        "name":"FREE"
    }
    let newOrder = {
        date: arrayDate(),
        status: status
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + token
        },
        type: "POST",
        data: JSON.stringify(newOrder),
        url: "http://localhost:8080/order/create",
        success(data) {
            console.log(data)
        }
    })
}