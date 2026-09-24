# CHANGELOG

## 1.11.0

### Breaking changes

- fix(plugins): enable/disablePlugin take the user flag, and both enable paths return boolean
- fix(metadata-cache): iterateRefsForFile takes a TFile and a predicate over Reference
- fix(file-manager): drop iterateAllRefs, which has no runtime implementation
- fix(app): getSpellcheckLanguages returns null, so widen its declared return

### Other changes

- feat(types): declare SearchView.dom, the ResultDom the global search renders into
