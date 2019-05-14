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

## NPM release process

- try to release early and often, as soon as something is working, make a release, but RESPECT SEMVER!
- make sure the changelog is correct for the next version and RESPECT SEMVER! :-)
- make sure your working directory is clean and "origin" (or your default git remote) is the main repo
- run `npm install && rm package-lock.json && npm run shipit` from a terminal where you are logged in to npmjs with credentials associated with an account that has publish access to react-native-device-info
- make sure the tags are pushed to the repo afterward (`npm push --tags`)
- edit [the release on github](https://github.com/react-native-community/react-native-device-info/releases) to put the release note snippet from the changelog in place
