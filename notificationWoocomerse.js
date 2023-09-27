
  var timeLimit = 1; //tiempo en minutos
  var conteo = new Date(timeLimit * 60000);

  function inicializar(){
    jQuery("#cuenta").text(conteo.getMinutes() + ":" + conteo.getSeconds());
  }
  function cuenta(){
  intervaloRegresivo = setInterval("regresiva()", 1000);
  }
  
  function regresiva(){
    if(conteo.getTime() > 0){
      conteo.setTime(conteo.getTime() - 1000);
    }else{
      clearInterval(intervaloRegresivo);
      window.history.forward(1);
      location.reload(true);
    }
    jQuery("#cuenta").text(conteo.getMinutes() + ":" + conteo.getSeconds());
  }



(function($){ 
let searchParams = new URLSearchParams(window.location.search);
if (searchParams.get('post_type') == 'shop_order') {
  $("#woocommerce-activity-panel .woocommerce-layout__activity-panel-tabs").prepend('<div id="conterr" class="components-button woocommerce-layout__activity-panel-tab"><label><input type="checkbox" id="cbox1" value="first_checkbox"> Autorefesh</label><b id="cuenta" class="timmer">0</b></div>');
  inicializar();

  $("#cbox1").prop("checked", !!$.parseJSON(localStorage.getItem("Autorefesh"))).change(function() {
    var $input = $( this );
    console.log(
                " .attr( \"checked\" ): " + $input.attr( "checked" ) +
                " .prop( \"checked\" ): " + $input.prop( "checked" ) +
                " .is( \":checked\" ): " + $input.is( ":checked" ));
    if($('#cbox1').is(":checked")) {
      $(this).prop(":checked",true);
      localStorage.setItem("Autorefesh","true")
      cuenta();
    } else {
      $(this).prop(":checked",false);
      localStorage.setItem("Autorefesh","false")
    }
    console.log("Autorefesh:", localStorage.getItem("Autorefesh"));
  }).trigger("change");
$("#woocommerce-activity-panel .woocommerce-layout__activity-panel-tabs").prepend('<div id="ImprTick" class="components-button woocommerce-layout__activity-panel-tab"><label><input type="checkbox" id="cbox2" value="second_checkbox"> Solo Imprimir</label></div>');
$("#woocommerce-activity-panel .woocommerce-layout__activity-panel-tabs").prepend('<div id="FallidTick" class="components-button woocommerce-layout__activity-panel-tab"><label><input type="checkbox" id="cbox3" value="tercer_checkbox"> Solo fallidos</label></div>');

function setStylImpress(){
  $("body").after($('<style type="text/css" class="SolImpressCss">.wp-admin .wp-list-table .status-wc-cancelled, .wp-admin .wp-list-table .status-wc-failed, .wp-admin .wp-list-table .status-wc-on-hold, .wp-admin .wp-list-table .status-wc-pending { display: none !important; }</style>'));
}

function setStylFallid(){
  $("body").after($('<style type="text/css" class="SolFallidCss">.status-wc-completed, .status-wc-processing{ display: none !important; }</style>'));
}

function getcbox2(){
  if($('#cbox2').is(':checked') ){
    $(".SolImpressCss").remove();
    localStorage.setItem("Impress", true);
    setStylImpress();
  } else {
    $(".SolImpressCss").remove();
    localStorage.setItem("Impress", false);
  }
  console.log("Impress: ", localStorage.getItem("Impress"));
}

function getcbox3(){
  if($('#cbox3').is(':checked') ){
    $(".SolFallidCss").remove();
    localStorage.setItem("Fallid", true);
    setStylFallid();
  } else {
    $(".SolFallidCss").remove();
    localStorage.setItem("Fallid", false);
  }
  console.log("Fallid: ", localStorage.getItem("Fallid"));
}


$('#cbox2').prop('checked',(localStorage.getItem("Impress") === "true"));
$('#cbox3').prop('checked',(localStorage.getItem("Fallid") === "true"));

getcbox2();
getcbox3();

$('#cbox2').on('click', function() {
  getcbox2();
});

$('#cbox3').on('click', function() {
  getcbox3();
});

}

  $(document).ready(function() {

    Notification.requestPermission();
    const permission = navigator.permissions.query({name: "notifications"});
    if (permission.state === "granted") {
      console.log("Notification granted");
    }

    function Notifica(body, link){

      if (window.Notification) {
        console.log("supported");
        var options = {
          body: body,
          icon: "https://malagnacosmetics.com/wp-content/uploads/2021/01/favicon_malagna.png"
        }


        var nf = new Notification("Nuevo pedido", options);
            nf.onclick = function() { 
                          console.log("click", link);
                          window.open(link, "_blank");
                          window.focus();
                         };
            nf.onshow = function() {
                  console.log("nf.onshow");
                        setTimeout(function() {
                          nf.close()
                        },2500)
                        };
            nf.onclose = function() { 
            console.log("close");
            };
      } else {  
        console.log("not supported");
      }
    }

    if ($(".status-wc-processing").length > 0) {
      $(".status-wc-processing").each(function( index ) {
                                      console.log(index,
                                                  ":" + $( this ).find(".order_number .order-view").text()  +
                                                  " url:"+ $( this ).find(".order_number .order-view").attr("href") +
                                                  " wpCookies: "+ $( this ).find(".order_number .order-preview").attr("data-order-id")
                                                 );

                                      if (Number(localStorage.getItem("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]")) < 2){
                                        console.log("Notifica:"+ $( this ).find(".order_number .order-view").text() +
                                                    "="+ localStorage.getItem("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]") );
                                        var mp3_url = 'https://cedfer2.github.io/ex/tono-mensaje-3.mp3';
                                        (new Audio(mp3_url)).play();
                                        Notifica(
                                                  "pedido:"+ $( this ).find(".order_number .order-view").text(),
                                                  $( this ).find(".order_number .order-view").attr("href"));
                                      }
                                        localStorage.setItem("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]", Number(localStorage.getItem("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]"))+1)

                                    });
    } else {
      $("#the-list .author-other").each(function( index ) {
        localStorage.removeItem("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]")
      });
    }
    $("#woocommerce-activity-panel .woocommerce-layout__activity-panel-tabs").prepend('<div id="ScreenShotTick" class="components-button woocommerce-layout__activity-panel-tab"><label><input type="button" id="botton4" value="Screenshot"></label></div>');
    $('#botton4').on('click', function() {
      $("body").after($('<style type="text/css" class="ScreenshotCss"> .woocommerce-layout__header, #wpadminbar { position: static !important; } .woocommerce_order_items_wrapper tr > .item.sortable, .woocommerce_order_items #order_shipping_line_items .name .view { max-width: 100px; } #order_line_items .name{ max-width: 300px !important; width: 100px; display: block; } #order_line_items .wc-order-item-name{ max-width: 120px; display: block; } .display_meta{ display: none; } </style>'));
    });

  });
})(jQuery);
