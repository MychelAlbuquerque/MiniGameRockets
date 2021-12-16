

function start() { // Inicio da função start() - Inicia no clique

    //variáveis:
    var jogo = {}
    var tecla = {
        up: 38,
        down: 40,
        right: 39
    }
    jogo.pressionou = [];

    var velocidade = 10;
    var posicaoY = parseInt(Math.random() * 334);
    var posicaoYf = parseInt(Math.random() * 330);

    var podeAtirar = true;    

    var pontos = 0;
    var vidas = 10;
    
    var fimdejogo = false;

    $("#inicio").hide(); // esconde a "janela" inicial
    $("#fundoGame").append("<div id='rocket' class= 'animaRocket' ></div>"); // adiciona foguete e animação.
    $("#fundoGame").append("<div id='bluecomet' class = 'animaBlueComet'></div>"); // adiciona cometa azul. 
    $("#fundoGame").append("<div id='firecomet' class = 'animaFireComet'></div>"); // adiciona cometa fire.
    $("#fundoGame").append("<div id='placar'></div>"); // insere o placar
    
    somFundo.play();//musica de fundo

    //game loop:
    jogo.timer = setInterval(loop, 30);
    function loop() {
        movefundo();
        movejogador();
        movebluecomet();
        movefirecomet();
        colisaoUm();
        colisaoDois();
        colisaoTres();
        colisaoQuatro();
        placar();
        vidas==0 ? gameOver(): vidas=vidas;
    } // Fim da função loop()


    //Verifica se o usuário pressionou alguma tecla	
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);
    } // fim da função movefundo()

    function movejogador() {
        if (jogo.pressionou[tecla.up]) {
            var topo = parseInt($("#rocket").css("top"));
            $("#rocket").css("top", topo - 10);
            if (topo <= 0) {
                $("#rocket").css("top", topo + 10);
            }
        }
        if (jogo.pressionou[tecla.down]) {
            var topo = parseInt($("#rocket").css("top"));
            $("#rocket").css("top", topo + 10);
            if (topo> 555) {
                $("#rocket").css("top", topo - 10);
            }
        }
        if (jogo.pressionou[tecla.right]) {
            disparo();//Chama função Disparo
        }
    } // fim da função movejogador()

    function movebluecomet() {
        posicaoX = parseInt($("#bluecomet").css("left"));
        $("#bluecomet").css("left", posicaoX - velocidade);
        $("#bluecomet").css("top", posicaoY);

        if (posicaoX <= -5) {
            
            posicaoY = parseInt(Math.random() * 334);
            $("#bluecomet").css("left", 720);
            $("#bluecomet").css("top", posicaoY);
            velocidade += 0.09;
        }
    } //Fim da função move bluecomet()

    function movefirecomet() {

        posicaoX = parseInt($("#firecomet").css("left"));
        $("#firecomet").css("left", posicaoX - (1.3 * velocidade));
        $("#firecomet").css("top", posicaoYf);

        if (posicaoX <= -5) {
            
            posicaoYf = parseInt(Math.random()*330);
            $("#firecomet").css("left", 604);
            $("#firecomet").css("top", posicaoYf);
        }
    } //Fim da função move firecomet()

    function colisaoUm() { // colisao entre o foguete e o blue comet. 
        var colisao1 = ($("#rocket").collision($("#bluecomet")));
        if (colisao1.length > 0) {
            vidas>0 ? vidas--: vidas;
            somImpacto.play();
            rocketX = (parseInt($("#rocket").css("left")) + 190);
            rocketY = parseInt($("#rocket").css("top"));
            explosao1(rocketX, rocketY);
            posicaoY = parseInt(Math.random() * 334);
            $("#bluecomet").css("left", 694);
            $("#bluecomet").css("top", posicaoY);
        }
    }// Fim da função colisaoUm

    function colisaoDois() { // colisao entre o foguete e o fire comet. 
        var colisao2 = ($("#rocket").collision($("#firecomet")));
        if (colisao2.length > 0) {
            vidas>0 ? vidas--: vidas;
            somImpacto.play();
            rocketXf = (parseInt($("#rocket").css("left")) + 190);
            rocketYf = parseInt($("#rocket").css("top"));
            explosao2(rocketXf, rocketYf);
            posicaoYf = parseInt(Math.random() * 604);
            $("#firecomet").css("left", 694);
            $("#firecomet").css("top", posicaoYf);
        }
    }// Fim da função colisaoDois

    function colisaoTres() { // colisao entre o disparo e o blue comet. 
        var colisao3 = ($("#disparo").collision($("#bluecomet")));
        if (colisao3.length > 0) {
            pontos++;
            somExplosao.play();
            inimigo1X = (parseInt($("#bluecomet").css("left")) + 190);
            inimigo1Y = parseInt($("#bluecomet").css("top"));
            explosao3(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);
            posicaoY = parseInt(Math.random() * 604);
            $("#bluecomet").css("left", 694);
            $("#bluecomet").css("top", posicaoY);
        }
    }// Fim da função colisaoTres()

    function colisaoQuatro() { // colisao entre o disparo e o fire comet. 
        var colisao4 = ($("#disparo").collision($("#firecomet")));
        if (colisao4.length > 0) {
            pontos++;
            somExplosao.play();
            inimigo2X = (parseInt($("#firecomet").css("left")) + 190);
            inimigo2Y = parseInt($("#firecomet").css("top"));
            explosao4(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);
            posicaoYf = parseInt(Math.random() * 604);
            $("#firecomet").css("left", 694);
            $("#firecomet").css("top", posicaoYf);
        }
    }// Fim da função colisaoQuatro()



    function explosao1(rocketX, rocketY) {
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/chama.png)");
        var div = $("#explosao1");
        div.css("top", rocketY);
        div.css("left", rocketX);
        div.animate({ width: 100, opacity: 0 }, 400);
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }

    } // Fim da função explosao1()

    function explosao2(rocketXf, rocketYf) {

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/flames.png)");
        var div = $("#explosao2");
        div.css("top", rocketYf);
        div.css("left", rocketXf);
        div.animate({ width: 100, opacity: 0 }, 400);

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {

            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }// Fim da função explosao2()
    function explosao3(inimigo1X, inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/chama.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 100, opacity: 0 }, 400);

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {

            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
       

    } // Fim da função explosao3
    function explosao4(inimigo2X, inimigo2Y) {
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/flames.png)");
        var div = $("#explosao2");
        div.css("top", inimigo2Y);
        div.css("left", inimigo2X);
        div.animate({ width: 100, opacity: 0 }, 400);

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
       

    } // Fim da função explosao4

    function disparo() {

        if (podeAtirar == true) {
            podeAtirar = false;
            topo = parseInt($("#rocket").css("top"))
            posicaoX = parseInt($("#rocket").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo' class='animaDisparo' ></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 35);
            
            if (posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
                
            }
            somDisparo.play();
            
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function placar() {

        $("#placar").html("<h2> Pontos: " + pontos + " Vidas: " + vidas +"</h2>");

    } //fim da função placar()

     
     function gameOver() { //Função GAME OVER
        somFundo.pause();
        somOver.play();
        fimdejogo = true;
        

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#rocket").remove();
        $("#bluecomet").remove();
        $("#firecomet").remove();
        

        $("#fundoGame").append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick= reiniciaJogo() ><h3>Clique aqui para Jogar Novamente</h3></div>");
    } // Fim da função gameOver();

} //fim da Start()

function reiniciaJogo() {
        
    $("#fim").remove();
    start();

} //Fim da função reiniciaJogo 