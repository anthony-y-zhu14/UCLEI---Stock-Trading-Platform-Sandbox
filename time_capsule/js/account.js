function getAccountInfo(){
    let request = new XMLHttpRequest();
    let url = "/getAccount";

    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let user = JSON.parse(request.responseText);
            renderInfo(user);
        }
    };
    request.open("GET", url);
    request.send();
}


/*
render account info
- purpose: display user account info and stock holding
- in: user object
- out: N/A
*/

function renderInfo(user) {

    

    let account = document.getElementById("account-container");
    let totalBalance = document.getElementById("total-balance-text");
    let investmentBalance = document.getElementById("investment-text");
    let cashBalance = document.getElementById("cash-balance-text");
    let username = document.getElementById("username");

    account.innerHTML = user.account.accountName;
    cashBalance.innerHTML = "$" + (Math.round( parseFloat(user.account.cashBalance) * 100) / 100).toFixed(2);
    investmentBalance.innerHTML = "$" + (Math.round( parseFloat(user.account.investmentBalance) * 100) / 100).toFixed(2);
    totalBalance.innerHTML = "$" + (Math.round( (parseFloat(user.account.cashBalance) + parseFloat(user.account.investmentBalance)) * 100) / 100).toFixed(2) ;
    username.innerHTML = user.name;

    //render the donut chart

    //code goes here



    // render the chart legend

    // code goes here
    let holdingBtn = document.getElementById("holdingBtn");
    
    holdingBtn.addEventListener("click", function(){
        if (activityBtn.classList.contains("selected")){
            activityBtn.classList.remove("selected");  
            activityBtn.style.background = "aliceblue";                   
        } 
        this.classList.add("selected");
        this.style.background = "cornflowerblue";  
        //render the list of stock holding
       
        let holdings = document.getElementById("table-container");    
        holdings.innerHTML = '';

        for (let index = 0; index < user.ownedStocks.length; index++) {
            const element = user.ownedStocks[index];

            let stock = document.createElement("li");
            stock.id = element.name;     
            stock.className = "stock-holding";
            stock.innerHTML = element.name;
            holdings.appendChild(stock);                          

        }
    });
    let activityBtn = document.getElementById("activityBtn");    
    activityBtn.addEventListener("click", function(){
        //render the list of activity
        if (holdingBtn.classList.contains("selected")){
            holdingBtn.classList.remove("selected");  
            holdingBtn.style.background = "aliceblue";                   
        } 
        this.classList.add("selected");
        this.style.background = "cornflowerblue";  


        for (let index = 0; index < user.activity.length; index++){
            const element = user.activity[index];
            console.log(element);
        }

    });

}

getAccountInfo();

