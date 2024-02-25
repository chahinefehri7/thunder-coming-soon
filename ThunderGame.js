var playGround = document.getElementById('playGround');
var player = document.getElementById('player');
var block = document.getElementById('block');
var blockIMG = document.getElementById('blockIMG');
var score = document.getElementById('score');
var rocket = document.getElementById('Rocket');
var scoreup = document.getElementById('scoreup');
var playPopupBackground = document.getElementById('playPopupBackground');
var playTheGameBtn = document.getElementById('playTheGameBtn');
var startingIn = document.getElementById('startingIn');
var alertMsg = document.getElementById('alert');
var itemScoreNbr = document.getElementById('itemScoreNbr');
var maxScore = document.getElementById('maxScore')
var maxScoreCounter = 0;
window.addEventListener('keydown' , (gunshout)=>{
    if(gunshout.keyCode == 13){
        player.src = "images/gunshouting.gif"
    }
})
playTheGameBtn.addEventListener('click' , function(){
    player.src="images/charachter.png";
    player.style.left = "1%";
    var startCounter = 5;
    var blockTime =5000;
    var scoreCounter=0;
    var rocketTime =2000;
    var itemTime =2000;
    var changeBlock = 1;
    var movementSpeed = 0.6;
    var leftmove = 1;
    var intervalDuration = 5000;
    var move = 0;
    var itemScore = 0;
    itemScoreNbr.innerText = itemScore
    var bulletStock = 3;
    var GameOver = false;
    startingIn.style.opacity = "1";


    for(var i=1;i<=bulletStock;i++){
        let reloadBullets = document.getElementById('bullet-'+i);
        reloadBullets.style.opacity = "1";
    }
    console.log("bullet Stock "+bulletStock)

    startingIn.innerText = startCounter;
    var contingstart = setInterval(() => {
        startCounter = startCounter -1
        startingIn.innerText = startCounter;
        if(startCounter == 0){
            startingIn.style.opacity = "0";
        }
    }, 1000);

    playPopupBackground.style.visibility="hidden";
    block.style.display="unset";
    rocket.style.display="unset";
    // enemy block animation
    var blockAnimation = setInterval(() => {
        block.style.display="unset"
        // changing the image source of a block charachter 
        switch(changeBlock){
            case 1 : blockIMG.src="images/block1.gif" ;break;
            case 2 : blockIMG.src="images/block.png";break;
            case 3 : blockIMG.src="images/block1.gif";break;
            default: changeBlock=0;
        }
        changeBlock++
        block.classList.add('block'); // add the animation of the block
        // the block duration speed
        if(blockTime>1000){
            blockTime=blockTime-100
            intervalDuration=blockTime
            block.style.animationDuration=blockTime+"ms";
        }
        setTimeout(function(){
            block.classList.remove("block"); //removing the animation
        } ,blockTime)
    },intervalDuration);

    // shouting animation
    var shout = setInterval(() => {
        let rocketDrop = Math.floor(Math.random() *100) + 1;
        rocket.classList.add('rocketshout');
        rocket.style.left=rocketDrop+"%";
        // rocket speed
        if(rocketTime>1000){
            rocketTime=rocketTime-50
            rocket.style.animationDuration=rocketTime+"ms";
        }
        setTimeout(function(){
            rocket.classList.remove("rocketshout")
        } ,rocketTime)
    },rocketTime+1000);
    // drop items to collect
    var itemId = 1;
    var dropItem = setInterval(() => {
        var itemNav = document.createElement('nav');
        var itemImg = document.createElement('img');

        itemNav.classList.add("itemStyle");
        itemNav.setAttribute("id",itemId)
        itemImg.src = "images/item.png";

        itemNav.appendChild(itemImg);
        playGround.appendChild(itemNav);
        var newItem = itemNav.parentNode;

        let itemPosition = Math.floor(Math.random() *693) + 1;
        itemNav.style.left=itemPosition+"px";
        itemNav.classList.add('DropItem');
        setInterval(() => {
            itemNav.style.top = "99%"
        }, 2000);
        // item drop delay
        if(itemTime>1000){
            itemTime=itemTime-50
            itemNav.style.animationDuration=itemTime+"ms";
        }
        var itemIsFading = setInterval(() => {
            itemNav.classList.remove('DropItem')
            itemNav.classList.add('fade');
        }, 5000);
        var itemGone = setTimeout(() => {
            newItem.removeChild(itemNav);
            clearInterval(CheckPickingTheItem)
        }, 7000);
        var CheckPickingTheItem = setInterval(function(){
            // collecting items
            let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            let blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('right'));
            let playerRight = parseInt(window.getComputedStyle(player).getPropertyValue('right'));
            let playerLeft= parseInt(window.getComputedStyle(player).getPropertyValue('left'));
            let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
            let itemleft = itemPosition;
            let itemright = 693-itemPosition;
            let itemTop = itemNav.style.top


            if(itemleft-70<=playerLeft && itemright-10<=playerRight && playerBottom<=7 && itemTop ==="99%"){
                newItem.removeChild(itemNav)
                itemScore++
                itemScoreNbr.innerText = itemScore
                clearInterval(CheckPickingTheItem);
                clearInterval(itemGone);
            }
            if(blockleft<=playerLeft+32 && blockRight<=playerRight-200 && playerBottom<=30){
                clearInterval(CheckPickingTheItem);
                clearInterval(itemGone);
                clearInterval(itemIsFading)
                newItem.removeChild(itemNav);
                return GameOver =true
            }
        },1);
    },14000);
    // bullets Dropping 
    var bulletId = "giftedBullet";
    var DropBullets = setInterval(() => {
        var bulletNav = document.createElement('nav');
        var bulletImg = document.createElement('img');

        bulletNav.classList.add("bulletStyle");
        bulletNav.setAttribute("id",bulletId)
        bulletImg.src = "images/bullet.png";

        bulletNav.appendChild(bulletImg);
        playGround.appendChild(bulletNav);
        var newBullet = bulletNav.parentNode;

        let giftedBulletPosition = Math.floor(Math.random() *693) + 1;
        bulletNav.style.left=giftedBulletPosition+"px";
        bulletNav.classList.add('DropBullet');
        setInterval(() => {
            bulletNav.style.top = "99%"
        }, 3000);
        // item drop delay
        // if(itemTime>1000){
        //     itemTime=itemTime-50
        //     itemNav.style.animationDuration=itemTime+"ms";
        // }
        var bulletIsFading = setInterval(() => {
            bulletNav.classList.remove('DropBullet')
            bulletNav.classList.add('fade');
        }, 5000);
        var BulletGone = setTimeout(() => {
            newBullet.removeChild(bulletNav);
            clearInterval(CheckPickingTheBullet)
        }, 7000);
        var CheckPickingTheBullet = setInterval(function(){
            // collecting bullets
            let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            let blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('right'));
            let playerRight = parseInt(window.getComputedStyle(player).getPropertyValue('right'));
            let playerLeft= parseInt(window.getComputedStyle(player).getPropertyValue('left'));
            let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
            let bulletLeft = giftedBulletPosition;
            let bulletRight = 693-giftedBulletPosition;
            let BulletTop =bulletNav.style.top;

            if(bulletLeft-70<=playerLeft && bulletRight<=playerRight-370 && playerBottom<=7 && BulletTop=="99%"){
                newBullet.removeChild(bulletNav);
                if(bulletStock<3){
                    bulletStock++;
                    let bulletPicked = document.getElementById("bullet-"+bulletStock);
                    bulletPicked.style.opacity = "1";
                    console.log("your magazin Stock "+bulletStock);
                }
                clearInterval(CheckPickingTheBullet);
                clearInterval(BulletGone);
            }
            if(blockleft<=playerLeft+32 && blockRight<playerRight && playerBottom<=30){
                clearInterval(CheckPickingTheBullet);
                clearInterval(BulletGone);
                clearInterval(bulletIsFading);
                newBullet.removeChild(bulletNav);
                return GameOver =true;
            }
        },1);
    },6000);
    // game score 
    var gamescore = setInterval(() => {
        scoreCounter++;
        score.innerText=scoreCounter;
        if(scoreCounter%100==0){
            scoreup.play();
        }
        if(scoreCounter%200==0 && movementSpeed<2){
            movementSpeed=movementSpeed+0.2
            return movementSpeed;
        }
    }, 100);
    // 
    window.addEventListener('keydown' , e =>{
        if(e.keyCode==32){
            if(player.classList != "animation"){
                player.classList.add('animation');
                player.src="images/charachter2.png";
            }
            setTimeout(function(){
                player.classList.remove("animation")
                player.src="images/charachter.png";
                move = 0;
            } ,500)
        }
    })

    // check if the player is dead or not
    var checkDead = setInterval(function(){
            let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
            let blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('right'));
            let playerRight = parseInt(window.getComputedStyle(player).getPropertyValue('right'));
            let playerLeft= parseInt(window.getComputedStyle(player).getPropertyValue('left'));
            let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
            let rocketBottom = parseInt(window.getComputedStyle(rocket).getPropertyValue('bottom'));
            let rocketLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue('left'));
            let rocketRight = parseInt(window.getComputedStyle(rocket).getPropertyValue('right'));

            if(blockleft<=playerLeft+32 && blockRight<=playerRight && playerBottom<=30){
                GameOver = true;
                alertMsg.innerText = "You're Dead";
            }
            if(rocketBottom<75 && rocketLeft>playerLeft && rocketRight>playerRight){
                GameOver = true;
                player.src="images/explose.gif";
                alertMsg.innerText = "watch out the bombs";
            } 
            if(GameOver){
                if(scoreCounter>maxScoreCounter){
                    maxScoreCounter=maxScore.innerText;
                    maxScore.innerText=scoreCounter;
                }
                var itemGameScore = document.cookie = "itemGameScore = "+itemScore;
                if(itemScore>itemGameScore){
                    document.cookie = "itemGameScore = "+itemScore;
                }
                block.style.display="none";
                rocket.style.display="none";
                score.innerText="00";
                scoreCounter=0;
                leftmove=1;
                alertMsg.style.color = "red";
                clearInterval(gamescore);
                clearInterval(blockAnimation);
                clearInterval(contingstart);
                clearInterval(shout);
                clearInterval(checkDead);
                clearInterval(dropItem);
                clearInterval(DropBullets);
                playPopupBackground.style.visibility="visible";
            }
    },1);
    window.addEventListener('keydown', function(event){
        if(move<2){
            move++;
        }
        let playeSRC = player.src;
        // move left
        if(event.keyCode==37){
            if(leftmove>0){
                leftmove=leftmove-movementSpeed;
                player.style.left = leftmove+"%";
                if(move==1 && playeSRC!="images/charachterMoveLeft.gif"){
                    player.src="images/charachterMoveLeft.gif";
                }
            }
        }
        // move right 
        if(event.keyCode==39){
            if(leftmove<94){
                leftmove=leftmove+movementSpeed;
                player.style.left = leftmove+"%";
                if(move==1 && playeSRC!="images/charachterMove.gif"){
                    player.src="images/charachterMove.gif";
                }

            }
        }
        // shouting
        if(event.keyCode==16){
            if(move==1 && playeSRC!="images/shoutingAnimation.gif" && bulletStock>0){
                player.src="images/shoutingAnimation.gif";
                var shoutingBullets = setInterval(() => {
                    // losing bullets 
                    let bullet = document.getElementById("bullet-"+bulletStock);
                    bullet.style.opacity="0.5";
                    bulletStock --;
                    if(bulletStock==0){
                        var outOfBullets = setTimeout(() => {
                            player.src="images/charachter.png";
                            clearInterval(shoutingBullets);
                            clearInterval(outOfBullets);
                        },600);
                    }
                    // creating firing bullet
                    var bulletFireImg = document.createElement("img");
                    var bulletFireNav = document.createElement("nav");
                    bulletFireImg.src ="images/fire.png";

                    // giving the bullet an id "bulletFired"
                    bulletFireNav.setAttribute("id","bulletFired");
                    // giving it a style class
                    bulletFireNav.classList.add("bulletfireStyle")
                    // giving the position of the firing
                    bulletFireNav.style.left=(parseFloat(player.style.left)+7)+"%";
                    // giving the bullet an Animation
                    bulletFireNav.classList.add("fireAnimation")
                    // append the bulletFire to the play Ground
                    bulletFireNav.appendChild(bulletFireImg)
                    playGround.appendChild(bulletFireNav);
                    // giving the New Fire bullet the parent Node
                    var newFireBullet = bulletFireNav.parentNode;
                    console.log(bulletStock+" bullets left");
                    // interval to delete the old Fired bullet
                    var DeleteTheOldBullet = setInterval(() => {
                        newFireBullet.removeChild(bulletFireNav);
                        clearInterval(DeleteTheOldBullet);
                        clearInterval(TestingFiringBulletKill);
                    }, 1000);
                    // checking if the bullet hit the enemey or not
                    var TestingFiringBulletKill = setInterval(() => {

                        let theFiredBullet = document.getElementById('bulletFired'); // get the fired bullet

                        // get the positions of the block and the fired bullet
                        let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
                        let bulletFireLeftPosition = parseInt(window.getComputedStyle(theFiredBullet).getPropertyValue('left'));
                        // checking
                        if(bulletFireLeftPosition>=blockleft){
                            newFireBullet.removeChild(bulletFireNav);
                            clearInterval(DeleteTheOldBullet);
                            clearInterval(TestingFiringBulletKill);
                            // check if you can kill that enemy or not
                            if(changeBlock!=3){
                                block.style.display="none"
                            }
                        }
                        // let bulletFireLeft = (window.getComputedStyle(bulletFireNav).getPropertyValue('translateX'));
                    }, 1);
                }, 775);
                if(GameOver){
                    clearInterval(shoutingBullets);
                }
                
            }
        }
        window.addEventListener('keyup' ,()=>{
            clearInterval(shoutingBullets);
            player.src="images/charachter.png";
            move = 0;
        })
    });
});


// click and hold class
// class clickAndHold{
//     /**
//      * 
//      * @param {EventTarget} target the html elements to apply the event on
//      * @param {Function} callback The Function to run once target is clicked and held
//      */
//     constructor(target, callback){
//         this.target = target;
//         this.callback = callback;
//         this.isHeld = flase;
//         this.activeHoldTimeoutId = null;

//         ["keydown" , "touchstart" ].forEach(type => {
//             this.target.addEventListener('type' , this._onHoldStart.bind(this))
//         });

//         ["keyup" , "touchend" , "touchecancel"].forEach(type => {
//             this.target.addEventListener('type' , this._onHoldEnd.bind(this))
//         });
//     }
//     _onHoldStart() {
//         this.isHeld = true;
//         this.activeHoldTimeoutId = setInterval(() => {
//             if(this.isHeld){
//                 this.callback();
//             }
//         }, 1000);
//     }

//     _onHoldEnd() {
//         this.isHeld = false;
//         clearInterval(this.activeHoldTimeoutId)
//     }
// }
// call the class to move player while holding down key (arrowRight / arrowLeft)
// new clickAndHold(buttonToHold, () =>{
// })