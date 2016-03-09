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
  //jscs:disable maximumLineLength
  app.defaultAvatar = 'data:image/png;base64,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';
  app.defaultAssetIcon = 'data:image/png;base64,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Isw6IUCAAAECdQkIAHXVw2gIECBAgEARAQGgCLNOCBAgQIBAXQICQF31MBoCBAgQIFBEQAAowqwTAgQIECBQl4AAUFc9jIYAAQIECBQREACKMOuEAAECBAjUJSAA1FUPoyFAgAABAkUEBIAizDohQIAAAQJ1CQgAddXDaAgQIECAQBEBAaAIs04IECBAgEBdAgJAXfUwGgIECBAgUERAACjCrBMCBAgQIFCXgABQVz2MhgABAgQIFBEQAIow64QAAQIECNQlIADUVQ+jIUCAAAECRQQEgCLMOiFAgAABAnUJCAB11cNoCBAgQIBAEQEBoAizTggQIECAQF0CAkBd9TAaAgQIECBQREAAKMKsEwIECBAgUJeAAFBXPYyGAAECBAgUERAAijDrhAABAgQI1CUgANRVD6MhQIAAAQJFBASAIsw6IUCAAAECdQkIAHXVw2gIECBAgEARAQGgCLNOCBAgQIBAXQICQF31MBoCBAgQIFBEQAAowqwTAgQIECBQl4AAUFc9jIYAAQIECBQREACKMOuEAAECBAjUJSAA1FUPoyFAgAABAkUEBIAizDohQIAAAQJ1CQgAddXDaAgQIECAQBEBAaAIs04IECBAgEBdAgJAXfUwGgIECBAgUERAACjCrBMCBAgQIFCXgABQVz2MhgABAgQIFBEQAIow64QAAQIECNQlIADUVQ+jIUCAAAECRQQEgCLMOiFAgAABAnUJCAB11cNoCBAgQIBAEQEBoAizTggQIECAQF0CAkBd9TAaAgQIECBQREAAKMKsEwIECBAgUJeAAFBXPYyGAAECBAgUERAAijDrhAABAgQI1CUgANRVD6MhQIAAAQJFBASAIsw6IUCAAAECdQkIAHXVw2gIECBAgEARAQGgCLNOCBAgQIBAXQICQF31MBoCBAgQIFBEQAAowqwTAgQIECBQl4AAUFc9jIYAAQIECBQREACKMOuEAAECBAjUJSAA1FUPoyFAgAABAkUEBIAizDohQIAAAQJ1CQgAddXDaAgQIECAQBEBAaAIs04IECBAgEBdAgJAXfUwGgIECBAgUERAACjCrBMCBAgQIFCXgABQVz2MhgABAgQIFBEQAIow64QAAQIECNQlIADUVQ+jIUCAAAECRQQEgCLMOiFAgAABAnUJCAB11cNoCBAgQIBAEQEBoAizTggQIECAQF0CAkBd9TAa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';
  //jscs:enable maximumLineLength

})(document);
