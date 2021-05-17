var starter = {
    init: function () {

    },

    cf7: {
        init: function () {
            this.addEventListeners();
        },
        reInit: function () {
            if (typeof wpcf7 === 'undefined') {
                return;
            }

            jQuery('div.wpcf7 > form').each(function () {
                var $form = jQuery(this);
                wpcf7.initForm($form);

                if (wpcf7.cached) {
                    wpcf7.refill($form);
                }
            });
        },
        addEventListeners: function () {
            this.eventsSubmit();
            this.eventsValidate();
        },
        eventsValidate: function () {
            jQuery('.wpcf7-form-control').on('input', function () {
                jQuery(this).removeClass('wpcf7-not-valid');
            });
        },
        eventsSubmit: function () {
            jQuery('div.wpcf7').on('wpcf7beforesubmit', function (event) {
                var $form = jQuery('form', event.target);
                $form.addClass('sending');
            });

            jQuery('div.wpcf7').on('wpcf7submit', function (event) {
                var $form = jQuery('form', event.target);
                $form.removeClass('sending');
            });

            jQuery('div.wpcf7').on('wpcf7mailsent', function (event) {
                var message = event.detail.apiResponse.message;

                var $btn = jQuery('form input[type="submit"]', event.target);

                var val = $btn.val();
                var fs = $btn.css('font-size');

                $btn.css('font-size', '13px');
                $btn.val(message);

                setTimeout(function () {
                    $btn.css('font-size', fs);
                    $btn.val(val);
                }, 8000);
            });
        },
    },
};

jQuery(window).load(function () {
    starter.init();
});