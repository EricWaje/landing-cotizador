$(function () {
    $(document).ready(function () {

        // $("#tel_fields").after(`
        // <fieldset class="col_6">
        //     <select name="Medio de contacto" id="field_contacto">
        //         <option value="" selected disabled="disabled">Medio de contacto</option>
        //         <option value="Whatsapp">Whatsapp</option>
        //         <option value="Mail">Mail</option>
        //         <option value="Telefono">Telefono</option>
        //     </select>
        // </fieldset>
        // `)

        // $("#tel_fields").after(`
        // <fieldset class="col_6 radios">
        //     <label>Plan:</label>
        //     <div id="planes_options">        
        //         <div>
        //             <input type="radio" class="form-check-input" name="Plan" id="control_COLUMN26_0" label="Plan" value="1" data-cuota="NA" data-desc="Plan Oro" checked="checked">
        //                 <label class="form-check-label" for="control_COLUMN26_0"><strong>Plan Oro</strong></label>
        //         </div>
        //         <div>
        //             <input type="radio" class="form-check-input" name="Plan" id="control_COLUMN26_1" label="Plan" value="2" data-cuota="NA" data-desc="Plan Plata">
        //                 <label class="form-check-label" for="control_COLUMN26_1"><strong>Plan Plata</strong></label>
        //         </div>
        //         <div>
        //             <input type="radio" class="form-check-input" name="Plan" id="control_COLUMN26_2" label="Plan" value="3" data-cuota="NA" data-desc="Plan Bronce">
        //                 <label class="form-check-label" for="control_COLUMN26_2"><strong>Plan Bronce</strong></label>
        //         </div>
        //         </div>
        // </fieldset>	
        // `)

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

        $('.handleContratar').on("click", function (e) {
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

        //////////////Code Above this line please//////////////
    }); //document ready
});