var renderer = require('./app.stache');

document.addEventListener("DOMContentLoaded", function() {
    var frag = renderer({
        message: 'Hello loaders'
    })
    document.body.appendChild(frag);
});
