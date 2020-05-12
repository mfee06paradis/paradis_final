
const db = require('../util/db');

const sql_fetchAll = `SELECT * FROM cart`;
const sql_findById = `SELECT * FROM cart WHERE memberId = ?`;

const sql_addItemToCart = `INSERT INTO cart(memberId, productId, amount)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE amount = amount + ?`;
// `INSERT INTO cart (memberID, ) VALUES (?, ?, ?)`;

//TODO:
const sql_removeCartsAfterAddedToOrderByMemberId = `DELETE FROM paradisdb.cart WHERE memberId = ?`;


exports.Cart = class Cart{
    constructor(mId, pId, cartAmount){
        this.memberId = mId;
        this.productId = pId;

        this.amount = cartAmount;
    }
}

exports.CartDAO = class CartDAO{
    static fetchAll(){
        console.log(this.name  + 'fetchAll');
        return db.execute(sql_fetchAll);
    }

    //
    static findById(id){
        console.log(this.name  + ' ---- ' + 'findByID' + 'id = '+ id);
        return db.execute(sql_findById, [id]);
    }

    static addItemToCart(item){
        console.log(this.name  + ' ---- ' + 'addItemToCart ' + 'item = '+ item.memberId);


        return db.execute(sql_addItemToCart, [item.memberId, item.productId, item.amount, item.amount]);
    }

    static removeCartsAfterAddedToOrderByMemberId(memId){
        console.log(this.name  + ' ---- ' + 'removeCartsAfterAddedToOrderByMemberId');


        return db.execute(sql_removeCartsAfterAddedToOrderByMemberId, [memId]);
    }


    //
    static findByConditions(){ // obj or arr
        console.log(this.name  + ' ---- ' + 'findByConditions');
    }
}


