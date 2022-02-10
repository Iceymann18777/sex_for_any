const Router = require('koa-router');
const public = new Router();
const { show_crm, save_note, get_notes } = require("./api/get_notes");

public.get("/test_vue", show_crm)
public.post("/api/save_note", auth, save_note)
public.post("/api/get_notes",  get_notes)

module.exports = public;

function auth(ctx,next){
if(ctx.isAuthenticated()){
	return next()
	}else{
		ctx.throw(401, "Залогиньтесь, пожалуйста")
		}
		}
