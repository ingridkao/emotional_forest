import path           from 'path'
import fs             from 'fs-extra'
// import { createHash } from 'crypto'
import gulp           from 'gulp'
import browserSync    from 'browser-sync'
import useref         from 'gulp-useref'
import gulpif         from 'gulp-if'
// import rev           from 'gulp-rev'
// import revReplace     from 'gulp-rev-replace'
import htmlmin        from 'gulp-htmlmin'
import postcss        from 'gulp-postcss'
import uglify         from 'gulp-uglify'
import rsync          from 'gulp-rsync'
// import sourcemaps     from 'gulp-sourcemaps'
import del            from 'del'
import { rollup }     from 'rollup'
import babel          from 'rollup-plugin-babel'
import rollupUglify   from 'rollup-plugin-uglify'
import nodeResolve    from 'rollup-plugin-node-resolve'
import commonjs       from 'rollup-plugin-commonjs'
import replace        from 'rollup-plugin-replace'
import builtins       from 'rollup-plugin-node-builtins'
import str            from 'rollup-plugin-string'
import htmlReplace    from 'gulp-replace'
import ghPages        from 'gulp-gh-pages'

let questions = require('./src/scripts/questions').default

const postcssPlugins = [
  require('postcss-import')({
    path: ['src/styles'],
  }),
  require('postcss-nested'),
  require('postcss-short'),
  require('postcss-cssnext')({ browsers: ['> 0%'] }),
  require('css-mqpacker'),
  require('cssnano')({ discardComments: { removeAll: true }, zindex: false }),
]

gulp.task('styles', () => gulp.src('src/styles/*.css')
  .pipe(postcss(postcssPlugins))
  .pipe(gulp.dest(path.join(destDir, 'styles/')))
)

function rolljs(shouldUglify, babelPlugins) {
  const rollupPlugins = [
    builtins(),
    nodeResolve({ browser: true, jsnext: true, main: true }),
    commonjs({
      exclude: [ 'node_modules/rollup-plugin-node-globals/**', 'node_modules/rollup-plugin-node-builtins/**' ],
      ignoreGlobal: true
    }),
    str({
      include: '**/templates/*.html'
    }),
    replace({
      'process.env.NODE_ENV': shouldUglify ? JSON.stringify( 'production' ) : JSON.stringify( 'development' ),
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: shouldUglify ? ['es2015-rollup'] : [],
      plugins: babelPlugins || [],
    }),
  ]
  if (shouldUglify) {
    rollupPlugins.push(rollupUglify())
  }
  return rollup({
    entry: 'src/scripts/main.js',
    external: ['xdomain'],
    plugins: rollupPlugins
  }).then(bundle => {
    const result = bundle.generate({
      format: 'iife'
    })
    return result.code
  })
}

const htmlSrc  = './src/*.html'
const assetSrc = ['./src/**/*.+(jpg|png|gif|ico|svg)', './src/vendor**/*']

const destDir = './dist'

gulp.task('bundle', () => rolljs(true, [/*'transform-remove-console'*/]).then(code => {
  const dir  = path.join(destDir, '/scripts/')
  const dest = path.join(dir, 'bundle.js')
  fs.ensureDirSync(dir)
  fs.writeFileSync(dest, code)
}))

gulp.task('clean', () => del([destDir, './.tmp']))

gulp.task('build', ['html', 'copy'])

gulp.task('copy', () => gulp.src(assetSrc).pipe(gulp.dest(destDir)))

gulp.task('html', ['bundle', 'styles'], () => {
  return gulp.src(htmlSrc)
    .pipe(useref({searchPath: ['src', '.']}))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([require('postcss-cssnext')({ browsers: ['> 0%'] })])))
    // Share
    .pipe(gulpif('*.html', htmlReplace('测试问卷模版', questions.title.replace(/<\/?[^>]+(>|$)/g, ''))))
    .pipe(gulpif('*.html', htmlReplace('SHAREIMAGE', questions.sharePreview)))
    // Styles
    .pipe(gulpif('*.html', htmlReplace('Dark_Color', questions.styles['Dark Color'])))
    .pipe(gulpif('*.html', htmlReplace('Light_Color', questions.styles['Light Color'])))
    .pipe(gulpif('*.html', htmlReplace('Dark_Text_Color', questions.styles['Dark Text Color'])))
    .pipe(gulpif('*.html', htmlReplace('Light_Text_Color', questions.styles['Light Text Color'])))
    .pipe(gulpif('*.html', htmlReplace('Headline_Text_Color', questions.styles['Headline Text Color'])))
    .pipe(gulpif('*.html', htmlReplace('Background_Color', questions.styles['Background Color'])))
    .pipe(gulpif('*.html', htmlReplace('Background_Image', questions.styles['Background Image'])))
    .pipe(gulpif('*.html', htmlReplace('Background_Mobile_Image', questions.styles['Background Mobile Image'])))
    // Minify
    .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(gulp.dest(destDir))
})

gulp.task('deploy:staging', () => gulp.src(destDir + '/**').pipe(rsync({
  root: 'dist',
  hostname: 'showcase.initiumlab.com',
  username: 'vagrant',
  destination: '/home/vagrant/web/form-template/',
  recursive: true,
  incremental: true,
  relative: true,
  emptyDirectories: true,
  clean: true,
  exclude: ['.DS_Store', '.directory'],
  include: []
})))

gulp.task('deploy:preview', () => gulp.src(destDir + '/**').pipe(rsync({
  root: 'dist',
  hostname: 'quiz.initiumlab.com',
  username: 'vagrant',
  destination: `/home/vagrant/quiz/${encodeURIComponent(process.env.CI_BUILD_REF_NAME || 'NOT_CI_BUILD')}`,
  recursive: true,
  incremental: true,
  relative: true,
  emptyDirectories: true,
  clean: true,
  exclude: ['.DS_Store', '.directory'],
  include: []
})))

gulp.task('serve', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    },
    reloadDelay: 1000
  })

  gulp.watch([
    'src/**/*.*',
  ], ['build'])
})

// gulp.task('deploy:prod', () => gulp.src('./dist/**/*').pipe(ghPages({
//   remoteUrl: 'git@github.com:initiumdev/2016-taiwanese-in-mainland-quiz.git'
// })))

// gulp.task('deploy:dev', () => gulp.src('./dist/**/*').pipe(ghPages({
//   remoteUrl: ''
// })))