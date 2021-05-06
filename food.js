class Foodyes{
       
    constructor(){
        this.foodstock=0;
        this.lastfeedtime
        this.image=loadImage("FoodStock.png");
    }
    getFood(){
        return(
            this.foodstock
        )
    }
    updateFood(foodstockok){
        this.foodstock=foodstockok
    }
    bedroom(){
        background(bedtime1,550,500);
    }
    gardentime(){
        background(garden1,550,500);
    }
    
    washroomtime(){
        background(washroomtime1,550,500);
    }
    display(){
        var x= 30,y=150;
        imageMode(CENTER);
        // image(this.image,640,220,70,70);
        if(this.foodstock!=0){
            for(var i=0;i<this.foodstock;i++){
                if(i%35==0){
                x=30;
                y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
                // y=y+5
            }
        }
    }
}