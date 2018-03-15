const gulp = require('gulp');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const ava = require('gulp-ava');
const stream = require('stream');

const path = require('path');
const requireFromString = require('require-from-string');
const json2ts = require('json-schema-to-typescript');

const tsProject = ts.createProject('tsconfig.json');

const package = require('./package.json');

const srcBase = 'src';
const buildBase = 'build'
const paths = {
  tsSrc: 'src/**/*.ts{,x}',
  schema: 'schema/index.js',
  schemaSrc: 'definitions/**/*.js',
  schemaJson: path.join('build', '**/*'),
  interfaces: 'typings'
};

function cleanDescriptions(obj) {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      if (key === 'description' && typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/\n\s*/gm, ' ').trim();
      } else if (typeof obj[key] === 'object') {
        cleanDescriptions(obj[key]);
      }
    })
  }
}

function jsToJson() {
  const transformer = new stream.Transform({ objectMode: true });

  transformer._transform = (originalFile, encoding, callback) => {
    const file = originalFile.clone({ contents: false });

    let js = requireFromString(originalFile.contents.toString(), file.path);

    if (js.default) {
      js = js.default;
    }

    // Clean descriptions
    cleanDescriptions(js);

    file.contents = Buffer.from(JSON.stringify(js, null, 2));

    file.extname = '';

    callback(null, file);
  }

  return transformer;
}

function jsonToTs() {
  const transformer = new stream.Transform({ objectMode: true });

  transformer._transform = async (originalFile, encoding, callback) => {
    console.log('json2ts', originalFile.stem, originalFile.dirname);
    if (originalFile.contents === null) {
      callback(null, null);
      return;
    }

    const file = originalFile.clone({ contents: false });

    const json = JSON.parse(originalFile.contents.toString());

    const ts = await json2ts.compile(json, file.stem, { cwd: file.dirname });

    console.log(file.stem, ts);

    file.contents = Buffer.from(ts);

    file.extname = '.d.ts';

    callback(null, file);
  }

  return transformer;
}

// Typescript
gulp.task('ts:lint', () => gulp.src(paths.tsSrc)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }))
);

gulp.task('ts:compile', () => gulp.src(paths.tsSrc)
    .pipe(tsProject())
    .js.pipe(gulp.dest('./'))
);

const tsPipeline = gulp.series('ts:lint', 'ts:compile');

gulp.task('schema:json:generate', () => gulp.src(paths.schemaSrc)
    .pipe(jsToJson())
    .pipe(gulp.dest(buildBase))
);

gulp.task('schema:interfaces:generate', () => gulp.src(paths.schemaJson)
    .pipe(jsonToTs())
    .pipe(gulp.dest(paths.interfaces))
);

const schemaPipeline = gulp.series('schema:json:generate', 'schema:interfaces:generate');

gulp.task('test', () => gulp.src(package.ava.files)
    .pipe(ava())
);

const pipeline = gulp.series(tsPipeline,
  gulp.parallel('test', schemaPipeline));

gulp.task('watch', () => {
  gulp.watch(paths.tsSrc, {
    ignoreInitial: false
  }, pipeline);
});

const dev = gulp.parallel('watch');

gulp.task('default', dev);
