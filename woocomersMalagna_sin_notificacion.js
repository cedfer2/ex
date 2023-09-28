(function($){
	let searchParams = new URLSearchParams(window.location.search);
	if (searchParams.get('post_type') == 'shop_order') {
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

	$("#woocommerce-activity-panel .woocommerce-layout__activity-panel-tabs").prepend('<div id="ScreenShotTick" class="components-button woocommerce-layout__activity-panel-tab"><label><input type="button" id="botton4" value="Screenshot"></label></div>');
	$('#botton4').on('click', function() {
		$("body").after($('<style type="text/css" class="ScreenshotCss"> .woocommerce-layout__header, #wpadminbar { position: static !important; } .woocommerce_order_items_wrapper tr > .item.sortable, .woocommerce_order_items #order_shipping_line_items .name .view { max-width: 100px; } #order_line_items .name{ max-width: 300px !important; width: 100px; display: block; } #order_line_items .wc-order-item-name{ max-width: 120px; display: block; } .display_meta{ display: none; } </style>'));
	});

	$("body").after($('<style type="text/css" class="SolgrisCss">#the-list > tr{ outline: solid 1px #e5e5e5 !important;}</style>'));

})(jQuery);