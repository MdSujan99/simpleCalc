const expKeys = document.getElementsByClassName("expression-keys")[0]
const fnKeys = document.getElementsByClassName("fn-keys")[0]
const expressionText = document.getElementById("expression-text")
const resultText = document.getElementById("result-text")




expKeys.onclick = function(event) {
    // console.log(event)
	if(event.target.nodeName == 'BUTTON'){
        if(event.target.id != 'equals-key-btn'){
            if(expressionText.innerText == "expression text")
                expressionText.innerText = ""
            else if(event.target.innerText === "X"){
                expressionText.innerText += "*"
            }
            else{
                expressionText.innerText += event.target.innerText
            }
        }
        else{
            // evaluate the expressionText
            try{
                // console.log(eval(expressionText.innerText))
                resultText.innerText = eval(expressionText.innerHTML)
            }catch(e){
                console.log(e)
                resultText.innerText = e
            }
            // console.log(eval(expressionText.innerHTML))
        }
	}
}

fnKeys.onclick = function(event) {
    // console.log(event)
	if(event.target.nodeName == 'BUTTON'){
        if(event.target.id == 'fn-AC'){
            expressionText.innerText = ""
            resultText.innerText = ""
        }
        else if(event.target.id == 'fn-del'){
            expressionText.innerText = expressionText.innerText.slice(0,-1)
        }
	}
}
