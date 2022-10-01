$(function () {
    $(document).ready(function () {

        const handleFillData = (data) => {
            const { planes } = data;
            if (!$("body").hasClass("salud_fem")) {
                let asterisco = '';
                if($("body").hasClass("ap_delivery") || $("body").hasClass("ap_salud")){
                    asterisco = '*';
                }
                const cantPlanes = planes.length;
                let nroPlan = 0;
                planes.forEach(element => {
                    const { nombre, descripcion, precio } = element;
                    let descriptionItems = '';
                    let descriptionRadioItems = '';
                    descripcion.forEach(item => {
                        descriptionItems += `<li>${item}</li>`;
                        descriptionRadioItems += `${item} | `
                    });
                    const descriptionRadioItemsSl = descriptionRadioItems.slice(0, -3);
                    const precioRedondeado = precio.replace(',','.');
                    const planMarkup =
                        `
                    <div class="plan col_${ 12 / cantPlanes}">
                        <div class="header_plan">
                            <span>${nombre}</span>
                            <strong>${asterisco}${precioRedondeado}<span>/mes</span></strong>
                        </div>
                        <div class="plan_contenido">
                            <ul>
                                ${descriptionItems}
                            </ul>
                            <a href="#formulario" class="btn plan_action_form" data-plan="${nroPlan}">Contratar ${nombre}</a>
                        </div>	
                    </div><!-- .plan -->
                `

                    const radioPlanMarkup =
                        `
                <div>
                    <input
                    type="radio"
                    class="form-check-input"
                    name="Plan"
                    id="control_COLUMN26_${nroPlan}"
                    label="Plan"
                    value="${nroPlan + 1}"
                    data-cuota="${precio}"
                    data-desc="${descriptionRadioItemsSl}"
                    ${nroPlan == 0 ? 'checked="checked"' : ''}
                    >
                        <label class="form-check-label" for="control_COLUMN26_${nroPlan}"><strong>${nombre}</strong> (${precioRedondeado}) </label>
                </div>
                `;

                    if (nroPlan == 0) {
                        $(".handle_cuota").val(precio);
                        $(".handle_descr").val(descriptionRadioItemsSl);
                    }

                    $("#planes").append(planMarkup);
                    $("#planes_options").append(radioPlanMarkup);
                    nroPlan++;

                });
            } else {
                const {precio} = planes[0];
                const precioRedondeado = precio.replace(',','.');
                const planPriceStr = `<strong>${precioRedondeado}</strong><span>/mes</span>`;
                $(".handle_price").append(planPriceStr);
            }
        }

        const handleGetData = () => {
            let searchLanding = '';
            //Landing Origin
            if ($("body").hasClass("hogar")) { searchLanding = "Hogar"; }
            if ($("body").hasClass("alquileres")) { searchLanding = "Cabañas"; }
            if ($("body").hasClass("foodtruck")) { searchLanding = "Foodtruck"; }
            if ($("body").hasClass("salud_fem")) { searchLanding = "Salud Mujer"; }
            if ($("body").hasClass("salud")) { searchLanding = "Salud Esencial"; }
            if ($("body").hasClass("ap_delivery")) { searchLanding = "accidentes personales delivery"; }
            if ($("body").hasClass("ap_salud")) { searchLanding = "accidentes personales salud"; }
            if ($("body").hasClass("boca_hogar")) { searchLanding = "BOCA - HOGAR"; }
            if ($("body").hasClass("boca_salud")) { searchLanding = "BOCA - SALUD"; }
            if ($("body").hasClass("boca_vida")) { searchLanding = "BOCA - VIDA"; }
            if ($("body").hasClass("salud_familiar")) { searchLanding = "Salud_familiar"; }

            const authSettings = {
                 "url": `https://www.riouruguay.com.ar/siniestrosApi/api/ProductTemplates/filter.php?fields=id,name,tipo_plan_c,date_cost_price,description,discount_price&filter[0][category_name]=${searchLanding}&order_by=tipo_plan_c:asc,date_cost_price:desc`,
                //"url": `https://bailarincosmico.com.ar/clientes/riouruguay/pas/api/v2/ProductTemplates/filter.php?fields=id,name,tipo_plan_c,date_cost_price,description,discount_price&filter[0][category_name]=${searchLanding}&order_by=tipo_plan_c:asc,date_cost_price:desc`,
                "method": "GET",
                "timeout": 0,
                //beforeSend: function () { $("#cp_primary_loader").show(); },           
                success: function () { $(".loading_spinner").hide(); },
                error: function (xhr, status, errorThrown) {
                    $(".loading_spinner").show();
                    $(".loading_spinner").html(`<p class="ajax_error">Ha ocurrido un error. Por favor intente luego.</p>`);
                }
            };
            $.ajax(authSettings).done(function (response) {
                handleFillData(response);

                //Selector de planes a input
                if ($('#planes').length > 0) {
                    $('.plan_action_form').each(function () {
                        var $this = $(this);
                        $this.on("click", function (e) {
                            //Plan selected
                            const planSelected = $(this).data('plan');
                            $('input:radio[name=Plan]')[planSelected].checked = true;
                            const cuotaSelected = $('input:radio[name=Plan]')[planSelected].getAttribute('data-cuota');
                            $('input:hidden[name=Cuota]').val(cuotaSelected);
                            const cuotaSelectedDesc = $('input:radio[name=Plan]')[planSelected].getAttribute('data-desc');
                            $('input:hidden[name="Descripción oferta"]').val(cuotaSelectedDesc);
                            //Scroll to form
                            e.preventDefault();
                            $('html, body').animate({
                                scrollTop: $("#formulario").offset().top
                            }, 0);
                        });
                    });
                    //Click en radio de plan
                    $('input:radio[name=Plan]').each(function () {
                        var $this = $(this);
                        $this.on("click", function () {
                            const planSelected = $(this).data('cuota');
                            $('input:hidden[name=Cuota]').val(planSelected);
                            const planSelectedDesc = $(this).data('desc');
                            $('input:hidden[name="Descripción oferta"]').val(planSelectedDesc);
                        });
                    });
                }
            });
        }


        handleGetData();


        //////////////Code Above this line please//////////////
    }); //document ready
});