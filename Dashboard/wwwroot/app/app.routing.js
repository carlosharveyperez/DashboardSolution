"use strict";
var router_1 = require('@angular/router');
var home_1 = require('./components/home/home');
var appRoutes = [
    { path: '', component: home_1.HomeComponent },
    { path: 'PhotoAlbums', loadChildren: 'app/components/photos-module/photos-module' },
    { path: 'Tubes', loadChildren: 'app/components/tubes-module/tubes-module' },
    { path: 'Puzzle', loadChildren: 'app/components/puzzle-module/puzzle-module' }
];
exports.appRoutingProviders = [];
exports.appRoutings = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map