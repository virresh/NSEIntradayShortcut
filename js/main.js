symList = [];

function getGraphURL(symbol) {
    preurl= 'https://www.nseindia.com/charts/webtame/webchart.jsp?CDSymbol=';
    posturl = '&Segment=CM&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_getQuote_closing_redgreen.jsp';
    return preurl + symbol + posturl;
}

function populateNifty50() {
    symList = [''];
    $.ajax({
        url: "https://www.nseindia.com/content/indices/ind_nifty50list.csv",
        dataType: 'text',
        cache: false
    }).done(function(csvAsString){
        var result = $.csv.toArrays(csvAsString);
        syindex = result[0].indexOf('Symbol');
        console.log("Initialised !");
        var i;
        for (i = 1; i < result.length; i++) {
              symList.push(result[i][syindex]);
        }
        for (i = 0; i < symList.length; i++) { 
            op = document.createElement("option");
            t = document.createTextNode(symList[i]);
            op.appendChild(t);
            selectList.appendChild(op);
        }
        // console.log(syindex);
        // console.log(symList);
    });
}

function loadURI(){
    ind = selectList.selectedIndex;
    console.log(selectList.selectedIndex);
    if (symList[ind]!='') {
        chrome.tabs.update(null, {url: getGraphURL(symList[ind])});
        window.close();
    }
}

function loadURIfromText(){
    ind = document.getElementById("sel2").value;
    if (ind!='') {
        chrome.tabs.update(null, {url: getGraphURL(ind.toUpperCase())});
        window.close();
    }
}

function ready() {
    populateNifty50();
    selectList = document.getElementById("sel1");
    selectList.selectedIndex = -1;
    document.getElementById("openChart").addEventListener("click", loadURI);
    document.getElementById("openChart2").addEventListener("click", loadURIfromText);
    document.getElementById("sel1").addEventListener("change", loadURI);
}

document.addEventListener("DOMContentLoaded", ready);