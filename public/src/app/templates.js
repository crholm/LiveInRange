(function(module) {
try { app = angular.module("app/views/home.ngt"); }
catch(err) { app = angular.module("app/views/home.ngt", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/home.ngt",
    "<div class=\"container-fluid\" ng-controller=\"HomeCtrl\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"home-search col-sm-8 col-sm-push-2\">\n" +
    "      <p>\n" +
    "        Jag söker en \n" +
    "        <span data-template=\"app/views/templates/popover-home.ngt\" data-animation=\"am-flip-x\" bs-popover=\"popover.rooms\">{{query.rooms}}</span>\n" +
    "         på \n" +
    "        <span data-template=\"app/views/templates/popover-home.ngt\" data-animation=\"am-flip-x\" bs-popover=\"popover.area\">{{query.area}}</span>\n" +
    "         för högst \n" +
    "        <span data-template=\"app/views/templates/popover-home.ngt\" data-animation=\"am-flip-x\" bs-popover=\"popover.price\" data-placement=\"left\">{{query.price}}</span>\n" +
    "         som ligger max \n" +
    "        <span data-template=\"app/views/templates/popover-home.ngt\" data-animation=\"am-flip-x\" bs-popover=\"popover.transitTime\">{{query.transitTime}}</span>\n" +
    "         från \n" +
    "        <span data-template=\"app/views/templates/popover-home.ngt\" data-animation=\"am-flip-x\" bs-popover=\"popover.transitStop\">{{query.transitStop}}</span>\n" +
    "      </p>\n" +
    "      <button class=\"btn btn-default\" ng-click=\"search()\">Hitta</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("app/views/search.ngt"); }
catch(err) { app = angular.module("app/views/search.ngt", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/search.ngt",
    "<div class=\"search\" ng-controller=\"SearchCtrl\">\n" +
    "  <div class=\"search-side\">\n" +
    "    <h1 class=\"brand-title\">Hitta ett hem</h1>\n" +
    "    <h2 class=\"brand-tagline\">Hjälper dig att ha nära till centrum</h2>\n" +
    "    <form class=\"form-horizontal\" role=\"form\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-md-6 control-label\">Max tid från centrum</label>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <input class=\"form-control\" type=\"text\" placeholder=\"ex. 16 min\" ng-model=\"transitTimeToCenter\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-md-6 control-label\">Antal rum </label>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <input class=\"form-control\" type=\"text\" placeholder=\"min\" ng-model=\"var.roomMin\"> <input class=\"form-control\" type=\"text\" placeholder=\"max\" ng-model=\"var.roomMax\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-md-6 control-label\">Pris </label>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <input class=\"form-control\" type=\"text\" placeholder=\"min\" ng-model=\"var.priceMin\"> <input class=\"form-control\" type=\"text\" placeholder=\"max\" ng-model=\"var.priceMax\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label class=\"col-md-6 control-label\">Area </label>\n" +
    "        <div class=\"col-md-6\">\n" +
    "          <input class=\"form-control\" type=\"text\" placeholder=\"min\" ng-model=\"var.areaMin\"> <input class=\"form-control\" class=\"pure-u-1-4\" type=\"text\" placeholder=\"max\" ng-model=\"var.areaMax\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <button type=\"submit\" ng-click=\"appendSearch()\" ng-disabled=\"disableAppendSearch() || isSearching \">Ladda fler</button>\n" +
    "        <button type=\"submit\" style=\"padding: 0 0 0 0\" class=\"pure-button pure-button-primary pure-u-1-5\" ng-click=\"search()\" ng-disabled=\"isSearching\">\n" +
    "          <div ng-hide=\"isSearching\">Sök</div>\n" +
    "          <img src=\"img/loading.gif\" ng-show=\"isSearching\">\n" +
    "        </button>\n" +
    "        <br/>\n" +
    "        <label><span ng-show=\"listings.length\">{{listings.length}} av {{result.totalLenght}}</span></label>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "<!-- \n" +
    "      <h2 class=\"brand-tagline\">\n" +
    "        Sortera efter\n" +
    "        <a class=\"pure-button icon-small\" ng-click=\"reverse=!reverse\" href=\"#\">\n" +
    "          <i class=\"fa fa-sort-amount-asc\" ng-show=\"!reverse\"></i>\n" +
    "          <i class=\"fa fa-sort-amount-desc\" ng-show=\"reverse\"></i>\n" +
    "         </a>\n" +
    "      </h2>\n" +
    "      <nav class=\"nav\">\n" +
    "        <ul class=\"nav-list\">\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'location.position.transitTimeToCenter';\" href=\"#\" ng-disabled=\"predicate == 'location.position.transitTimeToCenter'\">Restid\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'listPrice';\" href=\"#\" ng-disabled=\"predicate == 'listPrice'\">Pris\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'costPerM2';\" href=\"#\" ng-disabled=\"predicate == 'costPerM2'\">Pris/m2\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'rent';\" href=\"#\" ng-disabled=\"predicate == 'rent';\">Hyra\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'aproxLivingCost';\" href=\"#\" ng-disabled=\"predicate == 'aproxLivingCost';\">Kostnad/mån\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'rooms';\" href=\"#\" ng-disabled=\"predicate == 'rooms'\">Rum\n" +
    "\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"nav-item\">\n" +
    "            <a class=\"pure-button\" ng-click=\"predicate = 'livingArea';\" href=\"#\" ng-disabled=\"predicate == 'livingArea'\">Area\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "      <div>\n" +
    "        <label><input id=\"remember\" type=\"checkbox\" ng-model=\"sanityCheckBool\"/>Ta bort annonser med pris 0 </label>\n" +
    "      </div> -->\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- <div ng-class=\"getBoxSpanClass($index)\" ng-repeat=\"listing in listings | filter:sanityCheck | orderBy:predicate:reverse\">\n" +
    "    <div class=\"adbox\" >\n" +
    "      <a ng-href=\"{{listing.url}}\" target=\"_blank\">\n" +
    "        <div class=\"imagebox\" style=\"background-image: url('{{getImgUrl(listing)}}')\"></div>\n" +
    "      </a>\n" +
    "      <div class=\"minuteBox\">\n" +
    "        <h1 style=\"margin-bottom: 0; margin-top: 0px\" >{{getTransitTime(listing)}}min</h1>\n" +
    "      </div>\n" +
    "      <div class=\"adbox-inner\">\n" +
    "        <h2 title=\"{{listing.location.region.municipalityName}}\" class=\"tooltip\">{{listing.location.address.streetAddress}}</h2>\n" +
    "        <div>\n" +
    "          <div>\n" +
    "            <table>\n" +
    "              <tbody>\n" +
    "                <tr>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                  <td>{{ prettyNumbers(listing.listPrice) }} kr</td>\n" +
    "                  <td>{{ getCostPerM2(listing) }} kr/m2</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                  <td>{{listing.rooms}} rum </td>\n" +
    "                  <td>{{listing.livingArea}} m2</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                  <td>Hyra {{prettyNumbers(listing.rent)}} kr</td>\n" +
    "                  <td>Byggt: {{listing.constructionYear}}</td>\n" +
    "                  <td>Kostnad ~{{ getAproxLivingCost(listing)}} kr/mån</td>\n" +
    "                </tr>\n" +
    "              </tbody>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div> -->\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("app/views/templates/popover-home.ngt"); }
catch(err) { app = angular.module("app/views/templates/popover-home.ngt", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/templates/popover-home.ngt",
    "<div class=\"popover\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "  <div class=\"popover-content\">\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"item in items\">\n" +
    "        <a href=\"#\">{{item}} {{unit}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();
