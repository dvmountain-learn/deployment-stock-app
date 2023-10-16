const complimentBtn = document.getElementById("complimentButton")
const productName = document.getElementById('product-name')
const quantity = document.getElementById('product-qty')
const unitPrice = document.getElementById('product-price')
const productStatus = document.getElementById('select-status')
const description = document.getElementById('product-desc')
const saveBtn = document.getElementById('save-btn')
const stocksItem = document.querySelector('.stocks-item')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')
const dataTable = document.createElement('table')

const baseUrl = 'http://localhost:4000'

// Stocks
function getStocks() {
    axios.get(`/api/stocks`)
        .then(res => {
            let stocks = res.data.stocks
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
}

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function displayStocks(stocks) {
    
    let html = '<table border="1"></table><thead><tr><th>&nbsp;&nbsp;#</th><th>&nbsp;&nbsp;Name</th><th style="text-align: center">Quantity</th><th style="text-align: center">Unit Price</th><th style="text-align: center">Condition</th><th style="text-align: center">Action</th></tr>'
    html += '<tbody>'
    for (let item of stocks) {
        // console.log(item)
        html += `<tr>
        <td>&nbsp;&nbsp;${item.id} </td>
        <td>&nbsp;&nbsp;${item.name}</td>
        <td style="text-align: center">${item.quantity}</td>
        <td style="text-align: center">${USDollar.format(item.price)}</td>
        <td style="text-align: center">${item.status}</td>
        <td style="text-align: center; width: 15%;">
            <button id="edit-btn" onclick="updateProductInStock(${item.id})"><i class="material-icons edit">edit</i></button>
            <button id="delete-btn" onclick="deleteProductInStock(${item.id})"><i class="material-icons delete">delete</i></button>
        </td>
        </tr>`
    }
    html += '</tbody>'
    html += '</table>'
    dataTable.innerHTML = html
    stocksItem.appendChild(dataTable)
}

// Save
function createProductInStock(event) {
    event.preventDefault();
    if (productName.value === '') alert('Product name is required.')
    else if (quantity.value === '') alert('Quantity is required.')
    else if (unitPrice.value === '') alert('Unit Price is required.')
    else {
        const stockObj = {
            name: productName.value,
            quantity: quantity.value,
            price: unitPrice.value,
            status: productStatus.value,
            description: description.value
        }
        console.log(stockObj)
        axios.post(`/api/stocks`, stockObj)
            .then(res => {
                let stocks = res.data.stocks
                displayStocks(stocks)
                clearForm()
            })
            .catch(error => {
                console.log(error)
            });
    }
};

function clearForm() {
    productName.value = ''
    quantity.value = ''
    unitPrice.value = ''
    productStatus.value = ''
    description.value = ''
}
saveBtn.addEventListener('click', createProductInStock)

function updateProductInStock(id) {
    let updateObj = {}
    let label = prompt('Enter label that you want to update: (eg: quantity or price)')
    if (label === 'quantity') {
        let qtyObj = prompt('Enter quantity to update: ')
        updateObj = {quantity: qtyObj}
    } else if (label === 'price') {
        let priceObj = prompt('Enter unit price to update: ')
        updateObj = {price: priceObj}
    } else {
        alert('Invalid provide label that you want to update: ' + label)
        return
    }
    console.log(updateObj)
    axios.put(`/api/stocks/${id}`, updateObj)
        .then(res => {
            // console.log(res.data.stocks)
            let stocks = res.data.stocks
            dataTable.remove()
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
}

function deleteProductInStock(id) {
    let isConfirm = confirm(`Do you want to delete this item from stock?`)
    if (isConfirm) {
        axios.delete(`/api/stocks/${id}`)
        .then(res => {
            // console.log(res.data.stocks)
            let stocks = res.data.stocks
            dataTable.remove()
            displayStocks(stocks)
        })
        .catch(error => {
            console.log(error)
        })
    }
}


// Load website
getStocks()
