function showListHouseOfFormOwner() {
    let add = document.getElementById("addressSearch").value
    let minPrice = document.getElementById("minPriceOwner").value
    let maxPrice = document.getElementById("maxPriceOwner").value
    let minBed = document.getElementById("minbedOwner").value
    let maxBed = document.getElementById("maxbedOwner").value
    let minBath = document.getElementById("minbathOwner").value
    let maxBath = document.getElementById("maxbathOwner").value
    let minDate = document.getElementById("mindateOwner").value
    let maxDate = document.getElementById("maxdateOwner").value
    let formOwner = {
        minNumberOfBathroom: minBath,
        maxNumberOfBathroom: maxBath,
        minNumberOfBedroom: minBed,
        maxNumberOfBedroom: maxBed,
        address: add,
        priceMin: minPrice,
        priceMax: maxPrice,
        minDate: minDate,
        maxDate: maxDate
    }
    console.log(formOwner)
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/homes/search",
        data: formOwner,
        // processing when calling data successfully
        success: function (data) {
            console.log(data);
            // redraw the board
            let content = ""
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].pictures[0])
                content += `<div class="col-sm-6 col-md-4 p0">
                                <div class="box-two proerty-item">
                                    <div class="item-thumb">`

                if (data[i].pictures.length > 0)
                    content += `<a href="ownerHomeDetail.html?id=${data[i].id}"><img src="${data[i].pictures[0].src}"></a>`
                else content += `<a href="ownerHomeDetail.html?id=${data[i].id}"><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Queen_Boudica_by_John_Opie.jpg"></a>`

                content += `</div>
                                    <div class="item-entry overflow">
                                        <h5><a href="ownerHomeDetail.html?id=${data[i].id}">${data[i].name}</a></h5>
                                        <div class="dot-hr"></div>`
                if (data[i].types.length > 0)
                    content += `
                                        <span class="pull-left"><b>Home type: </b><br>${data[i].types[0].name}</span>
                                        `
                content += `
                                        <span class="proerty-price pull-right">${data[i].price} VND</span>
                                        <p style="display: none;">${data[i].description}</p>
                                        <div class="property-icon">
                                            <img src="assets/img/icon/bed.png" alt="">${data[i].numberOfBathroom}|
                                            <img src="assets/img/icon/shawer.png" alt="">${data[i].numberOfBedroom}
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            document.getElementById('listHomeOwner').innerHTML = content;
        }
    });
}

showListHouseOfFormOwner();

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
            for (let i = 0; i < result.length; i++) {
                content += `<li>
                                    <div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0">
                                        <a href="../showHomeDetailUser.html?id=${result[i].id}}"><img src="${result[i].pictures[0].src?result[i].pictures[0].src:'https://antimatter.vn/wp-content/uploads/2022/10/hinh-anh-thi-nhung.jpg'}" alt="..."></a>
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
