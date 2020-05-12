
const db = require('../util/db');
const cartM = require('../models/cartM');

const sql_fetchAll = `SELECT * FROM paradisdb.vw_cart`;
const sql_findById = `SELECT * FROM paradisdb.vw_cart WHERE memberId = ?`;

exports.vwCart = class vwCart{
    constructor(mId, pId, pName, pColor, pUnitPrice, pUnitsInStock, cpName, cartAmount){
        this.memberId = mId;
        this.productId = pId;

        this.productName = pName;
        this.productColor = pColor;
        this.productUnitPrice = pUnitPrice;
        this.productUnitPrice = pUnitsInStock;

        this.companyName = cpName;

        this.cartAmount = cartAmount;
    }
}

exports.vwCartDAO = class vwCartDAO{
    static fetchAll(){
        console.log(this.name  + 'fetchAll' ); //non-static: this.constructor.name
        return db.execute(sql_fetchAll);
    }

    //
    static findById(id){
        console.log(this.name  + ' ---- ' + 'findByID' + 'id = '+ id); //non-static: this.constructor.name

        console.log(sql_findById+"id");
        return db.execute(sql_findById, [id]);
    }


    static addItemToCart(item){
        console.log(this.name  + ' ---- ' + 'addItemToCart' + item); //non-static: this.constructor.name


        return cartM.CartDAO.addItemToCart(item);
    }

    //
    static findByConditions(){ // obj or arr
        console.log(this.name  + ' ---- ' + 'findByConditions'); //non-static: this.constructor.name
    }
}


