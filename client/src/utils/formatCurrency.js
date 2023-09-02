const currencyFormat = new Intl.NumberFormat('en-us',{
    currency: 'USD',
    style: 'currency',
})
export function formatCurrency(number) {
    return currencyFormat.format(number)
}