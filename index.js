"use strict";

var request = require("request");
var apikey = "39YAprx5Yi";

var makeRequest = function makeRequest(url, cb) {
	// console.log( url );
	request({ url: url, json: true }, function (err, res, body) {
		if (cb) {
			return cb(err, body);
		}
		return null;
	});
};

var replies = function replies(cb) {
	var url = "http://replygif.net/api/replies?api-key=" + apikey;
	return makeRequest(url, cb);
};

var tags = function tags(options, cb) {
	if (!options || typeof options === "function") {
		var optionErr = new Error("options is required");
		if (cb) {
			return cb(optionErr);
		}
		throw optionErr;
	}
	if (!options.title && !options.reply) {
		var reqErr = new Error("title or reply is required");
		if (cb) {
			return cb(reqErr);
		}
		throw reqErr;
	}
	var title = options.title ? "&title=" + options.title : "";
	var reply = options.reply ? "&reply=" + options.reply : "";
	var reaction = options.reaction ? "&reaction=1" : "";
	var url = "http://replygif.net/api/tags?api-key=" + apikey + title + reply + reaction;
	return makeRequest(url, cb);
};

var getOperator = function getOperator(op) {
	if (op) {
		op = op.toLower();
		if (op !== "and" && op !== "or" && op !== "not") {
			return "and";
		}
		return op;
	}
	return "and";
};

var gifs = function gifs(options, cb) {
	if (!options || typeof options === "function") {
		var optionErr = new Error("options is required");
		if (cb) {
			return cb(optionErr);
		}
		throw optionErr;
	}
	if (!options.id && !options.tag && !options.reply) {
		var reqErr = new Error("id, tag or reply is required");
		if (cb) {
			return cb(reqErr);
		}
		throw reqErr;
	}
	var id = options.id ? "&id=" + options.id : "";
	var tag = options.tag ? "&tag=" + options.tag : "";
	var tagOp = tag && tag.indexOf(",") > -1 ? "&tag-operator=" + getOperator(options.tagOperator) : "";
	var reply = options.reply ? "&reply=" + options.reply : "";
	var replyOp = tag && tag.indexOf(",") > -1 ? "&reply-operator=" + getOperator(options.replyOperator) : "";
	var url = "http://replygif.net/api/gifs?api-key=" + apikey + id + tag + tagOp + reply + replyOp;
	return makeRequest(url, cb);
};

module.exports = {
	gifs: gifs,
	replies: replies,
	tags: tags
};