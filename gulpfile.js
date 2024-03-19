const { src, dest, watch, parallel } = require("gulp");

// CSS

const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilado
    .pipe(dest("build/css")); // Almacenarla en el dico duro

  done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionWebp(done) {
  import('gulp-webp').then(module => {
    const webp = module.default; // Acceder a la exportación predeterminada del módulo

    const options = {
      quality: 50,
    };

    src("src/img/**/*.{png, jpg}")
      .pipe( webp(options))
      .pipe( dest("build/img"))
  
    done();
  }).catch(error => {
    console.log("Error importando gulp-webp", error);
    donde(error); // Pasar el error para indicar falla en la tarea
  })

}

function dev(done) {
  watch("src/scss/**/*.scss", css);

  done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);
