const expKeys = document.getElementsByClassName("expression-keys")[0]
const fnKeys = document.getElementsByClassName("fn-keys")[0]
const expressionText = document.getElementById("expression-text")
const resultText = document.getElementById("result-text")
const buttonClickSound = new Audio()
buttonClickSound.src = "mouseClick.mp3"


// for creating a stack 
class Stack {
    constructor(){
       this.top = -1;
       this.stack = [];
    }
 
    isEmpty(){
       if(this.top == -1){
          return true;
       }
       return false;
    }
    
    peek(){
       if(this.isEmpty())
          return -1;
       return this.stack[(this.top)];
    }
 
    push(val){
       this.stack[++(this.top)] = val;
       if(!this.peek() == val){
          return 'error, not pushed'  
       }
    }
 
    pop(){
       if(this.isEmpty() == true)
          return "stack is empty!";
       return this.stack[(this.top)--];
    }
 }
 //for comparing incoming opr precendece
 function inPrec(input) 
 { 
     switch (input) { 
     case '+': 
     case '-': 
         return 2; 
     case '*': 
     case '%': 
     case '/': 
         return 4; 
     case '(': 
         return 0; 
     } 
 } 
 //for comparing incoming opr precendece
 function outPrec(input) 
 { 
     switch (input) { 
     case '+': 
     case '-': 
         return 1; 
     case '*': 
     case '%': 
     case '/': 
         return 3; 
     case '(': 
         return 100; 
     } 
 } 
 //checks if a string is alphanumeric or not
 function isAlNum(str)
 {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if( str.match(letterNumber) )
       return true;
    return false;
 }
 //checks if a string string is a math opr or not
 function isOperator(ch){
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%');
 }
 //converts an infix expression string to a postfix expression
 function infixToPostfix(exp){
    var stack = new Stack();
    var output = [];
    console.log("expression:"+exp)
    for(let i=0;i<exp.length;i++)
    {  
       console.log("exp["+i+"] : "+exp[i]);
 
       if( isAlNum(exp[i]) ){
          
          output.push(exp[i]);
       }
       else if( isOperator(exp[i]) )
       { 
          if(stack.isEmpty()){
             stack.push(exp[i]);
          }
          else if(outPrec(exp[i]) > inPrec(stack.peek()) )
          {
             stack.push(exp[i]);
          }
          else if( outPrec(exp[i]) <= inPrec(stack.peek()) )
          { 
             while(outPrec(exp[i]) <= inPrec(stack.peek()) ){
                output.push(stack.pop());
             }
             stack.push(exp[i]);
          }
       }
       else if(exp[i] == "(")
       {
          stack.push(exp[i]);
       }
       else if(exp[i] == ")")
       {
          while(stack.peek() != '(')
          {
             output.push(stack.pop());
             if(stack.isEmpty()) 
                return "Invalid Input! Exiting...\n"
          }
          
          stack.pop();
       }
       console.log("output at i:"+i+"\t:\t"+output)
    }
    while(stack.isEmpty() == false){
       if(stack.peek() == '('){
          return "Invalid Input! Exiting...\n";
       }
       output.push(stack.pop());
    }
    return output;
 }
 //evaluates a postfix expression
 function postfixEval(exp){
    var stack = new Stack();
    var A = 0, B = 0, res = 0;
    for(let i=0;i<exp.length;i++){
       console.log("exp["+i+"]:\t"+exp[i]);
       if(isOperator(exp[i])){
          B = stack.pop();
          A = stack.pop();
          console.log("A:\t"+A+"\tB:\t"+B)
          switch(exp[i]){
             case '+' :   res = A + B;
                         break;
             case '-' :   res = A - B;
                         break;
             case '*' :   res = A * B;
                         break;
             case '/' :   if(B == 0)
                            return "Invalid Operation: Divide By O error";
                         res = A / B;
                         break;
             case '%':   if(B == 0)
                            return "Invalid Operation: Divide By O error";
                         res = A % B;
                         break;
             default :   return "Invalid Operator";
          }
          console.log("Result:\t"+res)
          stack.push(res);   
       }
       else{
          if(isNaN(exp)){
 
          }
          stack.push(parseInt(exp[i]));
       }
    }
    return stack.pop();
 }
 //converts an expression string into tokenized form consisting of variables and opr only
 function variablise(exp){
    var output = [];
    var num = '';
    for(let i=0;i<exp.length;i++)
    {
       console.log("exp["+i+"] : "+exp[i]);
       if(isNaN(exp[i]))
       {
          console.log("num : "+num)
          if(exp[i] != '(')
             output.push(num);
          num = '';
          output.push(exp[i]);
       }
       else
          num += exp[i];
    }
    if(num != '')
       output.push(num);
    return output;
 }
 
 function calc(exp){
    console.log("Input Expression: "+exp);
    exp = variablise(exp);
    console.log("Variabalised Expression: "+exp);
    // 10213*145-/+
    exp = infixToPostfix(exp);
    console.log("Postfix Expression: "+exp);
    exp = postfixEval(exp);
    console.log("Output Expression: "+exp);
    return exp;
 }
 console.log(variablise("78*6"));
expKeys.onclick = function(event) {
    // console.log(event)
	if(event.target.nodeName == 'BUTTON'){
		buttonClickSound.play()
		buttonClickSound.src = "mouseClick.mp3"
        if(event.target.id != 'equals-key-btn'){
            if(expressionText.innerText == "expression text:"){
                expressionText.innerText = ""
            }
            if(event.target.innerText === "X"){
                expressionText.innerText += "*"
            }
            else if(expressionText.innerText.length <= 26){
                expressionText.innerText += event.target.innerText
            }
            else{
                alert("expression too long")
            }
        }
        else
        { 
            try{
                resultText.innerText = calc(expressionText.innerText)
            }catch(e){
                console.log(e)
                resultText.innerText = e
            }
        }
	}
}

fnKeys.onclick = function(event) {
    // console.log(event)
	if(event.target.nodeName == 'BUTTON'){
        if(event.target.id == 'fn-AC'){
            expressionText.innerText = ""
            resultText.innerText = "result-text"
        }
        else if(event.target.id == 'fn-del'){
            expressionText.innerText = expressionText.innerText.slice(0,-1)
        }
        // else if(event.target.id == 'fn-ON-OFF'){
        //     expressionText.innerText =
        // }
	}
}
