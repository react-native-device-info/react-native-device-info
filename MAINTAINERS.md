# MAINTAINERS

First, **thanks** for helping maintain the package! It is really popular and helps a huge amount of people.

This document will help you maintain this repository for the benefit of everyone.

## Path to maintainer status

- start by making good pull requests and responding to issues helpfully
- progress to github push access, and help others merge their PRs
- after a period of responsible behavior, get npmjs.com publish access

## PR merge process

### Testing

- please try to test it locally in the example app
  - edit the package.json in the example app to point to the fork+branch and npm install, then run it
  - ideally if the example doesn't demonstrate the changed behavior, edit App.js to demonstrate it and commit that to the PR branch

### During the merge

- make sure there is a changelog entry queued up under "next"
- use squash merge and title it like 'feat: blah blah blah (URL to PR)' (or chore, or fix etc)

## Release process

- release early and often, while respecting semver for every change
- release-please opens automated release PRs that bump the version and changelog; review the generated notes, adjust if needed, then merge once checks pass
- the merge triggers the `Release & Publish` workflow which tags, creates the GitHub release, and publishes to npm using the build artifacts from CI
- if you need to force a release (e.g. to batch queued commits), you can manually dispatch the workflow from the Actions tab (`Release & Publish` → Run workflow) and it will either open a release PR or cut the release if one is ready
- monitor the workflow run to ensure both the release and publish jobs succeed; rerun with fixes if npm publish fails for any reason
