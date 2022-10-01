$(function () {
    $(document).ready(function () {

        $('.handleVerMas').click((e) => {
            e.preventDefault();
            const id = $(e.currentTarget).data("extraid");

            if(!$(e.currentTarget).hasClass('selected')){
                //Mostrar contenido asociado
                $('.content_icono').removeClass('active');
                $('.content_icono_desktop[data-extraid="'+ id +'"]').addClass('active');

                //Cambios en botón 
                $('.handleVerMas').removeClass('selected');
                $(e.currentTarget).addClass('selected');
                $('.handleVerMas').html('Ver más');
                $(e.currentTarget).html('Ver menos');
            }else{

                $('.content_icono').removeClass('active');
                $('.handleVerMas').removeClass('selected');
                $(e.currentTarget).html('Ver más');
            }
        })

        $('.handleVerMasMobile').click((e) => {
            e.preventDefault();
            const id = $(e.currentTarget).data("extraid");

            if(!$(e.currentTarget).hasClass('selected')){
                //Mostrar contenido asociado
                $('.content_icono').removeClass('active');
                $('.content_icono_mobile[data-extraid="'+ id +'"]').addClass('active');

                //Cambios en botón 
                $('.handleVerMasMobile').removeClass('selected');
                $(e.currentTarget).addClass('selected');
                $('.handleVerMasMobile').html('Ver más');
                $(e.currentTarget).html('Ver menos');
            }else{
                
                $('.content_icono').removeClass('active');
                $('.handleVerMasMobile').removeClass('selected');
                $(e.currentTarget).html('Ver más');
            }
        })


                //////////////Code Above this line please//////////////
    }); //document ready
});