
const db = require('../util/db');

const sql_fetchAll = `SELECT * FROM productsort`;

const sql_fetchAll_withPrices = `SELECT ps.*, p.unitPrice
FROM productsort ps
JOIN product p
ON ps.productSortId = p.productSortId
GROUP BY ps.productSortId`;

const sql_findById = `SELECT * FROM productsort where productSortId = ?`;

module.exports = class Product{
    constructor(pId, psName, psDetail, psFeature, psInstruction, psCreateTime, psIsNew, companyId, catdgoryId, faceCateId, unitPrice){
        this.productId = pId;
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

