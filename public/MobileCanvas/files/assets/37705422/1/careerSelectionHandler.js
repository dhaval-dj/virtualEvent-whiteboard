var CareerSelectionHandler = pc.createScript('careerSelectionHandler');

CareerSelectionHandler.attributes.add('selectionId', {type:'number', default: 1});

CareerSelectionHandler.prototype.initialize = function() {
    this.entity.element.on('click', function (evt) {
            SceneManagerInstance.currentCareerCafeSelection = this.selectionId;
            if(window.ReactHomeManager)
            {
                window.ReactHomeManager.currentCareerCafeSelection = this.selectionId;
            }
            this.app.fire('enterAuditorium1');
    }, this);
};

