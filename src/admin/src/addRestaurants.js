const table = document.getElementById("table");

function addMenu() {
  document.getElementById("addMenu").style.display = "block";
  document.getElementById("addMenuBtn").innerHTML = "";
}

function addData() {
  let Food_Name = document.getElementById("Food_Name").value;
  let Price = document.getElementById("Price").value;
  let Description = document.getElementById("Description").value;
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");

  if (Food_Name !== "" && Price !== "" && Description !== "") {
    td1.innerHTML = Food_Name;
    tr.appendChild(td1);
    td2.innerHTML = Price;
    tr.appendChild(td2);
    td3.innerHTML = Description;
    tr.appendChild(td3);
    table.appendChild(tr);
    
    document.getElementById("Food_Name").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("Description").value = "";
  } else {
    alert("Please fill all the fields");
  }
}
