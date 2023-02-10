const express = require("express");
const bodyParser = require("body-parser");
// const database = require("./database");
const { sql, pool } = require("../../mssql");

const router = express.Router();
router.use(bodyParser.json());

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

// 조회
router.get("/", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request().query(
      "exec [QMES].[dbo].[MASTER_PROCESS_KN_READ_SP] '전체',''"
    );
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("key", sql.NVarChar, req.body.key)
      .input("input", sql.NVarChar, req.body.input)
      .query("exec [QMES].[dbo].[MASTER_PROCESS_KN_READ_SP] @key,@input");
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 등록
router.post("/insert", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input(
        "공정명",
        sql.NVarChar,
        !req.body.data.공정명 ? "" : req.body.data.공정명
      )
      .input(
        "공정내용",
        sql.NVarChar,
        !req.body.data.공정내용 ? "" : req.body.data.공정내용
      )
      .input(
        "비고",
        sql.NVarChar,
        !req.body.data.비고 ? "" : req.body.data.비고
      )
      .query(
        "exec [QMES].[dbo].[MASTER_PROCESS_KN_INS_SP] 0,@공정명,@공정내용,@비고"
      );
    res.send("등록완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 수정
router.post("/edit", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("기본키", sql.Int, req.body.data.NO)
      .input("공정명", sql.NVarChar, req.body.data.공정명)
      .input("공정내용", sql.NVarChar, req.body.data.공정내용)
      .input("비고", sql.NVarChar, req.body.data.비고)
      .query(
        "exec [QMES].[dbo].[MASTER_PROCESS_KN_UDT_SP] @기본키,@공정명,@공정내용,@비고"
      );
    res.send("수정완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 삭제
router.post("/delete", async (req, res) => {
  try {
    const Pool = await pool;
    for (var i = 0; i < req.body.data.length; i++) {
      // insert
      await Pool.request()
        .input("key", sql.Int, req.body.data[i])
        .query(`exec [QMES].[dbo].[MASTER_PROCESS_KN_DEL_SP] @key`);
    }
    res.send("삭제완료");
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
