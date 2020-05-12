var path = require('path');
var scriptName = path.basename(__filename);

const ProductSort = require('../models/productSortM');



exports.getProductSortsWithPrices = (req, res, next)=>{

    console.log(scriptName + ' -------- '  + 'getProductSortsWithPrices'); //non-static: this.constructor.name

    ProductSort.fetchAllWithPrices()
    .then(([rows, fieldData]) => {

        // console.log(rows);
        // console.log( (typeof rows[1]) );
        // const jsonRst = JSON.stringify(rows);// 不必自己轉, res.json(&send) 會自轉
        // console.log(jsonRst);

        // res.end();
        res.render('product/product-list', {
            productSorts: rows,
            pageTitle: "index",
            path: "/"
        });

    })
    .catch((err) => {
        console.log(err);
    });
}

exports.getProductSorts = (req, res, next)=>{

    console.log(scriptName + ' -------- '  + 'getProductSorts'); //non-static: this.constructor.name

    ProductSort.fetchAll()
    .then(([productSorts, fieldData]) => {

        // console.log(rows);
        // console.log( (typeof rows[1]) );
        // const jsonRst = JSON.stringify(rows);// 不必自己轉, res.json(&send) 會自轉
        // console.log(jsonRst);

        // res.end();

        // res.render('product/product-sorts', {
        //     productSorts: rows,
        //     pageTitle: "index",
        //     path: "/"
        // });

        res.json(productSorts);

    })
    .catch((err) => {
        console.log(err);
    });
}

exports.getProductSortById = (req, res, next) => {
    console.log(scriptName + ' -------- '  + 'getProductSortById');

    const psId = req.params.productSortId;
    console.log(psId);

    ProductSort.findByID(psId)
    .then(([productSort]) => {

        // console.log(productSort[0]);



        res.json(productSort[0]);
    })
    .catch((err) => {
        console.log(err);
    });
};


//besides id
exports.getProductSortsByConditions = (req, res, next) => {
    console.log(scriptName + ' -------- '  + 'getProductSortsByConditions');

    //@@@ 沒設 = undefined
    let filterType = req.query.category; //category = 1

    //先價錢 在新舊
    let orderType_price = req.query.price; //price = asc or desc
    let orderType_time = req.query.time;


    const conditions = {
        category: filterType,
        orderType_price : orderType_price,
        orderType_time: orderType_time
    }

    console.log(conditions.category + '  price  ' + conditions.orderType_price + '  time  ' + conditions.orderType_time);
   

    ProductSort.findByConditions(conditions)
    .then(([productSort]) => {

        res.json(productSort)})
    .catch((err) => {
        console.log(err);
    });

};