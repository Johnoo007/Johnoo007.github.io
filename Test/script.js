function change(param) {
  
  console.log("." + param.id);

  $(".big-content").css('display', 'none');
  $(".big-content-home").css('display', 'none');
  $(".information").css('display', 'none');

  if(param.id == "home"){
    $("#" + param.id + "-page").css('display', 'grid');
  }
  else{
    $("#" + param.id + "-page").css('display', 'grid');
  }

  $("#" + param.id + "-page").css('display', 'grid');
  $(".sidebar-item").removeClass("sidebar-item-active");
  $("#" + param.id).addClass("sidebar-item-active");
}

var product_com;

$(document).ready(() => {

  $.ajax({
    method: 'get',
    url: './api/getall.php',
    success: function (response) {
      console.log(response);

      if (response.Respcode == 200) {
        product_com = response.Result;

        var html = '';

        for (let i = 0; i < 15; i += 1) {
          html += `
                <div class="block ${product_com[i].type}" onclick="open_content()">
      
                  <div class="tag">${product_com[i].type}</div>
      
                  <div class="photo">
                    <img src="${product_com[i].img}" alt="">
                  </div>
                  <div class="info">
                    <div class="center-info">
                      <h3>${product_com[i].title}</h3>
                      <p>${product_com[i].description} </p>
                    </div>
                  </div>
                  <div class="footer">
                    <div class="ft-l">
                      <div class="ft-l-img">
                        <img src="${product_com[i].img_profile}" alt="">
                      </div>
                      <p>${product_com[i].name}</p>
                    </div>
                    <div class="ft-r">
                      <p>${product_com[i].day}</p>
                    </div>
                  </div>
                </div>
          `;
        }
        $("#tip-page").html(html);

        var html = '';

        for (let i = 15; i < 20; i += 1) {
          html += `
                <div class="block ${product_com[i].type}" onclick="open_content()">
      
      
                  <div class="photo">
                    <img src="${product_com[i].img}" alt="">s
                  </div>
                  <div class="info">
                    <div class="center-info">
                      <h3>${product_com[i].title}</h3>
                      <p>${product_com[i].description} </p>
                    </div>
                  </div>
                  <div class="footer">
                    <div class="ft-l">
                      <div class="ft-l-img">
                        <img src="${product_com[i].img_profile}" alt="">
                      </div>
                      <p>${product_com[i].name}</p>
                    </div>
                    <div class="ft-r">
                      <p>${product_com[i].day}</p>
                    </div>
                  </div>
                </div>
          `;
        }
        $("#exam-page").html(html);


        var html = '';

        for (let i = 20; i < 28; i += 1) {
          html += `
          <div class="block ${product_com[i].type}" onclick="open_content()">

            <div class="tag">${product_com[i].type}</div>

            <div class="photo">
              <img src="${product_com[i].img}" alt="">s
            </div>
            <div class="info">
              <div class="center-info">
                <h3>${product_com[i].title}</h3>
                <p>${product_com[i].description} </p>
              </div>
            </div>
            <div class="footer">
              <div class="ft-l">
                <div class="ft-l-img">
                  <img src="${product_com[i].img_profile}" alt="">
                </div>
                <p>${product_com[i].name}</p>
              </div>
              <div class="ft-r">
                <p>${product_com[i].day}</p>
              </div>
            </div>
          </div>
    `;
        }
        $("#com-page").html(html);
      }

      var html = '';

      for (let i = 28; i < product_com.length; i += 1) {
        html += `
          <div class="block ${product_com[i].type}" onclick="open_content()">
            <div class="photo">
              <img src="${product_com[i].img}" alt="">s
            </div>
            <div class="info">
              <div class="center-info">
                <h3>${product_com[i].title}</h3>
                <p>${product_com[i].description} </p>
              </div>
            </div>
            <div class="footer">
              <div class="ft-l">
                <div class="ft-l-img">
                  <img src="${product_com[i].img_profile}" alt="">
                </div>
                <p>${product_com[i].name}</p>
              </div>
              <div class="ft-r">
                <p>${product_com[i].day}</p>
              </div>
            </div>
          </div>
    `;
      }
      $("#sarulbb-page").html(html);


    },
    error: function (xhr, status, error) {
      console.log("AJAX request error:", xhr.responseText);
    }
  });



});

function search(y) {
  var value = $('#' + y.id).val()
  console.log(value)
  var html = '';
  for (let i = 0; i < 15; i += 1) {
    if (product_com[i].type.includes(value)||product_com[i].title.includes(value)||product_com[i].description.includes(value)) {
      html += `
          <div class="block ${product_com[i].type}" onclick="open_content()">

            <div class="tag">${product_com[i].type}</div>

            <div class="photo">
              <img src="${product_com[i].img}" alt="">
            </div>
            <div class="info">
              <div class="center-info">
                <h3>${product_com[i].title}</h3>
                <p>${product_com[i].description} </p>
              </div>
            </div>
            <div class="footer">
              <div class="ft-l">
                <div class="ft-l-img">
                  <img src="${product_com[i].img_profile}" alt="">
                </div>
                <p>${product_com[i].name}</p>
              </div>
              <div class="ft-r">
                <p>${product_com[i].day}</p>
              </div>
            </div>
          </div>
    `;
    }
  }
  if (html == '') {
    $("#tip-page").html('<p>Not Found</p>')
  }
  else {
    $("#tip-page").html(html);
  }
  var html = '';

  for (let i = 15; i < 20; i += 1) {
    if (product_com[i].type.includes(value)||product_com[i].title.includes(value)||product_com[i].description.includes(value)) {
      html += `
          <div class="block ${product_com[i].type}" onclick="open_content()">


            <div class="photo">
              <img src="${product_com[i].img}" alt="">s
            </div>
            <div class="info">
              <div class="center-info">
                <h3>${product_com[i].title}</h3>
                <p>${product_com[i].description} </p>
              </div>
            </div>
            <div class="footer">
              <div class="ft-l">
                <div class="ft-l-img">
                  <img src="${product_com[i].img_profile}" alt="">
                </div>
                <p>${product_com[i].name}</p>
              </div>
              <div class="ft-r">
                <p>${product_com[i].day}</p>
              </div>
            </div>
          </div>
    `;
    }
  }
  if (html == '') {
    $("#exam-page").html('<p>Not Found</p>')
  }
  else {
    $("#exam-page").html(html);
  }

  var html = '';

  for (let i = 20; i < 28; i += 1) {
    if (product_com[i].type.includes(value)||product_com[i].title.includes(value)||product_com[i].description.includes(value)) {
      html += `
          <div class="block ${product_com[i].type}" onclick="open_content()">

            <div class="tag">${product_com[i].type}</div>

            <div class="photo">
              <img src="${product_com[i].img}" alt="">s
            </div>
            <div class="info">
              <div class="center-info">
                <h3>${product_com[i].title}</h3>
                <p>${product_com[i].description} </p>
              </div>
            </div>
            <div class="footer">
              <div class="ft-l">
                <div class="ft-l-img">
                  <img src="${product_com[i].img_profile}" alt="">
                </div>
                <p>${product_com[i].name}</p>
              </div>
              <div class="ft-r">
                <p>${product_com[i].day}</p>
              </div>
            </div>
          </div>
    `;
    }
  }
  if (html == '') {
    $("#com-page").html('<p>Not Found</p>')
  }
  else {
    $("#com-page").html(html);
  }

  var html = '';

  for (let i = 28; i < product_com.length; i += 1) {
    if (product_com[i].type.includes(value)||product_com[i].title.includes(value)||product_com[i].description.includes(value)) {
      html += `
              <div class="block ${product_com[i].type}" onclick="open_content()">
                <div class="photo">
                  <img src="${product_com[i].img}" alt="">s
                </div>
                <div class="info">
                  <div class="center-info">
                    <h3>${product_com[i].title}</h3>
                    <p>${product_com[i].description} </p>
                  </div>
                </div>
                <div class="footer">
                  <div class="ft-l">
                    <div class="ft-l-img">
                      <img src="${product_com[i].img_profile}" alt="">
                    </div>
                    <p>${product_com[i].name}</p>
                  </div>
                  <div class="ft-r">
                    <p>${product_com[i].day}</p>
                  </div>
                </div>
              </div>
        `;
    }
  }
  if (html == '') {
    $("#sarulbb-page").html('<p>Not Found</p>')
  }
  else {
    $("#sarulbb-page").html(html);
  }
}

function cancle() {
  $(".modal").css('display', 'none')
}
function save() {
  $(".modal").css('display', 'none')
}
function openmodal() {
  $(".modal").css('display', 'flex')
  $(".modal").css('justify-content', 'center')
  $(".modal").css('align-items', 'center')
}
function open_content(x) {
  $(".big-content").css('display', 'none')
  $(".big-content-home").css('display', 'none')
  $(".information").css('display', 'flex')
  console.log(x.id);
  $.ajax({
    method: 'get',
    url: './api/get_info.php',
    success: function (response) {
      console.log(response);
    },
    error: function (xhr, status, error) {
      console.log("AJAX request error:", xhr.responseText);
    }
  });
  var html = '<p>ข้อมูลลล</p>';
  $(".information").html(html);
}
