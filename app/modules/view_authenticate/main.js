//main.js
define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    initialize: function(){

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

      },

      signIn: function(e){
        alert("ok");
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