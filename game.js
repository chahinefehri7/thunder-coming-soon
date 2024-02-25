var play = document.getElementById('play');
var maxScore = document.getElementById('maxScore');
var currentScore = document.getElementById('currentScore');
var rocket = document.getElementById('rocketImg');
var currentScore = document.getElementById('currentScore');
var player = document.getElementById('player');
var block = document.getElementById('blockIMG');
var grayBackground = document.getElementById('gray-background');
var gameBackground = document.getElementById('gameBackground');
var GameSong1 = document.getElementById('GameSong1');
var GameOverSound = document.getElementById('GameOver');

// changing the block image counter
var changeBlock = 0;
// counting score variable
var scoreCounter = 0;
// intervalDuration
var blockSpeed = 0;
let intervalDuration = 4000;
// blockTime
var blockTime =3000;
 

function theBlockAnimation(){
    // block.style.display="unset"
    block.classList.add('blocksAnimation'); // add the animation of the block


    setTimeout(function(){
        // the block duration speed
        block.style.animationDuration=blockTime+"ms";
        block.classList.remove("blocksAnimation"); //removing the animation
        changeBlock++
    } ,blockTime)
}



play.addEventListener('click' , function(){

    // playing the song
    GameSong1.play();
    // starting the game
    grayBackground.style.display="none"
    player.src = "images/charachterMove.gif";
    block.style.display="unset";
    rocket.style.display="unset";
    currentScore.innerText="00";
    scoreCounter=0;
    gameBackground.style.filter="unset"
    block.src="images/block.png";
    // game over checking 
    GameOver = false;
    if(document.cookie.length != 0){
        var maxScoreArrey = document.cookie.split("=");
        var maxScoreCounter = Number(maxScoreArrey[1]);
        maxScore.innerText = maxScoreCounter;
    }else{
        var maxScoreCounter = 0;
    }

    // block animation 
    // enemy block animation
    var blockAnimation = setInterval(() => {
        theBlockAnimation();
    },intervalDuration);
    function changeInterval(newIntervalTime,newBlockTime) {
        // Clear the existing interval
        clearInterval(blockAnimation);
        
        // Set a new interval with the updated timing
        var blockAnimation = setInterval(() => {
            theBlockAnimation();
        }, newIntervalTime);
    } 
    // game score 
    var gamescore = setInterval(() => {
        scoreCounter++;
        currentScore.innerText=scoreCounter;
        if(scoreCounter%100==0){
            if(blockTime>600){
                blockTime=blockTime-100;
                // the block duration speed
                block.style.animationDuration=blockTime+"ms";
            }
            if(gameBackground.style.filter!="invert()"){
                gameBackground.style.filter="invert()";
                block.src = "images/block1.gif";
            }else{
                gameBackground.style.filter="unset"
                block.src="images/block.png";
            }
        }
        if(scoreCounter%500==0){
            if(intervalDuration>1500){
                intervalDuration=blockTime*2;
                changeInterval(intervalDuration);
            }
        }
    }, 100);

    function getPositionDuringAnimation(animatedElement) {
        // Get the current position of the animated element
        const element = animatedElement.getBoundingClientRect();
        
        // return the position of an element
        return (element);
    }
// check if the player is dead or not
    var checkDead = setInterval(function(){
        var blockLeft = getPositionDuringAnimation(block).left;
        var blockRight = getPositionDuringAnimation(block).right;
        var playerRight = getPositionDuringAnimation(player).right;
        var playerLeft = getPositionDuringAnimation(player).left;
        // first test
        // (blockLeft<(playerRight-(getPositionDuringAnimation(player).width)/2)) 
        // second test
        // (getPositionDuringAnimation(player).bottom>getPositionDuringAnimation(block).top) 
        // third test
        // (blockRight<(playerLeft+(getPositionDuringAnimation(player).width)))

        if((blockLeft<(playerRight-(getPositionDuringAnimation(player).width)/2)) && (getPositionDuringAnimation(player).bottom>getPositionDuringAnimation(block).top) && (blockRight>(playerLeft+(getPositionDuringAnimation(player).width)))){
            GameOver=true;
        }
        if(GameOver){
            if(scoreCounter>maxScoreCounter){
                maxScoreCounter=scoreCounter;
                maxScore.innerText=scoreCounter;
                document.cookie = "MaxScore = "+scoreCounter+";" + "expires=Fri, 31 May 2024 01:00:00 UTC;";
            }
            // var itemGameScore = document.cookie = "itemGameScore = "+itemScore;
            // if(itemScore>itemGameScore){
            //     document.cookie = "itemGameScore = "+itemScore;
            // }
            block.style.display="none";
            rocket.style.display="none";
            currentScore.innerText="00";
            scoreCounter=0;
            GameSong1.pause();
            GameSong1.currentTime = 0;
            GameOverSound.play();
            clearInterval(gamescore);
            clearInterval(blockAnimation);
            clearInterval(checkDead);
            // starting the game
            grayBackground.style.display="unset"
            player.src = "images/charachter2.png";               
        }
},1);

    // jumping animation
    window.addEventListener('keydown' , e =>{
        if(e.keyCode==32){
            if(player.classList != "jump-animation"){
                player.classList.add('jump-animation');
                player.src="images/charachter.png";
                if(grayBackground.style.display!="none"){
                    play.click();
                }
            }
            setTimeout(function(){
                player.classList.remove("jump-animation")
                player.src="images/charachterMove.gif";
            } ,500)
        }
    })
    // jump animation on touche screens
    document.addEventListener('touchstart' , e =>{
            e.preventDefault();
            if(player.classList != "jump-animation-mobile"){
                player.classList.add('jump-animation-mobile');
                player.src="images/charachter.png";
            }
            setTimeout(function(){
                player.classList.remove("jump-animation-mobile")
                player.src="images/charachterMove.gif";
                move = 0;
            } ,500)
    })

    // charachter down
    window.addEventListener('keydown' , e =>{
        if(e.keyCode==40){
                player.classList.remove("jump-animation")
        }
        window.addEventListener('keyup' , keyup =>{
            if(e.keyCode==40){
                if(player.classList != "jump-animation"){
                    player.src="images/charachterMove.gif";
                }
            }
        })
    })
});