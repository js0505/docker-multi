const express = require("express")
const bodyparser = require("body-parser")
const db = require("./db")

const app = express()
app.use(bodyparser.json())

// 테이블 생성
// db.pool.query(
// 	`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`,
// 	(err, results) => {
// 		console.log("results", results)
// 	}
// )

// lists 테이블의 모든 데이터 전송
app.get("/api/values", (req, res) => {
	db.pool.query("SELECT * FROM lists;", (err, result) => {
		if (err) return res.status(500).send(err)
		return res.status(200).json(result)
	})
})
// lists 테이블에 데이터 저장
app.post("/api/values", (req, res) => {
	db.pool.query(
		`INSERT INTO lists (value) VALUES("${req.body.value}");`,
		(err, result) => {
			if (err) return res.status(500).send(err)
			return res.status(200).json({ success: true, value: req.body.value })
		}
	)
})

app.listen(5000, () => {
	console.log(`server on 5000`)
})
