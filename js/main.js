symList = ['','ADANIPORTS' ,'ASIANPAINT' ,'AXISBANK' ,'BAJAJ-AUTO' ,'BAJFINANCE' ,'BAJAJFINSV' ,'BPCL' ,'BHARTIARTL' ,'INFRATEL' ,'CIPLA' ,'COALINDIA' ,'DRREDDY' ,'EICHERMOT' ,'GAIL' ,'GRASIM' ,'HCLTECH' ,'HDFCBANK' ,'HEROMOTOCO' ,'HINDALCO' ,'HINDPETRO' ,'HINDUNILVR' ,'HDFC' ,'ITC' ,'ICICIBANK' ,'IBULHSGFIN' ,'IOC' ,'INDUSINDBK' ,'INFY' ,'KOTAKBANK' ,'LT' ,'LUPIN' ,'M&M' ,'MARUTI' ,'NTPC' ,'ONGC' ,'POWERGRID' ,'RELIANCE' ,'SBIN' ,'SUNPHARMA' ,'TCS' ,'TATAMOTORS' ,'TATASTEEL' ,'TECHM' ,'TITAN' ,'UPL' ,'ULTRACEMCO' ,'VEDL' ,'WIPRO' ,'YESBANK' ,'ZEEL']

function getGraphURL(symbol) {
    preurl= 'https://www.nseindia.com/charts/webtame/webchart.jsp?CDSymbol=';
    posturl = '&Segment=CM&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_getQuote_closing_redgreen.jsp';
    return preurl + symbol + posturl;
}

function loadURI(){
    ind = selectList.selectedIndex;
    console.log(selectList.selectedIndex);
    if (symList[ind]!='') {
        chrome.tabs.update(null, {url: getGraphURL(symList[ind])});
        window.close();
    }
}

function ready() {
    selectList = document.getElementById("sel1");
    selectList.selectedIndex = -1;
    document.getElementById("openChart").addEventListener("click", loadURI);
    document.getElementById("sel1").addEventListener("change", loadURI);
    var i;
    for (i = 0; i < symList.length; i++) { 
        op = document.createElement("option");
        t = document.createTextNode(symList[i]);
        op.appendChild(t);
        selectList.appendChild(op);
    }
    console.log("Initialised !");
}

console.log(symList);
document.addEventListener("DOMContentLoaded", ready);