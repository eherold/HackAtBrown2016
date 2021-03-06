Requests = new Mongo.Collection("requests");

// Schema for our database

var priceSchema = new SimpleSchema({
    price: {
      type: Number,
      label: "Price"
    },
    action: {
      type: String,
      label: "Action"
    }
})

var advertSchema = new SimpleSchema({
    title: {
      type: String,
      label: "Title"
    },
    description: {
      type: String,
      label: "Description"
    },
    businessPix: {
      type: [String],
      label: "Business Pictures"
    },
    inspirationPix: {
      type: [String],
      label: "Inspiration Pictures"
    },
    pricing: {
      type: [priceSchema],
      label: "Pricing"
    },
    skills: {
      type: [String],
      label: "Skills Needed"
    }
})
var requestSchema = new SimpleSchema({
    userName: {
       type: String,
       label: "Name"
    },
    userEmail: {
       type: String,
       label: "Email"
    },
    advert: { // "text", "video", "image"
        type: advertSchema,
        label: "Idea"
    },
    id: {
       type: String,
       label: "Id"
    }
});

Requests.attachSchema(requestSchema);





if (Meteor.isClient) {
  smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
      selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function ( toggle, anchor ) {} // Function to run after scrolling);
  });
  console.log("smooth scroll initialized");

  // ~*~*~*~*~ HELPER FUNCTIONS ~*~*~*~*~*~
  Template.home.helpers({

    counter: function () {
      return Session.get('counter');
    },

    requests: function () {
      console.log("Printing data:");

      var data = Requests.find().fetch();
      var printData = function (obj) {console.log(obj.userName + " "
                                              + obj.userEmail + " "
                                              + obj.advert)};
      data.forEach(printData);
      console.log(data);
      return data;
    },

    addData: function () {
      var myAdvert = {
        title: "Recipe app for dogs",
        description: "Helps me find good recipes for my dogs. Yay!",
        businessPix: ["https://i.ytimg.com/vi/8M7Qie4Aowk/hqdefault.jpg"],
        inspirationPix: ["http://www.healthwisepetfood.com/system/images/BAhbBlsHOgZmIlgyMDEyLzA5LzEyLzIwXzMwXzAyXzY4NV9IZWFsdGhXaXNlX0xhbWJfTWVhbF9PYXRtZWFsX0Zvcm11bGFfQWR1bHRfRHJ5X0RvZ19Gb29kLmpwZw/HealthWise_Lamb_Meal_Oatmeal_Formula_Adult_Dry_Dog_Food.jpg"],
        pricing: [{price: 50, action: "Final Logo"}],
        skills: ["Figma", "Graphic Design"]
      }

      var myRequest = {userName : "Emma",
                      userEmail : "emma@cs.brown.edu",
                      advert : myAdvert,
                      id : "abc"};

      Requests.insert(myRequest);
    }
  });

  // ~*~*~*~*~*~ EVENT HANDLING ~*~*~*~*~*~*~*~*~
  Template.addAdvertForm.events({
    'click .submitbutton' : function(event, template) {
        var type = template.find('input:radio[name=toggle]:checked');
        // Session.set("submissiontype", $(type).val());
        // console.log("submissiontype set to " + Session.get("submissiontype"));
        // Router.go("/");
    },
  'blur #form_pricingPrice': function() {
    var priceVal = event.target.value;
    var priceInputsElem = document.getElementById("price-inputs");
    var priceWarningElem = document.getElementById("price-warning");
    if (isNaN(priceVal)) {
        if (!priceInputsElem.classList.contains("has-error")) {
            priceInputsElem.classList.add("has-error");
            priceWarningElem.classList.remove("hidden");
            console.log(priceInputsElem.classList);
            console.log(priceWarningElem.classList);
        }
    } else {
        if (priceInputsElem.classList.contains("has-error")) {
            priceInputsElem.classList.remove("has-error");
            priceWarningElem.classList.add("hidden");
            console.log(priceInputsElem.classList);
            console.log(priceWarningElem.classList);
        }
    }
},
    'submit form': function() {
        event.preventDefault();

        var formName = event.target.form_name.value;
        var formEmail = event.target.form_email.value;
        var formTitle = event.target.form_title.value;
        var formDescription = event.target.form_description.value;
        var formBusinessPix = event.target.form_businessPix.value;
        var formInspirationPix = event.target.form_inspirationPix.value;
        var formPricingPrice = event.target.form_pricingPrice.value;
        var formPricingDescription = event.target.form_pricingDescription.value;
        var formSkills = event.target.form_skills.value;

        var myAdvert = {
          title: formTitle,
          description: formDescription,
          businessPix: [formBusinessPix],
          inspirationPix: [formInspirationPix],
          pricing: [{price: formPricingPrice, action: formPricingDescription}],
          skills: ["Figma", "Graphic Design", formSkills]
        }

        var myRequest = {userName : formName,
                        userEmail : formEmail,
                        advert : myAdvert,
                        id : "abc"};

        Requests.insert(myRequest);
    }
  });

}




// ~*~*~*~*~*~ SERVER CODE ~*~*~*~*~*~
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
