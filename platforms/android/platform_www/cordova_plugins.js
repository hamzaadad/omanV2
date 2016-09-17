cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com-badrit-base64/www/Base64.js",
        "id": "com-badrit-base64.Base64",
        "clobbers": [
            "navigator.Base64"
        ]
    },
    {
        "file": "plugins/cordova-plugin-image-picker/www/imagepicker.js",
        "id": "cordova-plugin-image-picker.ImagePicker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com-badrit-base64": "0.2.0",
    "cordova-plugin-image-picker": "1.1.1",
    "cordova-plugin-whitelist": "1.2.2"
};
// BOTTOM OF METADATA
});