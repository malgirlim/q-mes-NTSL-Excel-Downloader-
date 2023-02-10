const express = require("express");
const router = express.Router();

const stockBadRouter = require("./stock/stockBad");
const stockReceiveRouter = require("./stock/stockReceive");
const stockUseRouter = require("./stock/stockUse");

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

// 재고관리 / 원자재 입고 등록 - router/stock/stockReceive.js
router.use("/receive", stockReceiveRouter);
// 재고관리 / 원자재 사용 등록 - router/stock/stockUse.js
router.use("/use", stockUseRouter);
// 재고관리 / 원자재 불량 등록 - router/stock/stockBad.js
router.use("/bad", stockBadRouter);

module.exports = router;
