require.config({
    baseUrl: './assets/js',
    map: {
        '*': {
            'css': 'libs/require-css-0.1.5.min'
        }
    },
    paths: {
        jquery: 'libs/jquery-1.11.1.min',
        modernizr: 'libs/modernizr-2.8.3.min',
        moment: 'libs/moment-2.8.3.min',
        fullcalendar: 'libs/fullcalendar/fullcalendar.min',
        fullcalendar_lang: 'libs/fullcalendar/lang-all'
    },
    shim: {
        modernizr: {
            exports: '_'
        },
        fullcalendar:{
            deps: [
                'css!../js/libs/fullcalendar/fullcalendar.min',
                'moment',
                'jquery'
            ]
        },
        fullcalendar_lang: {
            exports: 'fullcalendar'
        }
    }
});