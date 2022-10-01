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
    $("form[name='form-watson']").validate({
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
                    const valArea = $('#field_area').val().length;
                    const requiredDigits = 10 - valArea;
                    return requiredDigits;
                },
                maxlength: function (element) {
                    const valArea = $('#field_area').val().length;
                    const requiredDigits = 10 - valArea;
                    return requiredDigits;
                }

            },
            "Provincia": "required",
            "Plan": "required",
            hiddenRecaptcha: {
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
            hiddenRecaptcha: "Verifique el captcha"
        },
        submitHandler: function (form) {
            form.submit();
            $(":submit").prop('disabled', true);
        }
    });
});