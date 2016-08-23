﻿// import 'materialize-css';
import 'materialize-css';
import {Aurelia} from 'aurelia-framework';

/**
 * Main Sass file
 */
import '../styles/main.scss';

/**
 * Third Party Libraries
 */
import 'jquery';
import 'bootstrap';
import 'lodash';
import 'moment';
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

import enTranslation from './../assets/i18n/en';

/**
 * Aurelia configure
 *
 * @export
 * @param {Aurelia} aurelia
 * @returns {Promise<void>}
 */
export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    /**
     * This enables the animation plugin for aurelia
     * See: http://aurelia.io/hub.html#/doc/api/aurelia/templating/latest/class/Animator
     * See: https://gooy.github.io/aurelia-animator-velocity/#
     */
    .plugin('aurelia-animator-velocity')
    /**
     * i18n support
     * adapt options to your needs (see http://i18next.com/docs/options/)
     * make sure to return the promise of the setup method, in order to guarantee proper loading
     *
     * See: https://github.com/aurelia/i18n
     */
    .plugin('aurelia-i18n', (instance) => instance.setup({
      resources: {
        en: enTranslation
      },
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    }))
    /**
     * aurelia-materialize-bridge
     *
     * See: http://aurelia-ui-toolkits.github.io/demo-materialize/#/installation
     * See: https://github.com/aurelia-ui-toolkits/aurelia-materialize-bridge
     * See: https://github.com/aurelia-ui-toolkits/demo-materialize
     */
    .plugin('aurelia-materialize-bridge', bridge => bridge.useAll());

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}

/**
 * animated.css helper function
 */
$.fn.extend({
  animateCss: function (animationName: string): JQuery {
    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return $(this)
      .addClass('animated ' + animationName)
      .one(animationEnd, () => {
        $(this).removeClass('animated ' + animationName);
      });
  }
});
