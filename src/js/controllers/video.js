angular
  .module('finalProject')
  .controller('VideoCtrl', VideoCtrl);

VideoCtrl.$inject = ['$scope', '$timeout', 'video'];
function VideoCtrl($scope, $timeout, video) {

  $scope.videos = {
    first: 'http://www.w3schools.com/html/mov_bbb.mp4'
  };

  $scope.playVideo = function playVideo(sourceUrl) {
    video.addSource('mp4', sourceUrl, true);
  };

  $scope.getVideoName = function getVideoName(videoModel) {

    switch (videoModel.src) {
      case ($scope.videos.first): return 'Earth';
      default: return 'Unknown Video';
    }

  };

 // Add some video sources for the player!
  video.addSource('mp4', $scope.videos.first);
}
