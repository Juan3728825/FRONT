import {Router} from "express";

const route = Router();

route.get('/about', (req,res)=>{res.render('about')});
route.get('/booking', (req,res)=>{res.render('booking')});
route.get('/contact', (req,res)=>{res.render('contact')});
route.get('/destination', (req,res)=>{res.render('destination')});
route.get('/', (req,res)=>{res.render('index')});
route.get('/service', (req,res)=>{res.render('service')});
route.get('/destination', (req,res)=>{res.render('destination')});
route.get('/team', (req,res)=>{res.render('team')});
route.get('/package', (req,res)=>{res.render('package')});



export	default route;