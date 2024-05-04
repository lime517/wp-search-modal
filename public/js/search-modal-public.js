(function ($) {
  "use strict";

  $(function () {
    const searchModal = new SearchModal();

    // Example usage of the destroy method
    // searchModal.destroy();
  });

  class SearchModal {
    constructor(options) {
      this.options = {
        triggerSelector: ".jg-search-modal-trigger",
        modalClassName: "jg-search-modal-container",
        overlayClassName: "jg-search-modal-overlay",
        contentClassName: "jg-search-modal-content",
        exitButtonSelector: ".jg-search-modal-exit",
        fadeOutDuration: 500,
        ...options,
      };

      this.modal = null;
      this.initTrigger();
    }

    initTrigger() {
      $(document).on("click", this.options.triggerSelector, (event) => {
        event.preventDefault();
        this.openModal();
      });
    }

    createModal() {
      const modalHtml = `
    <div class="${
      this.options.modalClassName
    }" data-active="true" role="dialog" aria-labelledby="jg-modal-title" id="jg-search-modal-container">
      <div class="${this.options.overlayClassName}" aria-hidden="true"></div>
      <button class="${this.options.exitButtonSelector.slice(
        1
      )}" aria-label="Close search modal">✕</button>
      <div class="${this.options.contentClassName}">
        <h4 id="jg-modal-title">Search</h4>
        <form action="/" method="get" class="jg-search-form">
          <label for="jg-search" class="jg-screen-reader-text">Search</label>
          <input type="text" name="s" id="jg-search" placeholder="What can we help you find?" aria-describedby="jg-search-instructions" />
          <p id="jg-search-instructions" class="jg-screen-reader-text">Enter your search query and press Enter to submit.</p>
          <button type="submit" aria-label="Submit search">Search</button>
        </form>
      </div>
    </div>
  `;

      this.modal = $(modalHtml).appendTo("body");
      this.initModalEvents();
      this.focusFirstElement();
    }

    initModalEvents() {
      this.modal.on("click", this.options.exitButtonSelector, () => {
        this.closeModal();
      });

      this.modal.on("click", (event) => {
        if (
          !$(event.target).closest(`.${this.options.contentClassName}`).length
        ) {
          this.closeModal();
        }
      });

      $(document).on("keydown", (event) => {
        if (
          event.key === "Escape" &&
          this.modal.attr("data-active") === "true"
        ) {
          this.closeModal();
        }
        if (event.key === "Tab" && this.modal.attr("data-active") === "true") {
          this.trapFocus(event);
        }
      });
    }

    openModal() {
      if (!this.modal) {
        this.createModal();
      }
      this.modal.addClass("active");
      $("body").addClass("jg-modal-open");
    }

    closeModal() {
      this.modal.removeClass("active");
      this.modal.attr("data-active", "false");
      $("body").removeClass("jg-modal-open");
      setTimeout(() => {
        this.modal.remove();
        this.modal = null;
        this.returnFocusToTrigger();
      }, this.options.fadeOutDuration);
    }

    focusFirstElement() {
      const searchInput = this.modal.find("#jg-search");
      if (searchInput.length) {
        searchInput.focus();
      }
    }

    returnFocusToTrigger() {
      const triggerElement = $(document.activeElement).closest(
        this.options.triggerSelector
      );
      if (triggerElement.length) {
        triggerElement.focus();
      }
    }

    trapFocus(event) {
      const focusableElements = this.modal.find(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements.first();
      const lastFocusable = focusableElements.last();

      if (event.shiftKey && document.activeElement === firstFocusable[0]) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusable[0]
      ) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    destroy() {
      $(document).off("click", this.options.triggerSelector);
      this.closeModal();
    }
  }
})(jQuery);
