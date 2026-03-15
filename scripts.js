const list = document.querySelector('.menu-list')

const buttonShowMenu = document.querySelector('.btn-show')
const buttonMap = document.querySelector('.btn-map')
const buttonReduce = document.querySelector('.btn-reduce')
const buttonFilter = document.querySelector('.btn-filter')

function formatCurrency(value) {
    const newValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return newValue.format(value)
}

// A função showMenu itera sobre o array menuOptions usando forEach para construir uma string HTML que representa cada item do menu. Em seguida, essa string é inserida no elemento com a classe .menu-list, exibindo o menu na página. //
const showMenu = () => {

    let myMenu = ''

    menuOptions.forEach(product => {

        myMenu += `
        <li class="menu-item">
            <img src="${product.src}">
            <p>${product.name}</p>
            <p class="price">${formatCurrency(product.price)}</p>
        </li>
        `
    })

    list.innerHTML = myMenu
}


// A função mapProducts utiliza o método map para criar um novo array de produtos com um preço com desconto. Em seguida, ela itera sobre esse novo array usando forEach para construir a string HTML que será exibida na página, mostrando o preço original e o preço com desconto //

function mapProducts() {

    const newPrices = menuOptions.map(product => ({
        ...product,
        discountPrice: product.price * 0.9
    }))

    let myMenu = ''

    newPrices.forEach(product => {

        myMenu += `
<li class="menu-item">
<img src="${product.src}">
<p>${product.name}</p>
<span class="badge">10% OFF</span>

<p class="price">

<span class="old-price">${formatCurrency(product.price)}</span>
<span class="new-price">${formatCurrency(product.discountPrice)}</span>

</p>

</li>
`

    })

    list.innerHTML = myMenu
}


// A função reduceProducts utiliza o método reduce para calcular o preço total de todos os produtos no menu. O resultado é exibido em um elemento com a classe .total-price, mostrando o valor total dos produtos. //
function sumProducts() {

    const totalOriginal = menuOptions.reduce((acc, product) => {
        return acc + product.price
    }, 0)

    const totalDiscount = menuOptions.reduce((acc, product) => {
        return acc + (product.price * 0.9)
    }, 0)

    list.innerHTML = `
<li class="menu-item total-card">

<h2>Total do Cardápio</h2>

<p class="old-total">
Total original: ${formatCurrency(totalOriginal)}
</p>

<p class="total-price">
Total com desconto: ${formatCurrency(totalDiscount)}
</p>

</li>
`
}

function filterProducts() {

    const veganProducts = menuOptions
        .filter(product => product.vegan)
        .map(product => ({
            ...product,
            discountPrice: product.price * 0.9
        }))

    let myMenu = ''

    veganProducts.forEach(product => {

        myMenu += `
<li class="menu-item">
<span class="vegan-badge">🌱 VEGAN</span>

<img src="${product.src}">
<p>${product.name}</p>
<p class="price">
<span class="old-price">${formatCurrency(product.price)}
</span>
<span class="new-price">${formatCurrency(product.discountPrice)}
</span>

</p>

</li>
`

    })

    list.innerHTML = myMenu
}

buttonShowMenu.addEventListener('click', () => showMenu(menuOptions))
buttonMap.addEventListener('click', mapProducts)
buttonReduce.addEventListener('click', sumProducts)
buttonFilter.addEventListener('click', filterProducts)