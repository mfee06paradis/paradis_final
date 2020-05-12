
const db = require('../util/db');

const sql_fetchAll = `SELECT * FROM vw_productDetail`;
const sql_findById = `SELECT * FROM vw_productDetail where productSortId = ?`;



//FIXME:


exports.vwProductDetail = class vwProductDetail{
    constructor(pId, psId, pName, pColor, pUnitPrice, pUnitsInStock, psDetail, psFeature, psInstruction, unitPrice, cpId, cId){
        this.productId = pId;
        this.productSortId = psId;

        this.productName = pName;
        this.productColor = pColor;
        this.productUnitPrice = pUnitPrice;
        this.productUnitPrice = pUnitsInStock;

        this.productSortDetail = psDetail;
        this.productSortFeature = psFeature;
        this.productSortInstruction = psInstruction;

        this.companyId = cpId;
        this.categoryId = cId;
    }
}

exports.vwProductDAO = class vwProductDAO{

    static fetchAll(){
        console.log(this.name  + 'fetchAll' ); //non-static: this.constructor.name
        return db.execute(sql_fetchAll);
    }

    // 用 psId (path params (多筆 UX設計不好, 要再取第一筆))
    static findById(id){
        console.log(this.name  + ' ---- ' + 'findByID' + 'id = '+ id); //non-static: this.constructor.name
        return db.execute(sql_findById, [id]);
    }


    // 色票 psId, color (qStr)
    static findByConditions(){ // obj or arr
        console.log(this.name  + ' ---- ' + 'findByConditions'); //non-static: this.constructor.name
    }


    //FIXME:
    // static get

}
