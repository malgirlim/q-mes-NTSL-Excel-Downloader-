const express = require("express");
const app = express();
const port = 3000;

const memoRouter = require("./router/memos");

const masterRouter = require("./router/masterRouter");
const stockRouter = require("./router/stockRouter");
const monitorRouter = require("./router/monitorRouter");

// 테스트 - router/memos.js
app.use("/api/memos", memoRouter);

// 기준정보 - router/master/masterRouter.js
app.use("/api/master", masterRouter);

// 재고관리 - router/stock/stockRouter.js
app.use("/api/stock", stockRouter);

// 재고조회 - router/monitor/monitorRouter.js
app.use("/api/monitor", monitorRouter);

app.listen(port, () => {
  console.log(`Q-MES app listening on port ${port}`);
});
