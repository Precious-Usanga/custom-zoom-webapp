//Install express server
const express = require('express');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/custom-zoom-webapp'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/custom-zoom-webapp/'}
);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
