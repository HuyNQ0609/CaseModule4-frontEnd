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
        url: "http://localhost:8080/homes/owner/" + homeid,
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
                        <h1 class="property-title pull-left"><input type="text" value="${data.name}">/h1>
                        <span class="property-price pull-right"><input type="text" value="${data.price}"></span>
                    </div>

                    <div class="property-meta entry-meta clearfix ">


                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info icon-area">
                                        <img src="assets/img/icon/room-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Area</span>
                                        <span class="property-info-value">3500<b
                                                class="property-info-unit">Sq Ft</b></span>
                                    </span>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-bed">
                                        <img src="assets/img/icon/bed-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Bedrooms</span>
                                        <span class="property-info-value">3</span>
                                    </span>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-bed">
                                        <img src="assets/img/icon/cars-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Car garages</span>
                                        <span class="property-info-value">1</span>
                                    </span>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-bath">
                                        <img src="assets/img/icon/os-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Bathrooms</span>
                                        <span class="property-info-value">3.5</span>
                                    </span>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-garage">
                                        <img src="assets/img/icon/room-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Garages</span>
                                        <span class="property-info-value">2</span>
                                    </span>
                        </div>

                        <div class="col-xs-6 col-sm-3 col-md-3 p-b-15">
                                    <span class="property-info-icon icon-garage">
                                        <img src="assets/img/icon/shawer-orange.png">
                                    </span>
                            <span class="property-info-entry">
                                        <span class="property-info-label">Garages</span>
                                        <span class="property-info-value">2</span>
                                    </span>
                        </div>


                    </div>
                    <!-- .property-meta -->

                    <div class="section">
                        <h4 class="s-property-title">Description</h4>
                        <div class="s-property-content">
                            <p>Nulla quis dapibus nisl. Suspendisse ultricies Nulla quis dapibus nisl. Suspendisse
                                ultricies commodo arcu nec pretium. Nullam sed arcu ultricies commodo arcu nec pretium.
                                Nullam sed arcu ultricies Nulla quis dapibus nisl. Suspendisse ultricies commodo arcu
                                nec pretium. Nullam sed arcu ultricies Nulla quis dapibus nisl. Suspendisse ultricies
                                commodo arcu nec pretium. Nullam sed arcu ultricies </p>
                        </div>
                    </div>
                    <!-- End description area  -->

                    <div class="section property-share">
                        <h4 class="s-property-title">Share width your friends </h4>
                        <div class="roperty-social">
                            <ul>
                                <li><a title="Share this on dribbble " href="#"><img
                                        src="assets/img/social_big/dribbble_grey.png"></a></li>
                                <li><a title="Share this on facebok " href="#"><img
                                        src="assets/img/social_big/facebook_grey.png"></a></li>
                                <li><a title="Share this on delicious " href="#"><img
                                        src="assets/img/social_big/delicious_grey.png"></a></li>
                                <li><a title="Share this on tumblr " href="#"><img
                                        src="assets/img/social_big/tumblr_grey.png"></a></li>
                                <li><a title="Share this on digg " href="#"><img
                                        src="assets/img/social_big/digg_grey.png"></a></li>
                                <li><a title="Share this on twitter " href="#"><img
                                        src="assets/img/social_big/twitter_grey.png"></a></li>
                                <li><a title="Share this on linkedin " href="#"><img
                                        src="assets/img/social_big/linkedin_grey.png"></a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>`
        }
    })
}