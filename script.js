let container=document.querySelector("#container");
let buttons=container.querySelectorAll("button");
let display=container.querySelector("#display");
let opdisplay=container.querySelector("#opdisplay");
let operators=["+", "-", "*", "/", "=", "Enter"];
let currentdisplay="";
let ans=0;
let value1=0;
let value2;
let currentvalue=0;
let operator;
let nextoperator;
let btn;

buttons.forEach(function(clicked){
clicked.addEventListener("click", function(e){
    console.log(e.srcElement.textContent);
    num=e.srcElement.textContent;
    processing(num);
})
});

document.addEventListener("keydown", function(e) {
    pressed=document.querySelector(`button[key="${e.key}"]`);
    if (pressed){
    console.log(e.key);
    num=e.key;
    processing(num);
    };
});
    

function processing(){
          
    btn=num;
    
    if (!operators.includes(btn) && btn!="C" && btn!="c" && btn!="Delete"){
        if(currentdisplay.includes(".") && btn=="."){
            display.textContent=currentdisplay;
            value1=Number(currentdisplay);    
        }
        else {
            currentdisplay+=btn;
            display.textContent=currentdisplay;
            value1=Number(currentdisplay);
        }
    }
    else if (btn=="Delete") {
            editedvalue=display.textContent;
            currentdisplay=(editedvalue.toString()).slice(0, (editedvalue.length-1));
            display.textContent=currentdisplay;
            value1=Number(currentdisplay);
            value2=undefined;
    }  
    else if (operators.includes(btn)) {
        let nextoperator=btn;
        currentdisplay="";
        if (value2==undefined) {
            value2=value1;
            value1=0;
            operator=nextoperator;
            if(operator!="Enter" && operator!="="){opdisplay.textContent=operator;};
            
        }
        else {
            currentvalue=operate(value2, operator, value1);
            operator=nextoperator;
            value2=currentvalue;
            value1=0;
            currentdisplay=currentvalue;
            display.textContent=currentdisplay;
            currentdisplay="";
            if(operator!="Enter" && operator!="="){opdisplay.textContent=operator;}
            else {opdisplay.textContent=""};
        }   
    }
    else if((btn)=="C" || btn=="c"){
            value1=currentvalue=operator=nextoperator=0;
            value2=undefined;
            currentdisplay="";
            display.textContent="0";
            opdisplay.textContent="";
    }
};

function adding(a, b){return a+b;};

function subtracting(a, b){return a-b;};

function multiplying(a, b){return a*b;};

function dividing(a, b){
    if (b==0){
        display.textContent="ERROR";
        value1=currentvalue=operator=nextoperator=0;
        value2=undefined;
    }
    else {
        return a/b;
    };
};
         
function operate(a, op, b){
    let f1=a; f2=b;
    if (op=="+") {
        ans= adding(f1, f2);
    }
    else if (op=="-") {
        ans= subtracting(f1, f2);
    }
    else if (op=="*") {
        ans= multiplying(f1, f2);
    }
    else if (op=="/") {
        ans= dividing(f1, f2);
    }
    return Number(ans.toFixed(4));
};