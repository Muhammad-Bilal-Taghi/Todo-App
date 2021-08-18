var list =  document.getElementById("list");

firebase.database().ref('todos').on('child_added',function(data){
 // Create li tag with text node  
    var li = document.createElement('li') 
    var litext = document.createTextNode(data.val().value)
    li.appendChild(litext)

//     // create delete btn
       var dltbtn = document.createElement('button')
       var deltext = document.createTextNode("DELETE")
       dltbtn.setAttribute("class", "btn")
       dltbtn.setAttribute('id',data.val().key)
       dltbtn.setAttribute("onclick" , "deleteItem(this)") 
       dltbtn.appendChild(deltext)   
       li.appendChild(dltbtn)

    

//        // create Edit btn 

    var editbtn = document.createElement("button")
    var edittext = document.createTextNode("Edit")
    editbtn.setAttribute('id',data.val().key)
    editbtn.setAttribute("onclick" , "editItems(this)")
    editbtn.appendChild(edittext)
    li.appendChild(editbtn)
   
   
   
list.appendChild(li)
})
function addtodo() {
    var todo_item = document.getElementById("todo")
    var database = firebase.database().ref('todos') 
    var key = database.push().key;

    var todo = {
        value : todo_item.value,
        key : key
    }

    database.child(key).set(todo)
    

//     // Create li tag with text node  
//     var li = document.createElement('li') 
//     var litext = document.createTextNode(todo_item.value)
//     li.appendChild(litext)

//     // create delete btn
//        var dltbtn = document.createElement('button')
//        var deltext = document.createTextNode("DELETE")
//        dltbtn.setAttribute("class", "btn")
//        dltbtn.setAttribute("onclick" , "deleteItem(this)") 
//        dltbtn.appendChild(deltext)   
//        li.appendChild(dltbtn)

    

//        // create Edit btn 

//     var editbtn = document.createElement("button")
//     var edittext = document.createTextNode("Edit")
//     editbtn.setAttribute("onclick" , "editItems(this)")
//     editbtn.appendChild(edittext)
//     li.appendChild(editbtn)
   
   
   
    //list.appendChild(li)
    todo_item.value = ""
    
    
}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
    
} 
function editItems(e) {
      
      var val =prompt("Enter Updated value",e.parentNode.firstChild.nodeValue)
      
      var edittodo = {
          value : val,
          key : e.id

          }
      firebase.database().ref('todos').child(e.id).set(edittodo)
      e.parentNode.firstChild.nodeValue = val;
    }

function deleteall() {
    list.innerHTML = ""
}