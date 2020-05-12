var path = require('path');
var scriptName = path.basename(__filename);

const vwCartM = require('../models/vw-cartM');
// const orderM = require('../models/orderM');
// const orderDetailM = require('../models/orderDetailM')
const orderM = require('../models/orderM');


exports.getUnpaidOrder = (req, res, next) => {

    console.log(scriptName + ' -------- '  + 'getNewestOrderById'); //non-static: this.constructor.name

    const memId = req.params.memberId;
    const query_orderState = req.query.state
    console.log(memId + '  query string  '+ query_orderState);


    orderM.OrderDAO.findUnpaidOrderIdByMemberId(memId)
    .then(([rows, fieldData]) => {
        console.log(rows); // 其實取id就好 這邊方便檢查
        return res.json(rows);
    });



    //test member 是否購物車內還有訂單
    // vwCartM.vwCartDAO.findById(memId)
    // .then(([rows, fieldData]) => {

    //     // const cart = rows;
    //     // console.log(rows);

    //     // res.render('cart/cart', {
    //     //     cartItems: rows, //@@@多筆 取第一筆
    //     //     pageTitle: "my cart",
    //     //     path: "/"
    //     // });

    //     return res.json(rows[0]);
    // });
}

exports.updateUnpaidOrder = (req, res, next) => {

    // let test = {
    //     consigneeId : 15,
    //     receiptId : 10,
    //     originalTotal : 1000,
    //     originalDiscount : 100,
    //     orderTotal : 900,
    //     couponCode : 'ddd',
    //     decoration : 1,
    //     orderState : 0,
    //     orderId : 38
    // }

    let updateData = req.body;

    console.log("put --- " +  JSON.stringify(updateData));
    // return res.json(updateData);

    orderM.OrderDAO.updateOrderByOrderId(updateData.order.orderId, updateData.order)
    .then(([rows, fieldData]) => {


        console.log("order completed ---qqq--- " + rows);

        // 回傳同筆 通知刷新
        return res.json(updateData);
    })
    .catch(err=>{
        console.log(err);
    })

}




exports.addCartsToOrder = (req, res, next) =>  {


    const jsonTestData = {
        carts:[
            {},
            {}
        ],
        // memberId: "1",
        // productId: "2",
        // amount: 2
    }



    let insertOrderId=0; // insert orderDetail 用
    //資料外面會準備好
    orderM.OrderDAO.addCartsToOrder('')
    .then((aaa)=>{
        // console.log(aaa);
        insertOrderId = aaa;

        console.log("====== " + insertOrderId)
        //TODO: 移到Order後 Cart 要清空


        // res.json(aaa);
        // res.json(res);

        return vwCartM.vwCartDAO.findById('1'); //FIXME: 這層拿掉 改真實資料

    })
    .then(([rows, fieldData]) => {


        let arrTestData = [];
        res.json(rows);
        for(let row of rows){
            let orderDetail={};

            orderDetail.oid = insertOrderId;

            orderDetail.pid = row.productId;
            orderDetail.originalPrice = row.unitPrice;
            orderDetail.originalDiscount = 0;
            orderDetail.discountPrice = orderDetail.originalPrice - orderDetail.originalDiscount;
            orderDetail.quantity = row.amount;
            orderDetail.discountId = "null";

            arrTestData.push(orderDetail);
        }

        return orderDetailM.OrderDetailDAO.addOrderDetailsById(insertOrderId, arrTestData);
    })
    .catch((err)=>{
        console.log(err);
    });
}








//TODO: 沒用到 (移到 PSC) --------------------------
exports.addItemToCart = (req, res, next) => { //post & put
    const memId = req.params.memberId;
    console.log(memId);

    let jsonData = req.body;
    console.log(req.body);

    const jsonTestData = {
        memberId: "1",
        productId: "2",
        amount: 2
    }

    vwCartM.vwCartDAO.addItemToCart(jsonTestData)
    .then(([rows, fieldData]) => {

        // const cart = rows;
        // console.log(rows);

        //TODO: 通知回上一頁
        console.log("新增成功");
        res.json(jsonTestData);
    })
    .catch(err => {
        console.log(err);
    });
}

//change amount
exports.putCartById = (req, res, next) => {


    const memId = req.params.memberId;
    console.log(memId);

    let jsonData = req.body;
    console.log(req.body);

    res.send('111');
}
