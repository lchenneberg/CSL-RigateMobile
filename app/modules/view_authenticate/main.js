//main.js
define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    initialize: function(){
      this.token = null;
      this.email = null;
      this.password = null;
    },
    authenticate: function(){
      console.log("Getting new token...");
      $.ajax({
        type:"post",
        url: "https://localhost:3000/api/tokens",
        data: {email: this.email, password: this.password},
        dataType: 'json',
        timeout: 300,
        context: $('body'),
        success: function(data){
          console.log("success");
        },
        error: function(xhr, type){
          console.log(xhr);
        }
      });
    }

  });

  var Collection = Backbone.Collection.extend({ /* your collection here */ });

  var Views = {
    
    Main: Backbone.View.extend({
      tagName: "section",
      className: "ViewAuthenticate",
      template: _.template(require('text!./template.jst')),

      events: {
        // Respond to UI events, calling named functions in this object.
        // Example:
        "click button#btnSignIn"              : "signIn",
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function() {
        // Put any initialization code in here.
        // This is typically where you will set up
        // event listeners for model/collection events.
        // Example:
        // this.model.bind('change', this.render, this);
        // this.model.bind('destroy', this.remove, this);
        this.model = new Model

      },

      signIn: function(e){
        var email = $("#txtEmail");
        var password = $("#txtPassword");
        
        //dummyValues
        email.val("chenlu972@gmail.com");
        password.val("Passwd0");

        if(document.getElementById("signInForm").checkValidity()){
          console.log("SignInForm parameters : "+ email.val() + ", " + password.val());
          this.model.set({email: email, password: password});
          this.model.authenticate();
        } else {
          console.log("SignInForm parameters are not valid");
          password.val("");
        }
        if(1==2){
          window.loggedIn = true;
          $('.'+this.className).animate({opacity:0}, {duration: 2000, complete: function(){$('.'+this.className).remove();}});
          Backbone.history.navigate('/', false);
        } 
      },

      render: function() {
        // Put code in here that should be called when
        // the view is rendered.
        // Example:
        // $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).html(this.template(this.model.toJSON()));
        // return this;
      }

      // The rest of the view should be used to carry
      // out any view-specific logic.
    })
  };



  return {
    Model: Model,
    Collection: Collection,
    Views: Views
  };

});