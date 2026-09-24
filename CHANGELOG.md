# CHANGELOG

## 1.4.0

### Breaking changes

- fix(plugins): enable/disablePlugin take the user flag, and both enable paths return boolean
- fix(metadata-cache): iterateRefsForFile takes a TFile and a predicate over Reference
- fix(file-manager): drop iterateAllRefs, which has no runtime implementation
- fix(app): getSpellcheckLanguages returns null, so widen its declared return
- fix(config-item): drop spellcheckLanguages, which 1.14 moved to localStorage

### Other changes

- feat(types): declare SearchView.dom, the ResultDom the global search renders into
