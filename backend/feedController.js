const WebFeed = require('../model/webData');
const express = require('express');

const app = express();

module.exports = function() {
    app.get('/feed/rss', function(req, res) {
        WebFeed.find({})
            .sort('-publishedAt')
            .where('published', true)
            .limit(20)
            .select('title slug publishedAt teaser')
            .exec(function(err, posts) {
                if (err) return next(err);
                return res.render('rss', {
                    posts: posts
                });
            });
    });
};





