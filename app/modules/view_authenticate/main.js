//main.js
define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    defaults: {
      token: null,
      email: null,
      password: null,
      loggedIn: false
    },
    initialize: function(){
      
    },
    authenticate: function(){
      $("#btnSignIn").attr("disabled","disabled");
      console.log("Getting new token...");
      $.ajax({
        type: "post",
        async: false,
        url: "https://192.168.2.4:3000/api/tokens",
        data: {email: this.email, password: this.password},
        dataType: 'json',
        timeout: 300,
        context: $('body'),
        success: function(data){
          window.loggedIn = true;
          console.log("User is logged in with auth_token: " + data.auth_token);
          window.localStorage.setItem("cslAuthToken", data.auth_token);
          window.localStorage.setItem("cslUserID", data.user_id);
        },
        error: function(xhr, type){
          $("#btnSignIn").removeAttr("disabled");
          window.loggedIn = false;
          console.log("An error Has been Raised")
          console.log(type);
        }
      });
    }
  });

  var Collection = Backbone.Collection.extend({ /* your collection here */ });

  var Views = {
    
    Main: Backbone.View.extend({
      tagName: "section",
      className: "wysPage",
      template: _.template(require('text!./template.jst')),

      events: {
        // Respond to UI events, calling named functions in this object.
        // Example:
        "mouseup #btnSignIn"              : "signIn"
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function() {
        // Put any initialization code in here.
        // This is typically where you will set up
        // event listeners for model/collection events.
        // Example:
        // this.model.bind('change', this.render, this);
        // this.model.bind('destroy', this.remove, this);
        this.model = new Model();
      },

      signIn: function(e){
        e.preventDefault();
        var email = $("#txtEmail");
        var password = $("#txtPassword");
        var self = this;
        //dummyValues
        email.val("chenlu972@gmail.com");
        password.val("Passwd0");

        if(document.getElementById("signInForm").checkValidity()){
          console.log("SignInForm parameters : "+ email.val() + ", " + password.val());
          //this.model.set({email: "chenlu972@gmail.com", password: password.val()});
          this.model.email = email.val();
          this.model.password = password.val();
          this.model.authenticate();
          setTimeout(function(){
            if(window.loggedIn === true){
              $('.'+self.className).animate({opacity:0}, {duration: 2000, complete: function(){$('.'+self.className).remove();}});
              Backbone.history.navigate("/",true);
              console.log("SignInForm disappeared");
            } 
          }, 400);
        } else {
          console.log("SignInForm parameters are not valid");
          password.val("");
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