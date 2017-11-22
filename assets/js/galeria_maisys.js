var Galeria = function (){

	addThumb();

	setEventoElemento();

	//nsole.log($(idcontainer +" .imagem:eq(0)"));

	$(".container-galeria").css({display:'none'});
	$(".overlay").css({display:'none'});
	
	$(".conteudo  .imagem:eq(0)").addClass("ativo").show();
	
	var conteudo = $(".conteudo  .imagem:eq(0) .invisivel").clone();
	
	conteudo.removeClass('invisivel');
	
	$('#informacoes').append(conteudo[0]);

	ajustaCorpo();

	$('#infoAbreFecha').click(function(){
		if($(this).attr('data-estado') == 'aberto'){
			$('.lateral').css({width: '0', display: 'none' });
			$('.conteudo').css({width: '100%'});
			$(this).attr('data-estado', 'fechado')

		}else{
			$('.lateral').css({width: '30%', display: 'bolck'});
			$('.conteudo').css({width: '70%'});
			$(this).attr('data-estado', 'aberto')
		}


		ajustaCorpo();
	});

	$('#close').click(function(){
		
		var galeria = $(this).attr('data-gal');
		$('#'+galeria).css({display:'none'});
		$('.overlay').css({display:'none'})			

	});

	$('.navegacao > span').bind('click', function () {
		slide(this);
	})
}




function slide(objClick){
	
	if(objClick.getAttribute('class').indexOf('direita') === 0){
		if($(".ativo").next().size()){

			$('#informacoes > span:first').remove();

			var conteudo = $(".ativo").next().find('span').clone();
			conteudo.removeClass('invisivel');
			$('#informacoes').append(conteudo[0]);

			$(".ativo").fadeOut().removeClass("ativo").next().fadeIn().addClass("ativo");
		}else {

			$('#informacoes > span:first').remove();

			$(".ativo").fadeOut().removeClass("ativo");

			$(".conteudo .imagem:eq(0)").fadeIn().addClass("ativo");

			var conteudo = $(".conteudo  .imagem:eq(0) .invisivel").clone();
			conteudo.removeClass('invisivel');
			$('#informacoes').append(conteudo[0]);
		}


	}else{ 
		
		if($(".ativo").prev('.imagem').size()){

			$('#informacoes > span:first').remove();

			var conteudo = $(".ativo").prev().find('span').clone();
			conteudo.removeClass('invisivel');
			$('#informacoes').append(conteudo[0]);

			$(".ativo").fadeOut().removeClass("ativo").prev().fadeIn().addClass("ativo");
		}else {

			//console.log($('#informacoes > span:last'))

			$('#informacoes > span:last').remove();

			$(".ativo").fadeOut().removeClass("ativo");

			$(".conteudo .imagem:last").fadeIn().addClass("ativo");

			var conteudo = $(".conteudo  .imagem:last .invisivel").clone();
			conteudo.removeClass('invisivel');
			$('#informacoes').append(conteudo[0]);
		}
	}
	ajustaCorpo();

}



function ajustaCorpo(){
	$('.corpo').removeAttr('style');
	var altura = $('.ativo').children().first('img').outerHeight();
	$('.corpo').css({height: altura})
}


function thumbNavegacao(eventoThumb){
	$('#informacoes > span:first').remove();
	var imagem = $("#"+$(eventoThumb).attr('data-thumb'))[0];
	var conteudo = $(imagem).find('span').clone();
	conteudo.removeClass('invisivel');
	$('#informacoes').append(conteudo[0]);
	$(".ativo").fadeOut().removeClass("ativo");
	$(imagem).fadeIn().addClass("ativo");	
	
	ajustaCorpo();
}


function setEventoElemento(){
	$('.galeria-maisys').each(function(){
		
		$(this).click(function(){
			var galeria = $(this).attr('data-gal');
			$('#'+galeria).css({display:'block'});
			$('.overlay').css({display:'block'})
			ajustaCorpo();
		});
	});

}

function addThumb(){

	$(".conteudo .imagem").each(function(){

		var thumb_arr = $(this).children().first('img');
		var thumb = thumb_arr[0]
		
		var dataThumb = $(thumb).parent().attr('id');
		
		var elementoThumb = $(thumb).clone();

		$(elementoThumb).attr('data-thumb', dataThumb);

		$(elementoThumb).click(function(){
			thumbNavegacao(this);
		})

		//console.log(dataThumb);
		
		$('.rodape').append(elementoThumb);
	})

}