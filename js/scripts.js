var __realConsoleLog = console.log;
var __exampleConsoleLog = function(message){
    __realConsoleLog(arguments.callee);
};

var log = function(message){
};

$(document).ready(function(){
    createToc($);
    setTimeout(scrollToElementInLocation.bind(null, $), 500);
    rerunScriptsWhileCatchingOutput($);
});

function createToc($){
    var $toc = $('.toc').find('ul');

    $('.promise-group').each(function(){
        var $group = $(this);
        var $h2 = $group.find('h2').first();
        var id = slugify($h2.text());
        var $tocGroup = $(printf('<li><a href="#%%">%%</a><ul></ul></li>', id, $h2.text()));
        var $tocGroupUl = $tocGroup.find('ul');
        $toc.append($tocGroup);
        $h2.attr('id', id);

        $group.find('h3').each(function(){
            var $this = $(this);
            var id = slugify($this.text());
            $this.attr('id', id);

            $tocGroupUl.append(printf('<li><a href="#%%">%%</a></li>', id, $this.text()));
        });
    });
}

function scrollToElementInLocation($){
    if (window.location.hash){
        var hash = window.location.hash.substr(1);
        var $element = $('#' + hash);
        $(window).scrollTop($element.offset().top);
    }
}

function rerunScriptsWhileCatchingOutput($){
    $('.promise-article').each(function(){
        var $this = $(this);
        var $code = $this.find('code');
        var $results = $this.find('.results');
        var $script = $code.find('script');
        var scriptJS = $script.html();
        scriptJs = scriptJS.replace(/^ {24}/gm, '').replace(/^\n/, '');
        $code.html(Prism.highlight(scriptJs, Prism.languages.js));

        var log = function(message){
            $results.append('<li>' + message + "</li>");
        };
        eval(scriptJS);
    })
}

// From: https://gist.github.com/mathewbyrne/1280286
function slugify(text)
{
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function printf(){
    var index = 0;
    var args = arguments;
    return arguments[0].replace(/%%/g, function(){
        return args[++index];
    });
}