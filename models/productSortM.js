
const db = require('../util/db');

const sql_fetchAll = `SELECT * FROM vw_productSort`;

// 要接 conditions
const sql_findByConditions = `SELECT * FROM vw_productSort `;

// SELECT * FROM vw_productSort
// WHERE categoryId = 11
// GROUP BY productSortId
// ORDER BY unitPrice ASC, createTime DESC;

//TODO: view
const sql_fetchAll_withPrices = `SELECT ps.*, p.unitPrice
FROM vw_productSort ps
JOIN product p
ON ps.productSortId = p.productSortId
GROUP BY ps.productSortId`;

const sql_findById = `SELECT * FROM vw_productSort where productSortId = ?`;

const sql_fetchImgs = `SELECT product.productId, product.productSortId, product_image.imageId
FROM product_image
join product
on product.productId = product_image.productId
group by product.productSortId
LIMIT ?, 6`

//FIXME: @@@###　222 Product 應對應 table 欄位, 因為CRUD
module.exports = class ProductSort{
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

    static findByConditions(conditions){ // obj or arr
        console.log(this.name  + 'findByConditions' ); //non-static: this.constructor.name


        let sql_conditionsForQuery = '';
        if(conditions.category){
            let whereClause = " WHERE categoryId = " + conditions.category
            sql_conditionsForQuery += whereClause;
        }

        if(conditions.orderType_price || conditions.orderType_time){
            sql_conditionsForQuery += " ORDER BY"

            if(conditions.orderType_price){
                let condition = "  unitPrice " + conditions.orderType_price
                sql_conditionsForQuery += condition;
            }

            if(conditions.orderType_time){
                let condition = ", createTime " + conditions.orderType_time
                sql_conditionsForQuery += condition;
            }

            //FIXME: page
        }

        sql_conditionsForQuery = sql_findByConditions + sql_conditionsForQuery;
        console.log("******    " + sql_conditionsForQuery);

        return db.execute(sql_conditionsForQuery);
    }

    static getImagesByPage(pageNum){
        return db.execute(sql_fetchImgs, [pageNum]);
    }

    static fetchAllWithPrices(){
        console.log(this.name  + 'fetchAllWithPrices' ); //non-static: this.constructor.name
        return db.execute(sql_fetchAll_withPrices);
    }
}

