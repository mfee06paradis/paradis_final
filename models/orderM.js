const db = require("../util/db");

const vwCart = require("../models/vw-cartM");

const sql_fetchAll = `SELECT * FROM order`;

// const sql_findById = `SELECT ps.*, p.unitPrice
// FROM productsort ps
// JOIN product p
// ON ps.productSortId = p.productSortId
// GROUP BY ps.productSortId`;

const sql_findById = `SELECT * FROM order where orderId = ?`;
const sql_findByMemberId = `SELECT * FROM order where memberId = ?`;

const sql_findUnpaidOrderIdByMemberId = `SELECT MAX(orderId) AS unpaidOrderId FROM order WHERE orderState = 2 AND memberId = ?`;

//7
const sql_addCartsToOrder = `INSERT INTO order 
(memberId, orderDate, originalTotal, originalDiscount, orderTotal, couponCode, orderState) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;



const sql_updateOrderByOrderId = `UPDATE order
 SET consigneeId = ?, receiptId = ?, couponCode = ?, decoration = ?, orderState = ?
 WHERE orderId = ?`;


// const sql_updateOrderByOrderId = `UPDATE paradisdb.order
//  SET consigneeId = ?, receiptId = ?, originalTotal = ?, originalDiscount = ?, orderTotal = ?, couponCode = ?, decoration = ?, orderState = ?
//  WHERE orderId = ?`;




exports.Order = class Order {
  //TODO:
  constructor(
    pId,
    psName,
    psDetail,
    psFeature,
    psInstruction,
    psCreateTime,
    psIsNew,
    companyId,
    catdgoryId,
    faceCateId,
    unitPrice
  ) {
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

  static fetchAll() {
    console.log(this.name + "fetchAll"); //non-static: this.constructor.name
    return db.execute(sql_fetchAll);
  }

  static findByID(id) {
    console.log(this.name + " ---- " + "findByID" + "id = " + id); //non-static: this.constructor.name
    // return db.execute(sql_findById, [id]);

    return db.execute(sql_findById, [id]);
  }

  static addCartsToOrder() {}

  static findByConditions() {
    // obj or arr
  }

  static fetchAllWithPrices() {
    console.log(this.name + "fetchAllWithPrices"); //non-static: this.constructor.name
    return db.execute(sql_fetchAll_withPrices);
  }
};

exports.OrderDAO = class OrderDAO {
  static findUnpaidOrderIdByMemberId(id) {
    console.log(
      this.name + " ---- " + "findUnpaidOrderIdByMemberId" + " id = " + id
    );

    console.log(sql_findUnpaidOrderIdByMemberId);
    return db.execute(sql_findUnpaidOrderIdByMemberId, [id]);
  }

  static updateOrderByOrderId(orderId, dataToUpdate) {
    console.log(
      this.name + " ---- " + "updateOrderByOrderId" + "id = " + orderId
    );

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


    console.log(dataToUpdate);
    return db.execute(sql_updateOrderByOrderId, [
      dataToUpdate.consigneeId,
      dataToUpdate.receiptId,
    //   dataToUpdate.originalTotal,
    //   dataToUpdate.originalDiscount,
    //   dataToUpdate.orderTotal,
      dataToUpdate.couponCode,
      dataToUpdate.decoration,
      dataToUpdate.orderState,
      orderId,
    ]);
  }

  static findByMemberID(memberId) {
    console.log(
      this.name + " ---- " + "findByMemberID" + "member id = " + memberId
    ); //non-static: this.constructor.name
    // return db.execute(sql_findById, [id]);

    return db.execute(sql_findByMemberId, [memberId]);
  }
  static addCartsToOrder(carts) {
    //{order:{}, orderDetail:[{}, {}]}

    // vwCart.vwCartDAO.findById("2").then(([rows, fieldData]) => {
    //   console.log("yyy " + rows);
    // });

    // const memId = "1";

    console.log(carts);

    return db.execute(sql_addCartsToOrder, [
        carts.order.memberId,
        carts.order.orderDate,
        carts.order.originalTotal,
        carts.order.originalDiscount,
        carts.order.orderTotal,
        carts.order.couponCode,
        2,
      ])
      .then(([rows, fieldData]) => {
        const insertId = rows.insertId;

        console.log("insert Order 成功  " + insertId);

        return insertId;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
