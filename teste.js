/* 
 * Implatação da galeria:
 * Deve-se instanciar scripts no head:
 * galeria.css
 * slick.js
 * galeria.js
 * 
 * ---------------------------------------------------------------------------------------------
 * 
 * # Imagem pricipal tem que estar dentro de uma div com uma classe "container-imagem" e
 * carregar um atributo data-ativo com o número da posição da imagem, oriundo da chave da 
 * SESSION que carrega as informações da galeria em seguida uma tag img com a classe img-content. 
 * Caso não houver uma imagem, no logar da tag img, deve ser colocado um tag h1 com class 
 * "red" e um texto "Arquivo Ausente" em  seguida um span com a class "material-icons" com um 
 * texto "block".
 * 
 * # Abaixo da classe "container-imagem", será montado os thumbnails de navegação. O elemento 
 * principal é uma div com a classe "container-thumbs", Dentro dela uma outra div com uma classe
 * "content-thumbs" que carregará um atributo data-posicao com o valor numérico oriundo da chave 
 * da SESSION que carrega as informações da galeria e, dentro desta div terá um outra div com  
 * a classe "thumbs" onde conterá a tag img para carregar os thumbnails.
 * 
 * -----------------------------------------------------------------------------------------------
 * 
 * ESTRUTURA.
 *  div.container-imagem[data-ativo='posicao array session']
 *  |
 *  ----a
 *  |   |
 *  |   ----img.img-content
 *  div.container-thumbs
 *  |   |   
 *  ----div.content-thumbs[data-posicao='posicao array session']
 *  |   |   
 *  |   ----div.thumbs
 *  |   |   |
 *  |   |   ----img
 *  
 *-----------------------------------------------------------------------------------------------  
 *  
 *  
 */

 $(window).load(function () {

  $('.container-imagem').css({'opacity': 1, 'transition': 'all 1.5s'});
  console.log($('.container-imagem'));
  $(window).resize(function () {
    redimenssionaZoom();
    definirTelaSlider();
    });
  //========================================================================

  //Controle dos botões informação e fechar
  $('.info-galeria').click(function () {
    if ($('.div4').attr('style') === 'display: none;') {
      $('.div4').slideDown();
      return true;
    }
    $('.div4').slideUp();
    });


  //  $('.fechar-galeria').click(function () {
    //    window.close();
    //  });
  redimenssionaZoom();
  //========================================================================
  //Posicionamento do scroll

  $('body, html').height('100%');

  $('.apresentar-thumb').click(function () {
    if ($(this).hasClass('down')) {
      localStorage.setItem('showThunb', 1);
      } else {
        localStorage.removeItem('showThunb');
      }
      downThunb($(this));
      definirTelaSlider();

      });

  downThunb($('.apresentar-thumb'));

  $('.apresentar-player').click(function () {
    ($(this).html() === 'pause') ? localStorage.removeItem('player') : localStorage.setItem('player', 1);
    gallerySlidePlay($(this));
    });
  gallerySlidePlay($('.apresentar-player'));

  definirTelaSlider();
  });
 //========================================================================

 function redimenssionaZoom() {
  //  console.log('redimenssionaZoom');
  //--- Porcentagem de larguras dos Thumbnails

  //  Pegar Largura total container-thumbs com position fixed
  var widthContainer = $('.container-thumbs').width();
  /**
   * Codigo Experimental
   * descobrir a largura dos thumbs --- um percetual do container  
   * com margim 7,6388%
   * margim 0,6944%
   */
   var thumbsTotal = widthContainer * 0.076388;
   var thumbsWidth = widthContainer * 0.069444;
   var margimThumbs = widthContainer * 0.0069444;
   var qtdThumbs = $('.thumbs').length;
   var larguraReferencia = thumbsTotal * qtdThumbs;
   //  Pegar valor da largura total do thumbs-track

   //  Calcular proporção de larguta de continer e track
   var proporcao = ((larguraReferencia * 100) / widthContainer) + 1;
   //  Atribuir valor de proporção de largura ao thumbs-track 
   //  console.log(proporcao, larguraReferencia, widthContainer);
   //  $('.content-thumbs > a').css({width: '100%', height:'100%'});

   $('.thumbs-track').css({width: proporcao + '%'});
   var widthTotal = $('.thumbs-track').width();
   var widthPercental = (thumbsWidth * 100) / widthTotal;
   var margimPercental = (margimThumbs * 100) / widthTotal;
   $('.content-thumbs').each(function () {
    $(this).css({'width': widthPercental + '%', 'margin-left': margimPercental + '%'});
    var thumbsWidth = $(this).width();
    var thumbsHeight = $(this).height();
    var proporcaoWidth = 0.97 * thumbsWidth;
    var proporcaoHeight = 0.9625 * thumbsHeight;
    $(this).children('img')
    .css({'max-width': proporcaoWidth + 'px', 'max-height': proporcaoHeight + 'px'});
    });
   var id = $('.container-imagem').attr('data-ativo');
   var scrollTo = $('#' + id).position().left;
   $('.container-thumbs').animate({'scrollLeft': scrollTo}, 0);
 }

/**
 * =============================================================================
 * @param {type} element
 * @param {type} clicked
 * @returns {undefined}
 */


 function downThunb(element) {
  showThunb = localStorage.getItem('showThunb');
  if (showThunb) {
    $(element).removeClass('down');
    $('.container-thumbs').removeClass('down');
    $('#slide-imagem').removeClass('down');
    } else {
      $('.container-thumbs').addClass('down effect-dow-up');
      $('#slide-imagem').addClass('down effect-dow-up');
      $(element).addClass('down effect-dow-up');
      localStorage.removeItem("showThunb");
    }
    definirTelaSlider();
  }

/**
 * ========================================================================
 * @returns {undefined}
 */

 function gallerySlidePlay(element) {
  //play_arrow pause
  var player = localStorage.getItem('player');
  if (player) {
    $(element).html('pause');
    setTimeout(function () {
      if (localStorage.getItem('player')) {
        $('#nav_processo_prox')[0].click();
      }
      }, 7000);
    } else {
      $(element).html('play_arrow');
    }
  }

/**
 * =======================================================================
 * @returns {undefined}
 */
 function definirTelaSlider() {

  var containerImagemWidth = $('#slide-imagem').width();


  var containerImagemHeight = calcularReducaoVertical();
  var containerImagemProporcao = (containerImagemHeight * 100) / containerImagemWidth;
  var contentImagemWidth = $('#img-content').width();
  var contentImagemHeight = $('#img-content').height();
  var contentImagemProporcao = (contentImagemHeight * 100) / contentImagemWidth;


  var containerQuadrado = (containerImagemProporcao > contentImagemProporcao && containerImagemProporcao < 100);
  var containerRetHori = (containerImagemProporcao < contentImagemProporcao && containerImagemProporcao < 100);
  var containerRetVert = (containerImagemProporcao > 100);

  var contentQuadrado = (contentImagemProporcao > containerImagemProporcao && contentImagemProporcao < 100);
  var contentRetHori = (contentImagemProporcao < containerImagemProporcao && contentImagemProporcao < 100);
  var contentRetVert = (contentImagemProporcao > 100);


  if ((containerQuadrado && contentRetHori) ||
    (containerRetVert && contentQuadrado) ||
    (containerRetVert && contentRetHori)) {

    $('#img-content').removeClass('img-content-height');
    $('#img-content').addClass('img-content-width');

    } else if ((containerQuadrado && contentRetVert) ||
      (containerRetHori && contentQuadrado) ||
      (containerRetHori && contentRetVert)) {

      $('#img-content').removeClass('img-content-width');
      $('#img-content').addClass('img-content-height');

    }

  }

  function calcularReducaoVertical() {
    var alturaContainer = $('.container-imagem').height();
    if (!$('#slide-imagem').hasClass('down')) {
      return alturaContainer - (alturaContainer * 0.14);
    }
    return alturaContainer;
  }
