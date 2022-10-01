$(function () {
    $(":submit").prop('disabled', false);

    //Validacion mail
    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "Ingresá una dirección de email"
    );

    //FORM VADIDADOR
    $("form[name='form-hero']").validate({
        ignore: ".ignore",
        rules: {
            Contacto_Nombre: "required",
            Contacto_Apellidos: "required",
            "Móvil País": "required",
            Email: {
                required: {
                    depends: function () {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                customemail: true
            },
            "Móvil Area": {
                required: true,
                minlength: 2,
                maxlength: 4,
                digits: true
            },
            "Móvil": {
                required: true,
                digits: true,
                minlength: function () {
                    const valArea = $('#field_area_hero').val().length;
                    const requiredDigits = 10 - valArea;
                    return requiredDigits;
                },
                maxlength: function (element) {
                    const valArea = $('#field_area_hero').val().length;
                    const requiredDigits = 10 - valArea;
                    return requiredDigits;
                }

            },
            "Provincia": "required",
            "extra_field": { //Landing Racing
                required: true,
                minlength: 2,
                digits: true
            },
            "Contacto_Club": { //Landing clubes
                required: true,
                minlength: 2
            },
            "Contacto_Puesto": { //Landing clubes
                required: true,
                minlength: 2
            },
            "Contacto_PAS": { //Landing clubes
                required: true,
                minlength: 2
            },
            "Plan": "required",
            hiddenRecaptcha_hero: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        messages: {
            Contacto_Nombre: "Ingresá tu nombre",
            Contacto_Apellidos: "Ingresá tu apellido",
            Email: "Ingresá una dirección de email",
            "Móvil Area": "Verificar <span>Cód. Área</span>",
            "Móvil": "Verificar teléfono",
            "extra_field": "Ingresar un Nro",
            hiddenRecaptcha_hero: "Verifique el captcha"
        },
        submitHandler: function (form) {
            //Concatena valor extra landing racing
            if($('#extra_field').val() !== undefined){
                const comentarios = $('#field_comentarios_hero').val();
                $('#field_comentarios_hero').val(comentarios + " | Nro de socio: " + $('#extra_field').val());
            }

            //Concatena valor extra club landing clubes
            if($('#field_club_hero').val() !== undefined){
                const comentarios = $('#field_comentarios_hero').val();
                $('#field_comentarios_hero').val(comentarios + " - Club: " + $('#field_club_hero').val());
            }
            //Concatena valor extra club landing clubes
            if($('#field_puesto_hero').val() !== undefined){
                const comentarios = $('#field_comentarios_hero').val();
                $('#field_comentarios_hero').val(comentarios + " | Puesto en el Club: " + $('#field_puesto_hero').val());
            }
            //Concatena valor extra club landing clubes
            if($('#field_contacto_pas_hero').val() !== undefined){
                const comentarios = $('#field_comentarios_hero').val();
                $('#field_comentarios_hero').val(comentarios + " | Contacto PAS: " + $('#field_contacto_pas_hero').val());
            }


            //Form Submit
            form.submit();
            $(":submit").prop('disabled', true);
        }
    });
});