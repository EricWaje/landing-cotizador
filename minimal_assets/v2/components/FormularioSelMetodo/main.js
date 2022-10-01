$(function () {
    $(":submit").prop('disabled', false);
    $('#field_area').addClass('ignore');
    $('#field_movil').addClass('ignore');
    $('#field_movil').attr("placeholder", "Teléfono (Opcional)");

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
            Email: "Ingresá un email (Ej: nombre@ejemplo.com)",
            "Móvil Area": "Verificar Cód. Área (Ej: 11)",
            "Móvil": "Verificar teléfono (Ej: 43445653)",
            hiddenRecaptcha: "Verifique el captcha"
        },
        submitHandler: function (form) {
            form.submit();
            $(":submit").prop('disabled', true);
        }
    });

    $('#field_contacto').change((e)=>{
        switch (e.target.value) {
            case "Mail":
                $('#email_wrapper').show();
                $('#field_email').removeClass('ignore');
                $('#field_area').addClass('ignore');
                $('#field_movil').addClass('ignore');
                $('#field_movil').attr("placeholder", "Teléfono (Opcional)");
                $('#field_email').attr("placeholder", "Email");
                $("#field_email").focus();
                $("form[name='form-watson']").valid();
                // $("#field_movil").valid();
                // $("#field_email").valid();
                break;
            case "Telefono":
                $('#field_email').addClass('ignore');
                $('#field_area').removeClass('ignore');
                $('#field_movil').removeClass('ignore');
                $('#field_email').attr("placeholder", "Email (Opcional)");
                $('#field_movil').attr("placeholder", "Teléfono");
                $("#field_area").focus();
                $("form[name='form-watson']").valid();
                // $("#field_movil").valid();
                // $("#field_email").valid();
                break;
            case "Whatsapp":
                $('#field_email').addClass('ignore');
                $('#field_area').removeClass('ignore');
                $('#field_movil').removeClass('ignore');
                $('#field_email').attr("placeholder", "Email (Opcional)");
                $('#field_movil').attr("placeholder", "Teléfono");
                $("#field_area").focus();
                $("form[name='form-watson']").valid();
                // $("#field_movil").valid();
                // $("#field_email").valid();
                break;
        
            default:
                break;
        }
    })



});

