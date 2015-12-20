(function () {

    angular.module("myApp.Iframe", ["ngSanitize"])
        .config(["$routeProvider", "$sceProvider", function ($routeProvider, $sceProvider) {
            $sceProvider.enabled(false);

            $routeProvider.when("/iframe", {
                redirectTo: "iframe/app1",
            })
            $routeProvider.when("/iframe/:app", {
                template: "<app-iframe></app-iframe>",
            })
        }])
        .directive('appIframe', AppIframe);

    function AppIframe() {
        return {
            replace: true,
            scope: true,
            template: "<iframe id='external' ng-src='{{vm.iframeUrl}}' width=400 height=400></iframe>",
            controller: IframeController,
            controllerAs: "vm",
            link: iFrameLink
        };

        function iFrameLink(scope, element) {
            element[0].addEventListener('load', function () {
                console.log("Loaded with: " + element[0].contentDocument.location.href);
                var anchor = element[0].contentDocument.body.querySelectorAll('a');
                [].forEach.call(anchor, function(a){a.onclick = captureIframeClick});
                focus();
            }, false);

            function captureIframeClick(){
                console.log(this.hash);
                localStorage.setItem(scope.vm.storageKey, this.hash);
                console.log('iframe clicked: '+this.href);
            }
        }

        IframeController.$inject = ["$routeParams", "$sce"];

        function IframeController($routeParams, $sce) {
            var vm = this;
            var urlMap = {
                'app1': $sce.trustAsUrl('http://127.0.0.1:8000/mockExternalApplications/app1.html'),
                'app2': $sce.trustAsUrl('http://127.0.0.1:8000/mockExternalApplications/app2.html')
            };
            var extAppName = $routeParams.app;
            vm.storageKey = extAppName + 'externAppPath';
            // Retrive the parameters from localStorage if they exist or
            // use NO parameters when loading the page
            var externAppPath = localStorage.getItem(vm.storageKey);
            if (!externAppPath) externAppPath = '';
            vm.iframeUrl = urlMap[extAppName] + externAppPath;
        }

    }

}());