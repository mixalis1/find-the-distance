"use strict";
const radius=20;
const thePoints=[];
let pointCounter=0;
let toCheckDistance = null;
let info =document.querySelector("#info")

class Point{
    constructor(id,x,y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.element= document.querySelector(`#id${id}`)
    }
}

document.querySelector("html").addEventListener("click",clickHander);

function clickHander(e){
    console.log(e.clientX,e.clientY)
    if(e.target == document.querySelector("#ok")){
        info.style.display="none";
        for(let point of thePoints) point.deselect();
        toCheckDistance = null;
        return true;
        


    }
    
    if (thePoints.length >0){
        for (let point of thePoints){
            if(point.hasBeenClicked(e.x , e.y )){
                console.log("you clicked me3" , point.id);
                if(!toCheckDistance){
                    toCheckDistance=point;
                    point.select();
                }
                else if( toCheckDistance.id !=point.id){
                    point.select();
                    let msg =`the distance from ${toCheckDistance.id} to ${point.id} is ${point.distance(toCheckDistance)}px`;
                    showDistance(msg,point)
                    console.log(msg)
                }
                return true;
            }

        }
        createPoint(e.clientX,e.clientY);

    }
    else createPoint(e.clientX,e.clientY);

}



function showDistance(msg,point){
    document.querySelector("#msg").textContent= msg;
    info.style.display="block";
    info.style.left=`${point.x+30}px`;
    info.style.top=`${point.y+30}px`;
}


Point.prototype.hasBeenClicked= function(x,y){
         let margin =radius *2;
         if((x<this.x + margin) && (x >this.x - margin) &&
         (y<this.y + margin) && (y> this.y - margin)) return true;
         return false; 
        }

        

function createPoint(x,y){
    let pt= document.createElement("div");
    pt.textContent= ++pointCounter;
    pt.setAttribute("class","point");
    pt.setAttribute("id",`id${pointCounter}`)
    pt.style.left= `${x-radius}px`;
    pt.style.top=`${y-radius}px`;
    document.querySelector("html").appendChild(pt);
    thePoints.push(new Point(pointCounter,x,y));
    console.log(thePoints);
}

Point.prototype.select=function(){
    this.element.style.backgroundColor="yellow";
}

Point.prototype.deselect=function(){
    this.element.style.backgroundColor="white";
}


Point.prototype.distance =function(pt){
    return Math.round(Math.sqrt((this.x-pt.x)**2)+(this.y-pt.y)**2)
}
