/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.env = {
    db: {
      baseUrl: 'https://myjarvis.firebaseio.com',
      users: 'https://myjarvis.firebaseio.com/users/',
      assets: 'https://myjarvis.firebaseio.com/assets/',
      history: 'https://myjarvis.firebaseio.com/history/'
    }
  };

  app.db = new Firebase('https://myjarvis.firebaseio.com');

  /* TODO Sets application's Authentication Status */

  app.isAuthenticated = function() {
    var authData = app.db.getAuth();
    return (authData) ? true : false;
  };

  app.logOut = function() {
    app.db.unauth();
    app.isAuthenticated();
  };

  app.getLoggedInUserId = function() {
    var authData = app.db.getAuth();
    if (authData) {
      return authData.uid;
    } else {
      return null;
    }
  };

  app.getLoggedInUserEmailId = function() {
    var authData = app.db.getAuth();
    if (authData) {
      return authData.password.email;
    } else {
      return null;
    }
  };

  app.loggedInUserEmailId = app.getLoggedInUserEmailId();
  app.loggedInUserUID = app.getLoggedInUserId();
  app.isAuth = app.isAuthenticated();

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') { // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var appLogo = Polymer.dom(document).querySelector('#mainToolbar .app-logo');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);

    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appLogo);

  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };

  app.defaultAvatar = 'data:image/png;base64,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';
})(document);
