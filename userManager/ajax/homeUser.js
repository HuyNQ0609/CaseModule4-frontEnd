function showListHouseOfFormUser() {
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/homes",
        // processing when calling data successfully
        success: function (foreseen) {
            console.log(foreseen);
            // redraw the board
            let content = ""
            for (let i = 0; i < foreseen.length; i++) {
                console.log(foreseen[i].pictures[0])
                content += `<div class="col-sm-6 col-md-4 p0">
                                <div class="box-two proerty-item">
                                    <div class="item-thumb">`

                if(foreseen[i].pictures.length > 0)
                content+=`<a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}"><img src="${foreseen[i].pictures[0].src}"></a>`
                else content+= `<a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}"><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Queen_Boudica_by_John_Opie.jpg"></a>`

                content+=`</div>
                                    <div class="item-entry overflow">
                                        <h5><a href="/ownerManager/homeDetail.html?id=${foreseen[i].id}">${foreseen[i].name}</a></h5>
                                        <div class="dot-hr"></div>
                                        <span class="pull-left"><b>Home type: </b>${foreseen[i].type}</span>
                                        <span class="proerty-price pull-right">${foreseen[i].price}</span>
                                        <p style="display: none;">${foreseen[i].description}</p>
                                        <div class="property-icon">
                                            <img src="assets/img/icon/bed.png" alt="">${foreseen[i].numberOfBathroom}|
                                            <img src="assets/img/icon/shawer.png" alt="">${foreseen[i].numberOfBedroom}
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            document.getElementById('list-type').innerHTML = content;
        }
    });
    event.preventDefault();
}
showListHouseOfFormUser();

function showTopRental() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    $.ajax({
        headers: {
            "Authorization": "Bearer" + token,
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/homes/showTopHome",
        type: "GET",
        dataType: "json",
        success: function (result) {
            let content = "";
            console.log(result)
            for (let i = 0; i < result.length-1 ; i++) {
                content += `<li>
                                    <div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
                                        <a href="../showHomeDetailUser.html?id=${result[i].id}}"><img src="../image/photo1.png" alt="..."></a>
                                    </div>
                                    <div class="col-md-8 col-sm-8 col-xs-8 blg-entry">
                                        <h6><a href="single.html">${result[i].name}</a></h6>
                                        <span class="property-price">${result[i].price}</span>
                                    </div>
                            </li>`
            }
            document.getElementById('topHomeRental').innerHTML = content
        },
        error: function (xhr, status, error) {
            console.error("Error: " + error);
        }
    });
}
showTopRental();