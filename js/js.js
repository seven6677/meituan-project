
//向购物车添加数据
var car; //购物车表格
var count = 0;//购物车商品数量
var carArr = []; //点击加入购物车时将数据存放在这个数组中
function addFood (obj) {
  var nameAndPrice = obj.parentNode.parentNode.children[1];
  var name = nameAndPrice.children[0].innerHTML;
  var price = nameAndPrice.children[1].innerHTML;
  car = document.getElementById("car");
  // var tr=car.insertRow();
  // tr.insertCell(0).innerHTML="<input type='checkbox' onclick='checkAll()'>";
  // tr.insertCell(1).innerHTML=name;
  // tr.insertCell(2).innerHTML=price;
  // tr.insertCell(3).innerHTML="<input type='button' value='删除' onclick='deleteFood(this)'>"
  var food = {
    name: name,
    price: price
  }
  carArr.push(food);
  localStorage.setItem("carData", JSON.stringify(carArr))

  count++;
  setCountValue();
  alert("添加成功");
}
//给购物的数量赋值
function setCountValue () {
  document.getElementById("count").innerHTML = count;
}
//删除食物
function deleteFood (obj) {
  var tr = obj.parentNode.parentNode;
  car.deleteRow(obj.parentNode.parentNode.rowIndex);
  console.log(obj.parentNode.parentNode.children[1])
  count--;
  setCountValue();
  alert("删除成功")
  // carArr = JSON.stringify(carArr);
  for (var i = 0; i < carArr.length; i++) {
    console.log(carArr[i])
    // console.log(obj.parentNode.parentNode.children[1].innerHTML)
    if (obj.parentNode.parentNode.children[1].innerHTML == carArr[i].name) {
      console.log(carArr[i]);
      carArr.splice(i, 1)
    }
  }
}

//全选按钮的实现
function setAll (obj) {
  var rs = car.rows;
  for (var i = 1; i < rs.length; i++) {
    rs[i].cells[0].children[0].checked = obj.checked;
  }
}
//
function checkAll () {
  var rs = car.rows;
  var c = 0;
  for (var i = 1; i < rs.length; i++) {
    if (!rs[i].cells[0].children[0].checked) {
      document.getElementById("all").checked = false;
      break;
    }
    c++;
  }
  if (c == rs.length - 1) {
    document.getElementById("all").checked = true;
    // document.getElementById("se").disabled = true;
  }
  if (c == 0) {
    document.getElementById("all").checked = false;
    // document.getElementById("se").disabled = true;
  }
}
//删除所有选中项
function deleteSelectFood () {
  for (var i = car.rows.length - 1; i > 0; i--) {
    if (car.rows[i].cells[0].children[0].checked) {
      car.deleteRow(i);
      count--;
      setCountValue();
    }
  }
  alert("删除成功");
  checkAll();
  localStorage.clear();
}
//付款
function pay () {
  var rs = car.rows;
  var sum = 0;
  for (var i = 1; i < rs.length; i++) {
    if (rs[i].cells[0].children[0].checked) {
      sum += parseFloat(rs[i].cells[2].innerHTML);
    }
  }
  document.getElementById("money").innerHTML = sum;
}
//显示和隐藏
function showAndHidden () {
  document.getElementById("foodCar").style.display = "block";
  document.getElementById("content").style.display = "none";
  // 在本地存储中拿出数据
  var carData = JSON.parse(localStorage.getItem("carData"));
  for (var i = 0; i < carData.length; i++) {
    var tr = car.insertRow();
    tr.insertCell(0).innerHTML = "<input type='checkbox' onclick='checkAll()'>";
    tr.insertCell(1).innerHTML = carData[i].name;
    tr.insertCell(2).innerHTML = carData[i].price;
    tr.insertCell(3).innerHTML = "<input type='button' value='删除' onclick='deleteFood(this)'>"
  }

}
function show () {
  document.getElementById("foodCar").style.display = "none";
  document.getElementById("content").style.display = "flex";

}
