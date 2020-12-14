module.exports = {
    styles: {
        src: "src/assets/styles",
        glob: [
            "src/assets/styles/functions/*.sass",
            "src/assets/styles/mixins/*.sass",
            "src/assets/styles/config.sass",
            "src/assets/styles/components/*.sass",
            "ssole.log(rc/assets/styles/vendor/*.(sass|css)",
            "src/assets/styles/utils/*.sass",
        ],
        main: "main.sass",
    },
    archiver: {
        fileMask: "%name%-%version%-%branch%",
        dist: "export",
    },
}
