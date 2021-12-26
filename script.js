const grades = ["6", "5+", "5", "5-", "4+", "4", "4-", "3+", "3", "3-", "2+", "2", "2-", "1"]; 

function refresh() {
    calculate();
}

function calculate() {
    let sprValue = getAverage(document.getElementById("tdSpr"));
    let aktValue = getAverage(document.getElementById("tdAkt"));
    let odpValue = getAverage(document.getElementById("tdOdp"));
    let prjValue = getAverage(document.getElementById("tdPrj"))

    const result = sprValue*0.5 + aktValue*0.2 + odpValue*0.2 + prjValue*0.1;

    document.getElementById("tdRes").innerText = Math.round(result*10000)/10000;
    
    let suggestedGrade = parseInt(result);
    if(parseInt((result.toString()+"0").substring(2, 4)) >= 75) suggestedGrade++;

    document.getElementById("tdSuggestedGrade").innerText = suggestedGrade
}

function getAverage(element) {
    let sum = 0;
    count = element.childElementCount;
    for(let i=0; i<count; i++) {
        sum += parseFloat(element.children[i].value);
    }
    const average = sum / count;

    return average;
}

function addInput(id) {
    const gradeSelect = document.createElement("SELECT");
    grades.forEach(element => {
        let option = document.createElement("OPTION");
        if(element[1] == "+") option.value = `${element[0]}.5`;
        else if(element[1] == "-") option.value = `${parseInt(element[0])-1}.75`;
        else option.value = element;
        option.text = element;
        gradeSelect.appendChild(option);
    });
    gradeSelect.selectedIndex = 2;
    gradeSelect.addEventListener("change", () => refresh())

    document.getElementById(id).append(gradeSelect);
    refresh();
}

function removeInput(id) {
    elem = document.getElementById(id);
    if(elem.childElementCount == 1) return;
    elem.children[elem.childElementCount-1].remove();

    refresh();
}

window.onload = () => {
    addInput("tdSpr")
    addInput("tdAkt")
    addInput("tdOdp")
    addInput("tdPrj")
} 