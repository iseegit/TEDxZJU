$(function(){
    $(document).ready(function() {

        var mod = {};

        mod.initNav = function(urlLocation){
            $('.nav li[data-nav-target=' + urlLocation + ']').addClass('active');
        }

        mod.initVolunteerPage = function(){
            var urlHash, currentPageVolunteers;
            urlHash = (window.location.hash || "#2014-winter").substr(1);
            $('.content-nav li a[data-subnav-target=' + urlHash + ']').parent().addClass('active');
            loadVolunteers();
            $('.content-nav li a').click(function(event) {
                urlHash = $(event.target).attr('data-subnav-target');
                $(event.target).parent().addClass('active').siblings().removeClass('active');
                $('.content-wrapper').find('.guest-item').remove();
                loadVolunteers();
            });

            $('.content-wrapper').on('click', '.volunteer-img', function(event){
                event.preventDefault();
                var currentVolunteerPos = $(event.currentTarget).attr('data-list-position').split('/'),
                    currentVolunteer = list.volunteer[currentVolunteerPos[0]][currentVolunteerPos[1]];
                var introductionDialog =$(
                    '<div class="introductionDialog">' +
                        '<div class="dialog">' +
                            '<div class="content">' +
                                '<div class="dialog-close" title="关闭窗口">X</div>' +
                                '<img class="avatar" src="/post_image/volunteer/'+ currentVolunteerPos[0] + '/' + currentVolunteer.image + '"/>' +
                                '<div class="intro">' +
                                    '<div class="name">' +
                                        currentVolunteer.name +
                                        '<div class="sub-name">' +
                                            currentVolunteer.pinyin +
                                        '</div>' +
                                    '</div>' +
                                    '<p class="describe">' +
                                        currentVolunteer.introduction +
                                    '</p>' +
                                '</div>' +
                                '<img class="logo" src="/static/img/logo-brief.png"/>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
                $('.content-wrapper').append(introductionDialog);
                $('body').addClass('dialog-opened');
                $('.introductionDialog .dialog-close').click(function(ev){
                    introductionDialog.remove();
                    $('body').removeClass('dialog-opened');
                })
            })

            function loadVolunteers(){
                var volunteersContentStr = '';
                currentPageVolunteers = list.volunteer[urlHash] || [];
                $.each(currentPageVolunteers, function(index, val) {
                    volunteersContentStr += '<div class="guest-item"><a href="#" data-list-position="' + urlHash + '/' + index + '" class="volunteer-img"><img src="/post_image/volunteer/' + urlHash + '/' + val.image + '" alt="' + val.name + '" title="' + val.name + '"></a></div>';
                });
                $('.content-wrapper').append(volunteersContentStr);
            }
        }

        mod.initGuestPage = function(){
            var urlHash, currentPageGuests;
            urlHash = (window.location.hash || "#2014-winter").substr(1);
            $('.content-nav li a[data-subnav-target=' + urlHash + ']').parent().addClass('active');
            loadGuests();
            $('.content-nav li a').click(function(event) {
                urlHash = $(event.target).attr('data-subnav-target');
                $(event.target).parent().addClass('active').siblings().removeClass('active');
                $('.content-wrapper').find('.guest-item').remove();
                loadGuests();
            });

            function loadGuests(){
                var guestsContentStr = '',
                    dateMap ={
                        'winter': '/12/01/',
                        'summer': '/06/01/'
                    };
                currentPageGuests = list.guest[urlHash] || [];
                $.each(currentPageGuests, function(index, val) {
                    var currentGuestLink = urlHash.split('-')[0] + dateMap[urlHash.split('-')[1]] + 'guest-' + val.pinyin + '.html';
                    guestsContentStr += '<div class="guest-item"><a href="' + currentGuestLink + '" data-list-position="'
                                + urlHash
                                + '/' + index + '" class="guest-img"><img src="/post_image/guest/' + urlHash + '/'
                                + val.image + '" alt="' + val.name + '" title="' + val.name + '"></a></div>';
                });
                $('.content-wrapper').append(guestsContentStr);
            }
        }

        mod.initGuestPageDuoshuoComment = function(){
            duoshuoQuery = {short_name:"test-ted"};
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = 'http://static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
        }

        mod.init = function(){
            var urlLocation = window.location.href.split('/')[3] || 'home';

            mod.initNav(urlLocation);

            switch(urlLocation){
                case 'volunteer':
                    mod.initVolunteerPage();
                    break;
                case 'guest':
                    mod.initGuestPage();
                    mod.initGuestPageDuoshuoComment();
                    break;
                default:
                    break;
            }
        }

        mod.init();
    });
})
