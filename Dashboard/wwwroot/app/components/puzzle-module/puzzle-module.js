"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var puzzle_1 = require('./puzzle/puzzle');
var puzzle_module_routing_1 = require('./puzzle-module-routing');
var shared_module_1 = require('../share-module/shared-module');
var puzzleboard_1 = require('./board/puzzleboard');
var puzzletile_1 = require('./tile/puzzletile');
var PuzzleModule = (function () {
    function PuzzleModule() {
    }
    PuzzleModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, puzzle_module_routing_1.puzzleRouting, shared_module_1.default],
            declarations: [puzzle_1.default, puzzleboard_1.PuzzleBoardComponent, puzzletile_1.PuzzleTileComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PuzzleModule);
    return PuzzleModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PuzzleModule;
//# sourceMappingURL=puzzle-module.js.map