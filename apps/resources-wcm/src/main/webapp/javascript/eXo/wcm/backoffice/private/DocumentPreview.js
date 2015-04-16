(function(gj, base) {
    function DocumentPreview() {
        this.refreshCommentsAction = "";
    }

    DocumentPreview.prototype.setRefreshCommentsAction = function(refreshCommentsAction) {
        this.refreshCommentsAction = refreshCommentsAction;
    };

    DocumentPreview.prototype.initScreen = function() {

        var $uiDocumentPreview = gj("#UIDocumentPreview");

        // Temporarily disable body scroll
        gj('body').css('overflow', 'hidden');

        // Bind Esc key
        var closeEventHandler = function(e) {
            gj('#presentationMode').blur();
            if (e.keyCode == 27 && ("presentationMode" != e.target.id || gj.browser.mozilla)) {
                gj(".exitWindow > .uiIconClose", $uiDocumentPreview).trigger("click");
            }
        }
        gj(document).on('keyup', closeEventHandler);

        // Resize Event
        var resizeEventHandler = function() {
            // Calculate margin 
            var pdfDisplayAreaHeight = window.innerHeight - 62;
            gj('#outerContainer', $uiDocumentPreview).height(pdfDisplayAreaHeight); // pdf viewer
            var $commentArea = gj('.commentArea', $uiDocumentPreview);
            var $commentAreaTitle = gj('.title', $commentArea);
            var $commentInputBox = gj('.commentInputBox', $commentArea);
            var $commentList = gj('.commentList', $commentArea);
            var $highlightBox = gj('.highlightBox', $commentArea);
            var $actionBarCommentArea = gj('.actionBar', $commentArea);
            var commentAreaHeight = window.innerHeight - 30;
            $commentArea.height(commentAreaHeight);
            $commentList.css('max-height', commentAreaHeight - $commentAreaTitle.innerHeight() - $commentInputBox.innerHeight() - $highlightBox.innerHeight() - $actionBarCommentArea.innerHeight());
            $commentList.scrollTop(20000);

            // Media viewer, no preview file
            var $navigationContainer = gj(".navigationContainer", $uiDocumentPreview);
            var $uiContentBox = gj('.uiContentBox', $navigationContainer);
            var $video = gj('.videoContent', $uiContentBox);
            var $flowplayerContentDetail = gj('.ContentDetail', $uiContentBox);
            var $flowplayerPlayerContent = gj('.PlayerContent', $flowplayerContentDetail);
            var $flowplayer = gj('object', $flowplayerPlayerContent);
            var $flashViewer = gj('.FlashViewer', $uiContentBox);
            var $embedFlashViewer = gj('embed', $flashViewer);
            var $windowmediaplayer = gj('#MediaPlayer1', $uiContentBox);
            var $embedWMP = gj('embed', $windowmediaplayer);

            $navigationContainer.height(pdfDisplayAreaHeight);
            $uiContentBox.height(pdfDisplayAreaHeight);
            $flowplayerContentDetail.height(pdfDisplayAreaHeight);
            $flowplayerPlayerContent.height(pdfDisplayAreaHeight - 5);
            $flashViewer.height(pdfDisplayAreaHeight - 5);

            $flowplayer.css('max-width', $uiContentBox.width() - 2);
            $flowplayer.css('max-height', $uiContentBox.height() - 3);
            $flowplayer.css('width', '100%');
            $flowplayer.css('height', '100%');

            $video.css('max-width', $uiContentBox.width() - 2);
            $video.css('max-height', $uiContentBox.height() - 3);
            $video.css('width', '100%');
            $video.css('height', 'auto');

            $windowmediaplayer.css('max-width', $uiContentBox.width() - 2);
            $windowmediaplayer.css('max-height', $uiContentBox.height() - 7);
            $windowmediaplayer.css('width', '100%');
            $windowmediaplayer.css('height', '100%');
            $embedWMP.css('width', '100%');
            $embedWMP.css('height', '100%')

            $embedFlashViewer.css('max-width', $uiContentBox.width() - 2);
            $embedFlashViewer.css('max-height', $uiContentBox.height() - 3);
            $embedFlashViewer.css('width', '100%');
            $embedFlashViewer.css('height', '100%');

            var $img = gj('a > img', $uiContentBox);
            if ($img.length > 0) {
                $img.css('max-width', $uiContentBox.width() - 2);
                $img.css('max-height', $uiContentBox.height() - 3);
                $img.css('width', 'auto');
                $img.css('height', 'auto');
                $navigationContainer.css('overflow', 'hidden');
            }

            gj('.uiPreviewWebContent', $uiDocumentPreview).height(pdfDisplayAreaHeight - 30) // webcontent
            gj('.EmbedHtml', $uiDocumentPreview).height(pdfDisplayAreaHeight) // External embedded

        }
        resizeEventHandler();
        gj(window).on('resize', resizeEventHandler);

        // Bind close event. Return body scroll, turn off keyup
        gj(".exitWindow > .uiIconClose", $uiDocumentPreview).click(function() {
            setTimeout(function() {
                gj('body').css('overflow', 'visible');
                gj(document).off('keyup', closeEventHandler);
                gj(window).off('resize', resizeEventHandler);
            }, 500);
        });

        // Bind expanded/collapsed event
        gj('.uiIconMiniArrowLeft, .uiIconMiniArrowRight', $uiDocumentPreview).click(function() {
            var $uiIconMiniArrow = gj(this);
            var $commentArea = gj('.commentArea', $uiDocumentPreview);
            var $uiPreviewWebContent = gj('.uiPreviewWebContent', $uiDocumentPreview);
            var $fileContent = gj('.fileContent', $uiDocumentPreview);
            var $resizeButton = gj('.resizeButton', $uiDocumentPreview);
            var $downloadButton = gj('.downloadBtn', $uiDocumentPreview);
            var $EmbedHtml = gj('.EmbedHtml', $uiDocumentPreview);
            if ($uiIconMiniArrow.hasClass('uiIconMiniArrowRight')) {
                $commentArea.css('display', 'none');
                $uiPreviewWebContent.css('margin-right', '30px');
                $EmbedHtml.css('margin-right', '30px');
                $fileContent.css('margin-right', '30px');
                $resizeButton.css('right', '5px');
                $downloadButton.css('right', '30px');
            } else {
                $commentArea.css('display', 'block');
                $uiPreviewWebContent.css('margin-right', '335px');
                $EmbedHtml.css('margin-right', '335px');
                $fileContent.css('margin-right', '335px');
                $resizeButton.css('right', '310px');
                $downloadButton.css('right', '335px');
            }
            $uiIconMiniArrow.toggleClass('uiIconMiniArrowLeft');
            $uiIconMiniArrow.toggleClass('uiIconMiniArrowRight');
            resizeEventHandler();

        });

        // Click shadow mask to close preview
        gj($uiDocumentPreview).mouseup(function(e) {
            var $target = gj(e.target);
            if ($target.attr('id') === "UIDocumentPreview"
             || $target.hasClass('uiVote')
             || "clearfix" === e.target.className
             || $target.hasClass('UIResizableBlock')) {
                gj(".exitWindow > .uiIconClose", $uiDocumentPreview).trigger("click");
            }
        });
    };

    DocumentPreview.prototype.bindPostCommentEvent = function() {
        // Bind comment text area
        gj('#commentTextAreaPreview').unbind('keypress');
        gj('#commentTextAreaPreview').keypress(function(e) {
            var $commentTextAreaPreview = gj(this);
            var code = e.keyCode || e.which;
            if (code == 13) { // Enter keycode
                commentTextAreaPreview.blur();
                var activityId = $commentTextAreaPreview.attr('activityId');
                var commentText = $commentTextAreaPreview.val();
                $commentTextAreaPreview.val('');

                if (gj.trim(commentText).length === 0) {
                    commentTextAreaPreview.focus();
                    e.preventDefault();
                    return;
                }

                var postActivityLink = "/rest/private/portal/social/activities/" + activityId + "/comments/create.json?text=" + commentText + "&opensocial_viewer_id=" + eXo.env.portal.userName;
                var jqxhr = gj.ajax(postActivityLink)
                    .done(function() {
                        eXo.ecm.DocumentPreview.refreshComments();
                    })
                    .fail(function() {
                        alert("error");
                    });

                e.preventDefault();
            }
        });

        // Set placeholder for IE
        if (this.isIE()) {
            gj('#commentTextAreaPreview').val('');
        }
    };

    DocumentPreview.prototype.isIE = function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        }
        return false;
    };

    DocumentPreview.prototype.refreshComments = function() {
        var url = decodeURIComponent(this.refreshCommentsAction);
        eval(url);
    };

    eXo.ecm.DocumentPreview = new DocumentPreview();

    return {
        DocumentPreview: eXo.ecm.DocumentPreview
    };
})(gj, base);
