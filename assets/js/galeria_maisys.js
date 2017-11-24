/**
 * [Galeria description]
 *
 *
 * propriedade idContainer
 * 
 */
 var Galeria = function(idCont)
 {

 	this.idContainer = idCont,

 	this.runGaleria = function(){

 		this.addThumb();

 		this.setEventoElemento();

 		this.startGaleria();	

 		this.inicializabotoes();

 		this.ajustaCorpo();
 	},

 	this.startGaleria = function()
 	{

 		$(this.idContainer).css({display:'none'});
 		$(".overlay").css({display:'none'});

 		$(this.idContainer+" .conteudo .imagem:eq(0)").addClass("ativo").show();

 		var conteudo = $(this.idContainer+" .conteudo  .imagem:eq(0) .invisivel").clone();

 		conteudo.removeClass('invisivel');

 		$(this.idContainer+' .informacoes').append(conteudo[0]);
 	},

 	this.inicializabotoes = function()
 	{
 		var container = this.idContainer
 		var esse = this;

 		$(container+' .infoAbreFecha').click(function(){
 			if($(this).attr('data-estado') == 'aberto'){
 				
 				$(container+' .lateral').css({width: '0', display: 'none' });
 				$(container+' .conteudo').css({width: '100%'});
 				$(this).attr('data-estado', 'fechado')

 			}else{

 				$(container+' .lateral').css({width: '30%', display: 'bolck'});
 				$(container+' .conteudo').css({width: '70%'});
 				$(this).attr('data-estado', 'aberto')
 			}


 			esse.ajustaCorpo();
 		});

 		$(this.idContainer+' .close').click(function(){

 			var galeria = $(this).attr('data-gal');
 			$('#'+galeria).css({display:'none'});
 			$('.overlay').css({display:'none'})			

 		});

 		$(this.idContainer+' .navegacao > span').bind('click', function () {
 			esse.slide(this);
 		})
 	},

 	this.slide = function(objClick)
 	{

 		if(objClick.getAttribute('class').indexOf('direita') === 0){
 			if($(this.idContainer+" .ativo").next().size()){

 				$(this.idContainer+' .informacoes > span:first').remove();

 				var conteudo = $(this.idContainer+" .ativo").next().find('span').clone();
 				conteudo.removeClass('invisivel');
 				$(this.idContainer+' .informacoes').append(conteudo[0]);

 				$(this.idContainer+" .ativo").fadeOut().removeClass("ativo").next().fadeIn().addClass("ativo");
 			}else {

 				$(this.idContainer+' .informacoes > span:first').remove();

 				$(this.idContainer+" .ativo").fadeOut().removeClass("ativo");

 				$(this.idContainer+" .conteudo .imagem:eq(0)").fadeIn().addClass("ativo");

 				var conteudo = $(".conteudo  .imagem:eq(0) .invisivel").clone();
 				conteudo.removeClass('invisivel');
 				$(this.idContainer+' .informacoes').append(conteudo[0]);
 			}


 		}else{ 

 			if($(this.idContainer+" .ativo").prev('.imagem').size()){

 				$(this.idContainer+' .informacoes > span:first').remove();

 				var conteudo = $(".ativo").prev().find('span').clone();
 				conteudo.removeClass('invisivel');
 				$(this.idContainer+' .informacoes').append(conteudo[0]);

 				$(this.idContainer+" .ativo").fadeOut().removeClass("ativo").prev().fadeIn().addClass("ativo");
 			}else {

				//console.log($('.informacoes > span:last'))

				$(this.idContainer+' .informacoes > span:last').remove();

				$(this.idContainer+" .ativo").fadeOut().removeClass("ativo");

				$(this.idContainer+" .conteudo .imagem:last").fadeIn().addClass("ativo");

				var conteudo = $(".conteudo  .imagem:last .invisivel").clone();
				conteudo.removeClass('invisivel');
				$(this.idContainer+' .informacoes').append(conteudo[0]);
			}
		}

		this.ajustaCorpo();

	},

	this.ajustaCorpo = function()
	{
		$(this.idContainer+' .corpo').removeAttr('style');
		var altura = $(this.idContainer+' .ativo').children().first('img').outerHeight();
		$(this.idContainer+' .corpo').css({height: altura})
	},

	this.thumbNavegacao = function(eventoThumb){
		$(this.idContainer+' .informacoes > span:first').remove();
		var imagem = $(this.idContainer+" #"+$(eventoThumb).attr('data-thumb'))[0];
		var conteudo = $(imagem).find('span').clone();
		conteudo.removeClass('invisivel');
		$(this.idContainer+' .informacoes').append(conteudo[0]);
		$(this.idContainer+" .ativo").fadeOut().removeClass("ativo");
		$(imagem).fadeIn().addClass("ativo");	
		
		this.ajustaCorpo();
	},

	this.addThumb = function()
	{
		var container = this.idContainer;
		var esse = this;

		$(container+" .conteudo .imagem").each(function(){
			console.log(container);

			var thumb_arr = $(this).children().first('img');
			var thumb = thumb_arr[0]
		//console.log($(this.idContainer+" .conteudo .imagem"));

		var dataThumb = $(thumb).parent().attr('id');

		var elementoThumb = $(thumb).clone();

		$(elementoThumb).attr('data-thumb', dataThumb);

		$(elementoThumb).click(function(){
			esse.thumbNavegacao(this);
		});

			//console.log(dataThumb);
			
			$(container+' .rodape').append(elementoThumb);
		});

	},

	this.setEventoElemento = function()
	{
		var esse = this;
		var container = this.idContainer;

		$('.galeria-maisys').each(function(){
			
			$(this).click(function(){
				var galeria = $(this).attr('data-gal');
				var imagem = $(this).attr('data-img');
				
				$('#'+galeria).css({display:'block'});
				$('.overlay').css({display:'block'})
				console.log($('#'+imagem)[0]);

				

				$(container+" .ativo").fadeOut().removeClass("ativo");
				
				$('#'+imagem).fadeIn().addClass("ativo");

				$(container+' .informacoes > span:first').remove();
				var conteudo = $('#'+imagem).find('span').clone();
				conteudo.removeClass('invisivel');
				$(container+' .informacoes').append(conteudo[0]);

				esse.ajustaCorpo();
			});
		});

	}

	
}




















