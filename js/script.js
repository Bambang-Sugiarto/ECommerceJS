var selectedRow = null
if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready()
{
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for(var i=0; i<removeCartItemButton.length; i++)
    {
        var button = removeCartItemButton[0]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for(var i=0; i<quantityInput.length; i++)
    {
        var input = quantityInput[0]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-btn')
    for(var i = 0; i<addToCartButtons.length; i++)
    {
       var button = addToCartButtons[i] 
       button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked()
{
    alert('Terimakasih pesanan anda sudah kami terima')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}

function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    addItemToCart(title, price, imageSrc)
    updateCartTotal()

}

function removeCartItem(event)
{
    if(confirm('Yakin ingin hapus data ?'))
    {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()

    }
}

function quantityChanged(event)
{
    var input = event.target
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1

    }

    updateCartTotal()
}

function addItemToCart(title, price, imageSrc)
{
    var cartRow         = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems       = document.getElementsByClassName('cart-items')[0]
    var cartItemName    = cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemName.length; i++)
    {
        if(cartItemName[i].innerText == title)
        {
            alert('produk yang anda beli sudah ada didalam keranjang belanja')
            return

        }
    }

    var cartRowContents = `<div class = "cart-item cart-column">
                            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                            <span class="cart-item-title">${title}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span> 
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class = "btn btn-danger"> 
                                    REMOVE 
                                </button>
                            </div>`
    
                            cartRow.innerHTML = cartRowContents
                            cartItems.append(cartRow)
                            cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
                            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged) 
}

function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(i=0; i<cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp',''))
        var quantity = quantityElement.value
        total = total+(price*quantity)


    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + total
}


//contact
function dataKu()
{
    var formData = readData()
    
    if(selectedRow == null)
        insertData(formData)
    else
        updateData(formData)
    
    resetForm()
    
}

function readData()
{
    var formData = {}
    formData["name"] = document.getElementById("name").value
    formData["phone"] = document.getElementById("phone").value
    formData["email"] = document.getElementById("email").value
    formData["message"] = document.getElementById("message").value

    return formData
    
}

function insertData(data)
{
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0]
    var newRow = table.insertRow(table.length)

    cell1 = newRow.insertCell(0)
    cell1.innerHTML = data.name
    
    cell2 = newRow.insertCell(1)
    cell2.innerHTML = data.phone

    cell3 = newRow.insertCell(2)
    cell3.innerHTML = data.email

    cell4 = newRow.insertCell(3)
    cell4.innerHTML = data.message

    cell5 = newRow.insertCell(4)
    cell5.innerHTML = `<a class="btn btn-success" onClick="onEdit(this)">Edit</a>
                        <a class="btn btn-danger" onClick="onDelete(this)">Delete</a>`


}


function resetForm()
{
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("message").value = ""
    electedRow = null
}


function onEdit(td)
{
    selectedRow = td.parentElement.parentElement
    document.getElementById("name").value = selectedRow.cells[0].innerHTML
    document.getElementById("phone").value = selectedRow.cells[1].innerHTML
    document.getElementById("email").value = selectedRow.cells[2].innerHTML
    document.getElementById("message").value = selectedRow.cells[3].innerHTML
}

function onDelete(td)
{
    if(confirm('Apakah anda yakin ingin menghapus data ?'))
    {
        row = td.parentElement.parentElement
        document.getElementById("employeeList").deleteRow(row.rowIndex)
        resetForm()
    }
}

function updateData(formData)
{
    selectedRow.cells[0].innerHTML = formData.name
    selectedRow.cells[1].innerHTML = formData.phone
    selectedRow.cells[2].innerHTML = formData.email
    selectedRow.cells[3].innerHTML = formData.message
}




//end contact

