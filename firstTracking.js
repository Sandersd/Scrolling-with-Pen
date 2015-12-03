if (Meteor.isClient) {

  Template.body.events({
    'click #btn': function() {

      //Grab necessary elements
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      //Create Magenta color tracker
      var colors = new tracking.ColorTracker(['magenta']);

      colors.on('track', function(event) {
        //Clear the previous rectangle
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (event.data.length === 0) {
          // No colors were detected in this frame.
        } else {

          event.data.forEach(function(rect) {
            //Draw a rectangle around magenta object
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            //Find the percentage of the pen relative to the video
            var penPer = rect.y / 450;
            var totHeight = $(document).height();

            //penPer = ?/totHeight -> ? = penPer * totHeight
            var scrollHeight = penPer * totHeight;
            console.log(scrollHeight);

            //Scroll the window in relation to the pen
            window.scrollTo(0, scrollHeight);
          });
        }
      });

      //Initialize and prompt webcam
      tracking.track('#video', colors, { camera: true });

    }
  });

}
