"use strict";
var router_1 = require('@angular/router');
var photo_albums_1 = require('./photo-albums/photo-albums');
var edit_1 = require('./edit/edit');
var display_1 = require('./display/display');
var AdminLoggedGuard_1 = require('./guards/AdminLoggedGuard');
var routes = [
    {
        path: '',
        component: photo_albums_1.default,
        children: [
            { path: 'Add', component: edit_1.default },
            { path: 'Edit', component: edit_1.default, canActivate: [AdminLoggedGuard_1.default] },
            { path: '', component: display_1.default }
        ]
    }
];
exports.photosRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=photos-module-routing.js.map