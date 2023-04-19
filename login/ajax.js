function showHomeDetail() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)

    let url = window.location.search
    let urlParams = new URLSearchParams(url);
    let homeid = urlParams.get('id')

    $.ajax({
        headers: {
            "Authorization": "Bearer" + token
        },
        contentType: "application/json",
        method: "GET",
        url: "http://localhost:8080/homes/home/owner/" + homeid,
        success(data) {
            console.log(data)
            let context = ` <div class="col-md-8 single-property-content prp-style-1 ">
                         <div class="row">
                <div class="light-slide-item">
                    <div class="clearfix">
                        <div class="favorite-and-print">
                            <a class="add-to-fav" href="#login-modal" data-toggle="modal">
                                <i class="fa fa-star-o"></i>
                            </a>
                            <a class="printer-icon " href="javascript:window.print()">
                                <i class="fa fa-print"></i>
                            </a>
                        </div>

                        <ul id="image-gallery" class="gallery list-unstyled cS-hidden">
                            <li data-thumb="assets/img/property-1/property1.jpg">
                                <img src="${data.pictures.src}"/>
                            </li>
                            <li data-thumb="assets/img/property-1/property2.jpg">
                                <img src="${data.pictures.src}"/>
                            </li>
                            <li data-thumb="assets/img/property-1/property3.jpg">
                                <img src="${data.pictures.src}"/>
                            </li>
                            <li data-thumb="assets/img/property-1/property4.jpg">
                                <img src="${data.pictures.src}"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="single-property-wrapper">
                <div class="single-property-header">
                    <h1 class="property-title pull-left"><input value="${data.name}"></h1>
                    <span class="property-price pull-right"><input value="${data.price}"></span>
                </div>

                <div class="property-meta entry-meta clearfix ">

                    <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-bed">
                                        <img src="assets/img/icon/bed-orange.png">
                                    </span>
                        <span class="property-info-entry">
                                        <span class="property-info-label">Bedrooms</span>
                                        <span class="property-info-value"><input type="text"
                                                                                 value="${data.numberOfBedroom}"></span>
                        </span>
                    </div>

                    <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-bath">
                                        <img src="assets/img/icon/shawer-orange.png">
                                    </span>
                        <span class="property-info-entry">
                                        <span class="property-info-label">Bathrooms</span>
                                        <span class="property-info-value"><input
                                                value="${data.numberOfBathroom}"></span>
                        </span>
                    </div>
                </div>
                <!-- .property-meta -->

                <div class="section">
                    <h4 class="s-property-title">Description</h4>
                    <div class="s-property-content">
                        <p><input value="${data.description}"></p>
                    </div>
                </div>
            </div>
            </div> 
            user-data
            <div class="col-md-4 p0">
                <aside class="sidebar sidebar-property blog-asside-right">
                    <div class="dealer-widget">
                        <div class="dealer-content">
                            <div class="inner-wrapper">

                                <div class="clear">
                                    <div class="col-xs-4 col-sm-4 dealer-face">
                                        <a href="">
                                            <img src="assets/img/client-face1.png" class="img-circle">
                                        </a>
                                    </div>
                                    <div class="col-xs-8 col-sm-8 ">
                                        <h3 class="dealer-name">
                                            <a href=""><input value="${data.getOwner().username}"></a>
                                           
                                        </h3>
                                        <div class="dealer-social-media">
                                            <a class="twitter" target="_blank" href="">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                            <a class="facebook" target="_blank" href="">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                            <a class="gplus" target="_blank" href="">
                                                <i class="fa fa-google-plus"></i>
                                            </a>
                                            <a class="linkedin" target="_blank" href="">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                            <a class="instagram" target="_blank" href="">
                                                <i class="fa fa-instagram"></i>
                                            </a>
                                        </div>

                                    </div>
                                </div>

                                <div class="clear">
                                    <ul class="dealer-contacts">
                                        <li><i class="pe-7s-map-marker strong"> </i><input value="${data.owner.address}"></li>
                                        <li><i class="pe-7s-mail strong"> </i><input value="${data.owner.email}"></li>
                                        <li><i class="pe-7s-call strong"> </i><input value="${data.owner.phone}"></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    
                </aside>
            </div>
`
            document.getElementById("view").innerHTML = context;
        }
    })
    event.preventDefault();
}
showHomeDetail()