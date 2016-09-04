var __realConsoleLog = console.log;
var __exampleConsoleLog = function(message){
    __realConsoleLog(arguments.callee);
};

var log = function(message){
};

$(document).ready(function(){
    $('.promise-article').each(function(){
        var $this = $(this);
        var $code = $this.find('code')
        var $results = $this.find('.results');
        var $script = $code.find('script');
        var scriptJS = $script.html();
        scriptJs = scriptJS.replace(/^ {28}/gm, '').replace(/^\n/, '');
        $code.html(Prism.highlight(scriptJs, Prism.languages.js));

        var log = function(message){
            $results.append('<li>' + message + "</li>");
        };
        eval(scriptJS);
    })
});