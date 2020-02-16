var request = require('supertest');
var assert = require("assert");
var expect = require('chai').expect;
var should = require('chai').should();
var app = require("../server").app;

describe("Testing Authentication Service",()=>{
    //Register Test
    it("Register New User Without Error", done =>{
        request(app)
        .post('/auth/register')
        .send({email:'bob@bob.com',password:"password"})
        .set('Accept','application/json')
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err)
            assert.equal(res.body.message,"Success")
            done();
        })
    });
    //Login Test
    it("Login New User Without Error", done =>{
        request(app)
        .post('/auth/login')
        .send({email:'bob@bob.com',password:"password"})
        .set('Accept','application/json')
        .expect(200)
        .end((err,res)=>{
            if (err) return done(err)
            assert.equal(res.body.message,"User Found")
            done();
        })
    })
    //Getall Test
    it("Gets Users",(done)=>{
        request(app)
        .get('/getall')
        .then(res=>{
            done()
        })
    })
});