const express = require('express');
const path = require('path');
const pages = [
  '/hello.html',
  '/about.html',
  '/contact.html',
  '/one-page.html',
  '/services.html',
  '/index.html',
  '/posts.html',
];

const addPegas = (app) => {
  pages.forEach((page) => {
    app.use(page, express.static(path.join(__dirname, '..' + page)));
    console.log(path.join(__dirname, '..' + page));
  });
};

module.exports = addPegas;
