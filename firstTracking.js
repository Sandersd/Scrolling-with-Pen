if (Meteor.isClient) {

  Template.body.events({
    'click #btn': function() {

      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var colors = new tracking.ColorTracker(['magenta']);

      colors.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (event.data.length === 0) {
          // No colors were detected in this frame.
        } else {
          event.data.forEach(function(rect) {
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
            context.strokeStyle = rect.color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            var penPer = rect.y / 450;
            var totHeight = $(document).height();
            //penPer = ?/totHeight -> ? = penPer * totHeight
            var scrollHeight = penPer * totHeight;
            console.log(scrollHeight);
            window.scrollTo(0, scrollHeight);
          });
        }
      });

      tracking.track('#video', colors, { camera: true });

    }
  });

}
