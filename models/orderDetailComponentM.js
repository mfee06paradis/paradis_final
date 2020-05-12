//@@@111 雖然跟ProductSortM撈的東西很像, 但 ~還是要重撈(new request)~ 因為別人可能直接從這個path進來, 要能顯示資料
//@@@111.1 資料不要直接從上一頁傳進來
//@@@111.2 只撈一筆商品(第一筆), 選其他色票(規格)要再撈
const db = require('../util/db');

const sql_fetchAll = `SELECT * FROM paradisdb.orderdetail`;
// const sql_fetchAll_withPrices = `SELECT ps.*, p.unitPrice
// FROM productsort ps
// JOIN product p
// ON ps.productSortId = p.productSortId
// GROUP BY ps.productSortId`;

const sql_findByOrderId = `SELECT * FROM paradisdb.orderdetail where orderId = ?`;


const sql_addOrderDetailsById = `INSERT INTO paradisdb.orderdetail (orderId, productId, originalProductPrice, originalProductDiscount, discountPrice, quantity, discountId) VALUES ?`;

exports.OrderDetail = class OrderDetail{
    constructor(psId, psName, psDetail, psFeature, psInstruction, psCreateTime, psIsNew, companyId, catdgoryId, faceCateId, unitPrice){
        this.productSortId = psId;
        this.productSortName = psName;
        this.productSortDetail = psDetail;
        this.productSortFeature = psFeature;
        this.productSortInstruction = psInstruction;
        this.productSortCreateTime = psCreateTime;
        this.isNew = psIsNew;
        this.companyId = companyId;
        this.categoryId = categoryId;
        this.faceCateId = faceCateId;
        this.unitPrice = unitPrice;
    }

    static fetchAll(){
        console.log(this.name  + 'fetchAll' ); //non-static: this.constructor.name
        return db.execute(sql_fetchAll);
    }

    static findByID(id){

        console.log(this.name  + ' ---- ' + 'findByID' + 'id = '+ id); //non-static: this.constructor.name
        // return db.execute(sql_findById, [id]);
        return db.execute(sql_findById, [id]);
    }

    static findByConditions(){ // obj or arr

    }


    static fetchAllWithPrices(){
        console.log(this.name  + 'fetchAllWithPrices' ); //non-static: this.constructor.name
        return db.execute(sql_fetchAll_withPrices);
    }
}

exports.OrderDetailDAO = class OrderDetailDAO{

    static addOrderDetailsById(insertOrderId, arrOrderDetail){

        let arrValues = arrOrderDetail.map(detail => [
            insertOrderId, // @@@666 重要
            detail.productId,
            detail.originalProductPrice,
            detail.originalProductDiscount,
            detail.discountPrice,
            detail.quantity,
            "null"
        ]);

        console.log(arrValues);

        // for(let orderDetail of arrOrderDetail)
        // {

        // }

        return db.query(sql_addOrderDetailsById, [arrValues]);
        
        // sql_addOrderDetailsById = 
    }

    static findByID(id){

        console.log(this.name  + ' ---- ' + 'findByID' + 'id = '+ id); //non-static: this.constructor.name
        // return db.execute(sql_findById, [id]);
        return db.execute(sql_findByOrderId, [id]);
    }

}
