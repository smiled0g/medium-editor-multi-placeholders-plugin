var MediumEditorMultiPlaceholders = MediumEditor.Extension.extend({
  name: 'multi_placeholder',
  init:  function() {
    this.placeholderElements = [];
    this.initPlaceholders(this.placeholders, this.placeholderElements);
    this.watchChanges();
  },

  initPlaceholders: function (placeholders, elements) {
      this.getEditorElements().forEach(function (editor) {
          this.placeholders.map(function(placeholder) {
            // Create the placeholder element
            var el = document.createElement(placeholder.tag);
            el.appendChild(document.createElement('br'));
            el.setAttribute('data-placeholder', placeholder.text);
            elements.push(el);
            // Append it to Medium Editor element
            editor.appendChild(el);
            this.updatePlaceholder(el);
          }, this);
      }, this);
  },

  destroy: function () {
      this.getEditorElements().forEach(function (editor) {
        editor.querySelectorAll('[data-placeholder]').map(function(el) {
          el.removeAttribute('data-placeholder');
        }, this);
      }, this);
  },

  showPlaceholder: function (el) {
      if (el) {
          el.classList.add('medium-editor-placeholder');
      }
  },

  hidePlaceholder: function (el) {
      if (el) {
          el.classList.remove('medium-editor-placeholder');
      }
  },

  updatePlaceholder: function (el) {
      if (el.textContent === '') {
          return this.showPlaceholder(el);
      }
      this.hidePlaceholder(el);
  },

  updateAllPlaceholders: function() {
    this.placeholderElements.map(function(el){
      this.updatePlaceholder(el);
    }, this);
  },

  watchChanges: function() {
    this.subscribe('editableInput', this.updateAllPlaceholders.bind(this));
    this.subscribe('externalInteraction', this.updateAllPlaceholders.bind(this));
  }
});
