

// footer width = navbar width (evrytime)
$('#footer-content')
    .width($('#nav-options').width() + 40)
    .hide();

// footer width = navbar width (on resize)
$(window).resize(() => {$('#footer-content').width($('#nav-options').width() +40);});
