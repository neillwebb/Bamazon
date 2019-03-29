module.exports = function(sequelize, Datatypes) {
    const Product = sequelize.define('Product', {
        product_name: Datatypes.STRING,
        department_name: Datatypes.STRING,
        price: Datatypes.DECIMAL(10,2),
        stock_quantity: Datatypes.INTEGER
})

return Product;
}