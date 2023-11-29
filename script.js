document.addEventListener("DOMContentLoaded", function () {
    const formOne = document.getElementById("formOne");
    const formTwo = document.getElementById("formTwo");
    const formThree = document.getElementById("formThree");
    const addMoneyButton = document.getElementById("addMoney");
    const addExpensesButton = document.getElementById("addExpenses");
    const cancelMoneyButton = document.getElementById("cancelMoney");
    const cancelExpenseButton = document.getElementById("cancelExpense");
    const submitMoneyButton = document.getElementById("submitMoney");
    const submitExpenseButton = document.getElementById("submitExpense");
    const balance = document.getElementById("balance");
    const description = document.getElementById("description");
    const list = document.getElementById("list");
    const arrayList = [];

    // function for getting the time
    function getTime(time) {
        const now = new Date().getTime();
        const difference = now - time;
    
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
    
        if (seconds < 60) {
            return 'a few seconds ago';
        } else if (minutes === 1) {
            return 'a minute ago';
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours === 1) {
            return 'an hour ago';
        } else {
            return `${hours} hours ago`;
        }
    }
    // function for printing the list 
    function printList(status, amount, description){
        const dateCreated = new Date();
        const insertList = {
            status: status,
            amount: amount,
            description: description,
            date: dateCreated.getTime()
        }
        arrayList.push(insertList);
        list.innerHTML = "";
        for (let i = 0; i < arrayList.length; i++) {
            if (arrayList[i].status === "Expense") {
                const newItem = document.createElement("div");
                newItem.classList.add("flex", "items-end", "gap-5");
                newItem.innerHTML = `
                <h4 class="text-red-500 w-16 font-medium">+ ${arrayList[i].amount}</h4>
                <div class="flex flex-col">
                    <span class="text-slate-400 text-sm font-medium">${arrayList[i].description}</span>
                    <p class="text-md text-violet-500 text-sm font-medium">${getTime(arrayList[i].date)}</p>
                </div>
            `;
            list.appendChild(newItem);
            }
            else{
                const newItem = document.createElement("div");
                newItem.classList.add("flex", "items-end", "gap-5");
                newItem.innerHTML = `
                <h4 class="text-green-500 w-16 font-medium">+ ${arrayList[i].amount}</h4>
                <div class="flex flex-col">
                    <span class="text-slate-400 text-sm font-medium">${arrayList[i].description}</span>
                    <p class="text-md text-violet-500 text-sm font-medium">${getTime(arrayList[i].date)}</p>
                </div>
            `;
            list.appendChild(newItem);
            }
        }
    }
   
    // submit money button
    addMoneyButton.addEventListener("click", function () {
        formOne.classList.add("hidden");
        formTwo.classList.remove("hidden");
        document.getElementById("amountMoney").value = "";
        document.getElementById("descriptionMoney").value = "";
    });
    cancelMoneyButton.addEventListener("click", function () {
        formOne.classList.remove("hidden");
        formTwo.classList.add("hidden");
        document.getElementById("amountMoney").value = "";
        document.getElementById("descriptionMoney").value = "";
    });
    submitMoneyButton.addEventListener("click", function () {
        const amountMoney = document.getElementById("amountMoney").value;
        const descriptionMoney = document.getElementById("descriptionMoney").value;
        if (isNaN(amountMoney) || amountMoney <= 0) {
            alert("Invalid")
            return;
        }
        balance.innerText = (Number(balance.innerText) + Number(amountMoney));
        description.innerText = descriptionMoney;
        printList("Money", amountMoney, descriptionMoney);
        formOne.classList.remove("hidden");
        formTwo.classList.add("hidden");
    }); 
    // submit expense button
    addExpensesButton.addEventListener("click", function () {
        formOne.classList.add("hidden");
        formThree.classList.remove("hidden");
        document.getElementById("amountExpense").value = "";
        document.getElementById("descriptionExpense").value = "";
    });
  
    cancelExpenseButton.addEventListener("click", function () {
        formOne.classList.remove("hidden");
        formThree.classList.add("hidden");
        document.getElementById("amountExpense").value = "";
        document.getElementById("descriptionExpense").value = "";
    });
    submitExpenseButton.addEventListener("click", function () {
        const amountExpense = document.getElementById("amountExpense").value;
        const descriptionExpense = document.getElementById("descriptionExpense").value;
        if (Number(balance.innerText) < amountExpense) {
            alert("Insufficient funds")
            return;
        }
        balance.innerText = (Number(balance.innerText) - amountExpense);
        printList("Expense", amountExpense, descriptionExpense);
        formOne.classList.remove("hidden");
        formThree.classList.add("hidden");
    });

});
