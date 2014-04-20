(function(module) {
try { app = angular.module("app/views/home.ngt"); }
catch(err) { app = angular.module("app/views/home.ngt", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/home.ngt",
    "<h1>{{test}}</h1>");
}]);
})();

(function(module) {
try { app = angular.module("app/views/search.ngt"); }
catch(err) { app = angular.module("app/views/search.ngt", []); }
app.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/views/search.ngt",
    "<div class=\"pure-g-r\" id=\"layout\" ng-controller=\"SearchCtrl\">\n" +
    "    <div class=\"sidebar pure-u\">\n" +
    "        <header class=\"header\">\n" +
    "            <hgroup>\n" +
    "                <h1 class=\"brand-title\">Hitta ett hem</h1>\n" +
    "                <h2 class=\"brand-tagline\">Hjälper dig att ha nära till centrum</h2>\n" +
    "            </hgroup>\n" +
    "            <form class=\"pure-form pure-g-r\">\n" +
    "                <fieldset>\n" +
    "                    <p>\n" +
    "                        <label class=\"pure-u-1-2\">Max tid från centrum</label>\n" +
    "                        <input class=\"pure-u-1-2\" type=\"text\" placeholder=\"ex. 16 min\" ng-model=\"transitTimeToCenter\">\n" +
    "                    </p>\n" +
    "                    <p>\n" +
    "                        <label class=\"pure-u-1-2\">Antal rum </label>\n" +
    "                        <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"min\" ng-model=\"var.roomMin\"> <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"max\" ng-model=\"var.roomMax\">\n" +
    "                    </p>\n" +
    "                    <p>\n" +
    "                        <label class=\"pure-u-1-2\">Pris </label>\n" +
    "                        <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"min\" ng-model=\"var.priceMin\"> <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"max\" ng-model=\"var.priceMax\">\n" +
    "                    </p>\n" +
    "                    <p>\n" +
    "                        <label class=\"pure-u-1-2\">Area </label>\n" +
    "                        <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"min\" ng-model=\"var.areaMin\"> <input class=\"pure-u-1-4\" type=\"text\" placeholder=\"max\" ng-model=\"var.areaMax\">\n" +
    "                    </p>\n" +
    "\n" +
    "                    <p style=\"margin-bottom: 0\">\n" +
    "                        <button type=\"submit\" class=\"pure-button pure-button-primary pure-u-2-4\" ng-click=\"appendSearch()\" ng-disabled=\"disableAppendSearch() || isSearching \">Ladda fler</button>\n" +
    "\n" +
    "                        <button type=\"submit\" style=\"padding: 0 0 0 0\" class=\"pure-button pure-button-primary pure-u-1-5\" ng-click=\"search()\" ng-disabled=\"isSearching\">\n" +
    "                            <div ng-hide=\"isSearching\" style=\"padding: 8px 0 8px 0;\">Sök</div>\n" +
    "                            <img src=\"img/loading.gif\" style=\"max-width: 30px; margin: 2px 0 -1px 0; padding: 0 0 0 0;\" ng-show=\"isSearching\">\n" +
    "                        </button>\n" +
    "\n" +
    "                        <br/>\n" +
    "                        <label class=\"pure-u-1-2\"><span ng-show=\"listings.length\">{{listings.length}} av {{result.totalLenght}}</span></label>\n" +
    "                    </p>\n" +
    "                </fieldset>\n" +
    "            </form>\n" +
    "            <!-- <h2 class=\"brand-tagline\">\n" +
    "                Sortera efter\n" +
    "                <a style=\"margin-top: 0;\" class=\"pure-button icon-small\" ng-click=\"reverse=!reverse\" href=\"#\">\n" +
    "                    <i class=\"fa fa-sort-amount-asc\" ng-show=\"!reverse\"></i>\n" +
    "                    <i class=\"fa fa-sort-amount-desc\" ng-show=\"reverse\"></i>\n" +
    "                 </a>\n" +
    "            </h2>\n" +
    "            <nav class=\"nav\">\n" +
    "                <ul class=\"nav-list\">\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'location.position.transitTimeToCenter';\" href=\"#\" ng-disabled=\"predicate == 'location.position.transitTimeToCenter'\">Restid\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'listPrice';\" href=\"#\" ng-disabled=\"predicate == 'listPrice'\">Pris\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'costPerM2';\" href=\"#\" ng-disabled=\"predicate == 'costPerM2'\">Pris/m2\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'rent';\" href=\"#\" ng-disabled=\"predicate == 'rent';\">Hyra\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'aproxLivingCost';\" href=\"#\" ng-disabled=\"predicate == 'aproxLivingCost';\">Kostnad/mån\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'rooms';\" href=\"#\" ng-disabled=\"predicate == 'rooms'\">Rum\n" +
    "\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li class=\"nav-item\">\n" +
    "                        <a class=\"pure-button\" ng-click=\"predicate = 'livingArea';\" href=\"#\" ng-disabled=\"predicate == 'livingArea'\">Area\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </nav> -->\n" +
    "    <!--             <div>\n" +
    "              <label><input id=\"remember\" type=\"checkbox\" ng-model=\"sanityCheckBool\"/>Ta bort annonser med pris 0 </label>\n" +
    "            </div>\n" +
    "        -->    </header>\n" +
    "    </div>\n" +
    "    <div ng-class=\"getBoxSpanClass($index)\" ng-repeat=\"listing in listings | filter:sanityCheck | orderBy:predicate:reverse\">\n" +
    "        <div class=\"adbox\" >\n" +
    "            <a ng-href=\"{{listing.url}}\" target=\"_blank\">\n" +
    "                <div class=\"imagebox\" style=\"background-image: url('{{getImgUrl(listing)}}')\"></div>\n" +
    "            </a>\n" +
    "            <div class=\"minuteBox\">\n" +
    "                <h1 style=\"margin-bottom: 0; margin-top: 0px\" >{{getTransitTime(listing)}}min</h1>\n" +
    "            </div>\n" +
    "            <div class=\"adbox-inner\">\n" +
    "                <h2 title=\"{{listing.location.region.municipalityName}}\" class=\"tooltip\">{{listing.location.address.streetAddress}}</h2>\n" +
    "                <div class=\"pure-g-r\">\n" +
    "                    <div class=\"pure-u-1\">\n" +
    "                        <table class=\"pure-table pure-table-horizontal\">\n" +
    "                            <tbody>\n" +
    "                                <tr>\n" +
    "\n" +
    "                                </tr>\n" +
    "                                <tr>\n" +
    "                                    <td style=\"padding-left: 0\" >{{ prettyNumbers(listing.listPrice) }} kr</td>\n" +
    "                                    <td style=\"padding-right: 0\" >{{ getCostPerM2(listing) }} kr/m2</td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                    <td style=\"padding-left: 0\">{{listing.rooms}} rum </td>\n" +
    "                                    <td style=\"padding-right: 0\">{{listing.livingArea}} m2</td>\n" +
    "                                </tr>\n" +
    "\n" +
    "                                <tr>\n" +
    "                                    <td style=\"padding-left: 0\">Hyra {{prettyNumbers(listing.rent)}} kr</td>\n" +
    "                                    <!--<td>Byggt: {{listing.constructionYear}}</td>-->\n" +
    "                                    <td style=\"padding-right: 0\">Kostnad ~{{ getAproxLivingCost(listing)}} kr/mån</td>\n" +
    "                                </tr>\n" +
    "\n" +
    "\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();
