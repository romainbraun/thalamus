/*@ngInject*/
/**
* @desc Project Card component
* @example
* <viz-project-card></viz-project-card>
*/

var projectCard = {

  bindings: {
    project: '<'
  },

  templateUrl: 'scripts/app/components/projectCard/projectCard.html',

  controller: function($filter) {
    this.$onInit = function() {
      this.projectStatus = $filter('vizProjectStatus')(this.project);
    };
  }
};

angular
  .module('vizibl.components')
  .component('vizProjectCard', projectCard);

