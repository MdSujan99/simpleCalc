const expKeys = document.getElementsByClassName("expression-keys")[0]
const fnKeys = document.getElementsByClassName("fn-keys")[0]
const expressionText = document.getElementById("expression-text")
const resultText = document.getElementById("result-text")
// const buttonClickSound = new Audio()
// buttonClickSound.src = "mouseClick.mp3"

expKeys.onclick = function(event) {
    // console.log(event)
	if(event.target.nodeName == 'BUTTON'){
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
                resultText.innerText = eval(expressionText.innerHTML)
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
