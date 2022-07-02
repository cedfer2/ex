/*
http://ionden.com/a/plugins/ion.sound/en.html
http://www.forosdelweb.com/f13/conteo-regresivo-enviar-datos-557260/
*/


  var timeLimit = 10; //tiempo en minutos
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

  $("#cbox1").prop("checked", !!$.parseJSON(wpCookies.get("Autorefesh"))).change(function() {
    var $input = $( this );
    console.log(
                " .attr( \"checked\" ): " + $input.attr( "checked" ) +
                " .prop( \"checked\" ): " + $input.prop( "checked" ) +
                " .is( \":checked\" ): " + $input.is( ":checked" ));
    if($('#cbox1').is(":checked")) {
      $(this).prop(":checked",true);
      wpCookies.set("Autorefesh","true")
      cuenta();
    } else {
      $(this).prop(":checked",false);
      wpCookies.set("Autorefesh","false")
    }
    console.log("Autorefesh:", wpCookies.get("Autorefesh"));
  }).trigger("change");
}

  $(document).ready(function() {

    ion.sound({
      sounds: [
      {name: "tono-mensaje-3"},
      {name: "plop8"}
              ],
      path: "https://cedfer2.github.io/ex/",
            preload: true,
            multiplay: true,
            volume: 1.0
    });

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
                  ion.sound.play("tono-mensaje-3");
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

                                      if (Number(wpCookies.get("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]")) < 2){
                                        console.log("Notifica:"+ $( this ).find(".order_number .order-view").text() +
                                                    "="+ wpCookies.get("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]") );
                                        Notifica(
                                                  "pedido:"+ $( this ).find(".order_number .order-view").text(),
                                                  $( this ).find(".order_number .order-view").attr("href"));
                                      }
                                        wpCookies.set("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]", Number(wpCookies.get("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]"))+1)

                                    });
    } else {
      $("#the-list .author-other").each(function( index ) {
        wpCookies.remove("data-order-id["+$( this ).find(".order_number .order-preview").attr("data-order-id")+"]")
      });
    }

  });
})(jQuery);
