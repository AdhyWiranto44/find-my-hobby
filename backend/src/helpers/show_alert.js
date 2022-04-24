const showAlert = function(color, message) {
    return `<div class="alert ${color} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
}

module.exports = showAlert;