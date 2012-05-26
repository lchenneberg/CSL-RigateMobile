define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
       Backbone = libs.backbone,
     ButtonTest = require('modules/button-test/main'),
    ListExample = require('modules/list-example/main'),
  DetailExample = require('modules/detail-example/main');
  ViewAuthenticate = require('modules/view_authenticate/main');


 // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "!/animals": "list",
      "!/animals/:id": "detail",
      "!/button": "button",
      "!signIn": "signIn",
      "*actions": "default",
      
    },

    'default': function() {
    },
    'signIn': function() {
      this.changeView(new ViewAuthenticate.Views.Main());
    },
    'loggedIn': function(){
      alert("You've been logged in");
    }

    // 'button': function() {
    //   this.changeView(new ButtonTest.Views.Main());
    // },

    // 'list': function() {
    //   this.changeView(new ListExample.Views.Main());
    // },

    // 'detail': function(id) {
    //   this.changeView(new DetailExample.Views.Main({
    //     model: new DetailExample.Model({ id: id })
    //   }));
    // }

  });

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    var router = new Router({
      // Define your container div where all content will be displayed.
      container: $("#main")
    });

    // document.addEventListener('touchstart', function(event) {
    //     event.preventDefault();
    // }, false);
    window.loggedIn = false;
    // Trigger the initial route
    Backbone.history.start({pushState: true});
    if(window.loggedIn){
      console.log("User: logged in");
    } else {
      console.log("User: not logged in");
      console.log("Display to : FormAuthenticate");
      Backbone.history.navigate("!signIn",false);
    }


  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
